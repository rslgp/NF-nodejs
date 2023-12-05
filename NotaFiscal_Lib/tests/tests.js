//const NFSe = require("./NotaFiscal/cb/NFSe/NFSe");

//const NFSe_Entidades = require("./NotaFiscal/cb/NFSe/Entidades/NFSe_Entidades");

const NFSe = require("./NotaFiscal/async/PlugNotas/NFSe_PlugNotas");

//const NFSe_Entidades = require("./NotaFiscal/async/NFSe/Entidades/NFSe_Entidades");

const mock = require("./NotaFiscal/utils/MOCK");

const { v4: uuidv4 } = require("uuid");

async function test() {
	let nfse_instance = NFSe;
	let exemplo = mock.MOCK_payloadDataMultiplasNFSeJSONArray;
	exemplo[0].idIntegracao = uuidv4();
	console.log("v1");
	let v1 = await nfse_instance.registrarNFSe(exemplo);
	v1.text().then((value) => console.log("result: " + value));
	console.log("v2");
	let v2 = await nfse_instance.consultarNFSe("656e1bdc37ee6852340081a7");
	v2.text().then((value) => console.log("result: " + value));
	console.log("v3");
	let v3 = await nfse_instance.cancelarNFSe("656e1bdc37ee6852340081a7", {});
	v3.text().then((value) => console.log("result: " + value));
	console.log("v4");
	let v4 = await nfse_instance.download_NFSe("656e1bdc37ee6852340081a7", "pdf");
	v4.text().then((value) => console.log("result: " + value));

	console.log("v5");
	let v5 = await nfse_instance.download_NFSe("656e1bdc37ee6852340081a7", "xml");
	v5.text().then((value) => console.log("result: " + value));

	console.log("v7");
	let v7 = await nfse_instance.consultarDadosNFSe("656e1bdc37ee6852340081a7");
	v7.text().then((value) => console.log("result: " + value));

	console.log("v8");
	let v8 = await nfse_instance.consultarDadosNFSe_CNPJ(
		"XXXYY999",
		"08187168000160"
	);
	v8.text().then((value) => console.log("result: " + value));
}
test();

/*
let util = require("./NotaFiscal/utils/util");
async function test2() {
	let nfse_instance = NFSe;
	let response = await nfse_instance.download_NFSe(
		"656a2f2d7c904b0b9c1cf49f",
		"pdf"
	);
	util.writeFile(response, "656a2f2d7c904b0b9c1cf49f", "pdf");
}
test2();

/*
let nfse_entidades_instance = new NFSe_Entidades();
nfse_entidades_instance.consultaNFSe_Entidade("servico", {"id": "6553bc519d4dd57477aaf707"} ); //idServico gerado no cadastro
nfse_entidades_instance.consultaNFSe_Entidade("tomador", {"id": "08187168000160"} ); //cnpj

const mock = require("./MOCK");
nfse_entidades_instance.cadastrarEntidade("servico", {"payloadJSON": mock.MOCK_payload_servico} ); //idServico gerado no cadastro
nfse_entidades_instance.cadastrarEntidade("tomador", {"payloadJSON": mock.MOCK_payload_tomador} ); //cnpj
*/

/*
const NFe = require("./NotaFiscal/cb/NFe/NFe");
let nfe_instance = new NFe();
nfe_instance.registrarNFe();
nfe_instance.cancelarNFe("5f738609fd55b378b8ea7e47");
nfe_instance.download_NFe("5f738609fd55b378b8ea7e47", "pdf");
nfe_instance.download_NFe("5f738609fd55b378b8ea7e47", "xml");
nfe_instance.consultarDadosNFe("5f738609fd55b378b8ea7e47");
nfe_instance.consultarDadosNFe_CNPJ("XXXYY99999", "08187168000160");
*/
