const NFSe = require("./NotaFiscal/NFSe/NFSe");

const NFSe_Entidades = require("./NotaFiscal/NFSe/Entidades/NFSe_Entidades");

/*
let nfse_instance = new NFSe();
nfse_instance.registrarNFSe();
nfse_instance.consultarNFSe("5eef8cbc1666445f0598c958");
nfse_instance.cancelarNFSe("5eef8cbc1666445f0598c958");
nfse_instance.download_NFSe("5eef8cbc1666445f0598c958", "pdf");
nfse_instance.download_NFSe("5eef8cbc1666445f0598c958", "xml");
nfse_instance.consultarDadosNFSe("5eef8cbc1666445f0598c958");
nfse_instance.consultarDadosNFSe_CNPJ("XXXYY999", "08187168000160");
*/

let nfse_entidades_instance = new NFSe_Entidades();
nfse_entidades_instance.consultaNFSe_Entidade("servico", {"id": "6553bc519d4dd57477aaf707"} ); //idServico gerado no cadastro
nfse_entidades_instance.consultaNFSe_Entidade("tomador", {"id": "08187168000160"} ); //cnpj

const mock = require("./MOCK");
nfse_entidades_instance.cadastrarEntidade("servico", {"payloadJSON": mock.MOCK_payload_servico} ); //idServico gerado no cadastro
nfse_entidades_instance.cadastrarEntidade("tomador", {"payloadJSON": mock.MOCK_payload_tomador} ); //cnpj