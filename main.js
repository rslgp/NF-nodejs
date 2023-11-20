//const NFSe = require("./NotaFiscal/cb/NFSe/NFSe");

//const NFSe_Entidades = require("./NotaFiscal/cb/NFSe/Entidades/NFSe_Entidades");

const NFSe = require("./NotaFiscal/async/NFSe/NFSe");

//const NFSe_Entidades = require("./NotaFiscal/async/NFSe/Entidades/NFSe_Entidades");

async function test(){
    
    let nfse_instance = new NFSe();
    let v1 = await nfse_instance.registrarNFSe();
    console.log(v1);
    v1.text().then((value)=> console.log("TESTE"+value));
    console.log("JSON");
    console.log(v1.json());
    let v2 = await nfse_instance.consultarNFSe("5eef8cbc1666445f0598c958");
    let v3 = await nfse_instance.cancelarNFSe("5eef8cbc1666445f0598c958");
    let v4 = await nfse_instance.download_NFSe("5eef8cbc1666445f0598c958", "pdf");
    let v5 = await nfse_instance.download_NFSe("5eef8cbc1666445f0598c958", "xml");
    let v7 = await nfse_instance.consultarDadosNFSe("5eef8cbc1666445f0598c958");
    let v8 = await nfse_instance.consultarDadosNFSe_CNPJ("XXXYY999", "08187168000160");
}
test();


/*
let nfse_entidades_instance = new NFSe_Entidades();
nfse_entidades_instance.consultaNFSe_Entidade("servico", {"id": "6553bc519d4dd57477aaf707"} ); //idServico gerado no cadastro
nfse_entidades_instance.consultaNFSe_Entidade("tomador", {"id": "08187168000160"} ); //cnpj

const mock = require("./MOCK");
nfse_entidades_instance.cadastrarEntidade("servico", {"payloadJSON": mock.MOCK_payload_servico} ); //idServico gerado no cadastro
nfse_entidades_instance.cadastrarEntidade("tomador", {"payloadJSON": mock.MOCK_payload_tomador} ); //cnpj
*/

const NFe = require("./NotaFiscal/cb/NFe/NFe");
let nfe_instance = new NFe();
nfe_instance.registrarNFe();
nfe_instance.cancelarNFe("5f738609fd55b378b8ea7e47");
nfe_instance.download_NFe("5f738609fd55b378b8ea7e47", "pdf");
nfe_instance.download_NFe("5f738609fd55b378b8ea7e47", "xml");
nfe_instance.consultarDadosNFe("5f738609fd55b378b8ea7e47");
nfe_instance.consultarDadosNFe_CNPJ("XXXYY99999", "08187168000160");
