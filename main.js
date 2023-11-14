const NFSe = require("./NotaFiscal/NFSe");

let nfse_instance = new NFSe();
nfse_instance.registrarNFSe();
nfse_instance.consultarNFSe("5eef8cbc1666445f0598c958");
nfse_instance.cancelarNFSe("5eef8cbc1666445f0598c958");
