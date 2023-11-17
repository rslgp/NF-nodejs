const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const NFSe = require("./NotaFiscal/NFSe/NFSe");
let nfse_instance = new NFSe();
const mock = require("./NotaFiscal/global/MOCK");

require('dotenv').config();

const {Pool} = require('pg');

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

const { v4: uuidv4 } = require('uuid');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

function getEstado(id) {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT nome FROM adm.estado WHERE id=$1`,
            [id],
            (error, results) => {
                if (error) {
                    console.error('Error executing query', error);
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
                    console.error('Error executing query', error);
                    reject(error);
                } else {
                    const cidade = results.rows[0];
                    if (cidade) {
                        getEstado(cidade.estado_id)
                            .then(estado => {
                                resolve({"cidade": cidade.nome, "estado": estado});
                            })
                            .catch(err => {
                                reject(err);
                            });
                    } else {
                        reject(new Error('No city found with the given ID'));
                    }
                }
            }
        );
    });
}

function getTipoLogradouro(logradouro){
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
        EQNP: "Eqnp"
    };
    
    const logradouroEnumValue = Object.values(TipoLogradouro).find(value => logradouro.includes(value));

    return (logradouroEnumValue) ? logradouroEnumValue : "Rua"; //EM CASO DE ERRO RETORNA RUA
    
}

const municipios = require('./municipios.json');

const codigo_ibge_municipio = {};
municipios.forEach((municipio) => {
    codigo_ibge_municipio[municipio.nome] = municipio.codigo_ibge;
});


async function createJSONpayload(args){
    console.log(3);
    let payload = mock.MOCK_payloadDataMultiplasNFSeJSONArray[0];
    payload.idIntegracao = uuidv4();
    payload.prestador.cpfCnpj = args.cnpj; //"04544707000110"
    payload.tomador.cpfCnpj = args.cliente.cpf_cnpj;
    payload.tomador.razaoSocial = args.cliente.nome; //TODO DIVIDA TECNICA MUDAR PARA CLIENTE RAZAO SOCIAL
    const cidadeDados = await getCidadeDados(args.cliente.cidade_id);
    console.log(cidadeDados);
    payload.tomador.endereco = {
        //REQUIRED
        "bairro": args.cliente.bairro,
        "cep": args.cliente.cep,
        "codigoCidade": codigo_ibge_municipio[cidadeDados.cidade], //codigo ibge cidade
        "estado": cidadeDados.estado,
        "logradouro": args.cliente.logradouro,
        "numero": args.cliente.numero,
        "tipoLogradouro": getTipoLogradouro(args.cliente.logradouro),

        //OPCIONAL
        "descricaoCidade": "Maringa",
        "tipoBairro": "Centro",
        "complemento": args.cliente.complemento,
        
    }
    //console.log(payload);
    payload["servico"] = [
        {
            "codigo": args.servico_cod_item_lista_servico,
            "discriminacao": args.servico_discriminacao,

            //OPCIONAL
            "cnae": args.cnae
        }
    ]

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
function clientFillDataPayloadJSON(payload, args_conta_receber, cb){
    console.log(2);
    console.log("PAYLOAD")
    console.log(payload)
    console.log("ARGS CONTA RECEBER")
    console.log(args_conta_receber)
    //pegar dados do cliente para preencher nf
    //console.log(args_conta_receber.cliente_id);
    pool.query(
        `SELECT * FROM adm.cliente WHERE id=$1`,
        [args_conta_receber.cliente_id],
        async (error, results) => {
            if (error) {
                console.log(4)
                console.error('Error executing query', error);
            } else {
                console.log(4)
                //console.log(results)
                if(!payload.iss){ //DEFAULT VALUE ALIQUOTA SE NAO INFORMAR NO PAYLOAD
                    payload.iss = {
                        "aliquota": 2
                    }
                }
                for(let c of results.rows){
                    let args_nf = {
                        "cliente" : c,

                        //REQUIRED
                        "cnpj": payload.cnpj || "04544707000110", //usar cnpj snet by default
                        "servico_cod_item_lista_servico": payload.servico_cod_item_lista_servico,
                        "servico_discriminacao": payload.servico_discriminacao,
                        
                        "valor": {
                            //REQUIRED
                            "servico": args_conta_receber.valor_recebido,

                            //OPCIONAL
                            "descontoCondicionado": args_conta_receber.desconto_taxa || 0
                        },
                        "iss": {
                            //REQUIRED
                            "aliquota": payload.iss.aliquota
                        },

                        //OPCIONAL
                        "cnae": payload.cnae
                    }
                    console.log("----")
                    let r = await createJSONpayload(args_nf)
                    console.log(r)
                    cb( [r] );
                }
            }
            
            //pool.end();
        }
    );
    console.log("EXIT");
}

function action_run_conta_receber(contas_receber_id, payload){

    pool.query(
        `SELECT * FROM adm.conta_receber WHERE id=$1`,
        [contas_receber_id],
        (error, results) => {
            if (error) {
                console.error('Error executing query', error);
            } else {
                let nf_payloadArray = [];
                //console.log(results);
                //for(let conta_receber_row of results){
                //    let nf = clientFillDataPayloadJSON(payload, conta_receber_row.cliente_id);
                //    nf_payloadArray.push(nf);
                //}
                const elem_conta_receber = results.rows[0];

                //restringir field especificas
                //const args_conta_receber = {
                //    "cliente_id": elem_conta_receber.cliente_id,
                //    "valor_recebido": elem_conta_receber.valor_recebido
                //}

                let cb_whenJSONcompleted = (nf_payloadArray) => {

                    let cb_whenPlugNFcompleted = (response) => {
                        response.text().then((value)=> console.log(value));
                    };
                    console.log(nf_payloadArray);
                    nfse_instance.registrarNFSe(nf_payloadArray, cb_whenPlugNFcompleted);
                }

                clientFillDataPayloadJSON(payload, elem_conta_receber, cb_whenJSONcompleted);
            }
            //pool.end();
        }
    );
}

const mock_contas_receber = {
    "servico_cod_item_lista_servico": 1.07,
    "servico_discriminacao": "teste"
}

action_run_conta_receber(415, mock_contas_receber);

app.post('/contas_receber/:id/criar_nf', async (req, res) => {
    const contas_receber_id = req.params.id;
    const payload = req.body;
    //console.log(contas_receber_id);
    action_run_conta_receber(contas_receber_id, payload);
    // Handle the payload here
    console.log(payload);
    res.send('Received the payload');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
