require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
});

//const NFSe = require("../NotaFiscal/async/PlugNotas/NFSe_PlugNotas");
//let nfse_instance = new NFSe();
let nfse_instance = null;

const mock = require("../utils/MOCK");

const { v4: uuidv4 } = require("uuid");

const municipios = require("./municipios.json");

const aws = require("../utils/aws");

const codigo_ibge_municipio = {};
municipios.forEach((municipio) => {
	codigo_ibge_municipio[municipio.nome] = municipio.codigo_ibge;
});

function getEstado(id) {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT nome FROM adm.estado WHERE id=$1`,
			[id],
			(error, results) => {
				if (error) {
					console.error("Error executing query", error);
					reject(error);
				} else {
					resolve(results.rows[0].nome);
				}
			}
		);
	});
}

function getCidadeDados(id) {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT nome, estado_id FROM adm.cidade WHERE id=$1`,
			[id],
			(error, results) => {
				if (error) {
					console.error("Error executing query", error);
					reject(error);
				} else {
					const cidade = results.rows[0];
					if (cidade) {
						getEstado(cidade.estado_id)
							.then((estado) => {
								resolve({ cidade: cidade.nome, estado: estado });
							})
							.catch((err) => {
								reject(err);
							});
					} else {
						reject(new Error("No city found with the given ID"));
					}
				}
			}
		);
	});
}

function getTipoLogradouro(logradouro) {
	const TipoLogradouro = {
		ALAMEDA: "Alameda",
		AVENIDA: "Avenida",
		CHACARA: "Chácara",
		COLONIA: "Colônia",
		CONDOMINIO: "Condomínio",
		ESTANCIA: "Estância",
		ESTRADA: "Estrada",
		FAZENDA: "Fazenda",
		PRACA: "Praça",
		PROLONGAMENTO: "Prolongamento",
		RODOVIA: "Rodovia",
		RUA: "Rua",
		SITIO: "Sítio",
		TRAVESSA: "Travessa",
		VICINAL: "Vicinal",
		EQNP: "Eqnp",
	};

	const logradouroEnumValue = Object.values(TipoLogradouro).find((value) =>
		logradouro.includes(value)
	);

	return logradouroEnumValue ? logradouroEnumValue : "Rua"; //EM CASO DE ERRO RETORNA RUA
}

function copyJSON(originalObject) {
	return JSON.parse(JSON.stringify(originalObject));
}

async function createJSONpayload(args) {
	console.log(3);
	let payload = copyJSON(mock.MOCK_payloadDataMultiplasNFSeJSONArray[0]);
	payload.idIntegracao = uuidv4();
	payload.prestador.cpfCnpj = args.cnpj; //"04544707000110"
	payload.tomador.cpfCnpj = args.cliente.cpf_cnpj;
	payload.tomador.razaoSocial = args.cliente.nome; //TODO DIVIDA TECNICA MUDAR PARA CLIENTE RAZAO SOCIAL
	const cidadeDados = await getCidadeDados(args.cliente.cidade_id);
	console.log(cidadeDados);
	payload.tomador.endereco = {
		//REQUIRED
		bairro: args.cliente.bairro,
		cep: args.cliente.cep,
		codigoCidade: codigo_ibge_municipio[cidadeDados.cidade], //codigo ibge cidade
		estado: cidadeDados.estado,
		logradouro: args.cliente.logradouro,
		numero: args.cliente.numero,
		tipoLogradouro: getTipoLogradouro(args.cliente.logradouro),

		//OPCIONAL
		descricaoCidade: "Maringa",
		tipoBairro: "Centro",
		complemento: args.cliente.complemento,
	};
	//console.log(payload);
	payload["servico"] = [
		{
			codigo: args.servico_cod_item_lista_servico,
			discriminacao: args.servico_discriminacao,

			//OPCIONAL
			cnae: args.cnae,
		},
	];

	return payload;
}

//SWAGGER PAYLOAD API
/*
cnpj
servico_cod_item_lista_servico
servico_discriminacao
iss aliquota
cnae
*/
async function get_RequestPayload_NF_array(payload, args_conta_receber) {
	let sql_query_result = await pool.query(
		`SELECT * FROM adm.cliente WHERE id=$1`,
		[args_conta_receber.cliente_id]
	);

	console.log(4);
	if (!payload.iss) {
		//DEFAULT VALUE ALIQUOTA SE NAO INFORMAR NO PAYLOAD
		payload.iss = {
			aliquota: 2,
		};
	}

	let result_cliente = sql_query_result.rows[0];
	let args_nf = {
		cliente: result_cliente,

		//REQUIRED
		cnpj: payload.cnpj || "04544707000110", //usar cnpj snet by default
		servico_cod_item_lista_servico: payload.servico_cod_item_lista_servico,
		servico_discriminacao: payload.servico_discriminacao,

		valor: {
			//REQUIRED
			servico: args_conta_receber.valor_recebido,

			//OPCIONAL
			descontoCondicionado: args_conta_receber.desconto_taxa || 0,
		},
		iss: {
			//REQUIRED
			aliquota: payload.iss.aliquota,
		},

		//OPCIONAL
		cnae: payload.cnae,
	};
	console.log("----");
	let payloadNF_request = await createJSONpayload(args_nf);
	return [payloadNF_request];

	console.log("EXIT");
}

/**
 * Precisa ter uma foreignkey apontando para contas_a_receber;
- Precisa ter um campo de status; 
- Precisa ter um campo de referência para o provedor da nota fiscal (id_integracao);
- Precisa ter os campos que armazenem a url  do S3 do xml e do pdf da nota fiscal;
 *
 */
async function action_inserir_propriodb_notafiscal(args) {
	console.log("INSERIR");
	let result_sqlInsert = await pool.query(
		`INSERT INTO adm.nota_fiscal 
        (conta_receber_id, status, id_integracao, id_nf, xml_url, pdf_url) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
		[
			args.conta_receber_id,
			args.status,
			args.id_integracao,
			args.id_nf,
			args.xml_url,
			args.pdf_url,
		]
	);
	console.log(result_sqlInsert);
	console.log("INSERIR EXIT");
}

async function consultarDados_plugnotas(idNF) {
	let dados_nf = await nfse_instance.consultarDadosNFSe(idNF);
	return (await dados_nf.json())[0];
}

async function registrar_plugnotas(nf_payloadNFArray) {
	let nf_plugNF_completedResponse = await nfse_instance.registrarNFSe(
		nf_payloadNFArray
	);
	return await nf_plugNF_completedResponse.json();
}

async function padrao_conta_receber(tabela_conta_receber, payload) {
	try {
		for (let elem_conta_receber of tabela_conta_receber.rows) {
			//default value
			payload.servico_cod_item_lista_servico =
				payload.servico_cod_item_lista_servico || "1.07";
			payload.servico_discriminacao =
				payload.servico_discriminacao ||
				"Sistema de gestão de software e suporte técnico para clínicas e consultórios";

			let nf_payloadNFArray = await get_RequestPayload_NF_array(
				payload,
				elem_conta_receber
			);
			//criar nota_fiscal do provedor plug_notas
			//erro id undefined ou body unusable, usar o payload {servico_cod_item_lista_servico servico_discriminacao}
			let plug_nf_data = await registrar_plugnotas(nf_payloadNFArray);
			for (let nf_criada of plug_nf_data.documents) {
				let dados_nf = await consultarDados_plugnotas(nf_criada.id); //TODO MUDAR PARA WEBHOOK
				//console.log(dados_nf)
				let args_db_proprio = {
					conta_receber_id: elem_conta_receber.id,
					id_integracao: nf_criada.idIntegracao,
					id_nf: nf_criada.id,
					//"protocolo_registro_plugnotas": plug_nf_data.protocol,
					status: dados_nf.situacao,
					xml_url: dados_nf.xml,
					pdf_url: dados_nf.pdf,
				};
				action_inserir_propriodb_notafiscal(args_db_proprio);

				let args_aws = {
					cnpj: dados_nf.prestador,
					dest_cnpj: dados_nf.tomador,
					...args_db_proprio,
				};
				aws.saveNotaFiscalS3(args_aws);
			}
		}
	} catch (err) {
		throw err;
	}
}
async function action_run_conta_receber(contas_receber_id, payload, provider) {
	nfse_instance = provider;

	let results = await pool.query(
		`SELECT * FROM adm.conta_receber WHERE id=$1`,
		[contas_receber_id]
	);

	padrao_conta_receber(results, payload);
	//pool.end();
}

async function action_run_conta_receber_vencimento(
	vencimento,
	payload,
	provider
) {
	nfse_instance = provider;

	let results = await pool.query(
		`SELECT * FROM adm.conta_receber WHERE EXTRACT(YEAR FROM vencimento) = $1 AND EXTRACT(MONTH FROM vencimento) = $2`,
		[vencimento.ano, vencimento.mes]
	);

	padrao_conta_receber(results, payload);
	//pool.end();
}

module.exports = {
	action_run_conta_receber,
	action_run_conta_receber_vencimento,
};
