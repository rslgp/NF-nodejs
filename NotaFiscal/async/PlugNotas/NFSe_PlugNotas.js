const util = require("../../global/util");

const mock = require("../../global/MOCK");

const nf = require("./NF_PlugNotas")
const default_nf = new nf();

module.exports = class NFSe_PlugNotas {
    async registrarNFSe(payloadDataMultiplasNotasJSONArray= mock.MOCK_payloadDataMultiplasNFSeJSONArray){
        let api_endpoint_path = util.BASE_URL + "/nfse";
        return default_nf.registrarNF(api_endpoint_path, payloadDataMultiplasNotasJSONArray);
    }

    //retorna rps (recibo provisorio de servico)
    async consultarNFSe(id_NFSe){ //id_NFSe from current.id, sandbox id 5eef8cbc1666445f0598c958
        let api_endpoint_path = util.BASE_URL + "/nfse/" + id_NFSe;
    
        let requestOptionsArgs = {
            method: 'GET',
        };

        let requestOptions = util.Default_Req_Options(requestOptionsArgs);

        return fetch(api_endpoint_path, requestOptions);
    }

    async cancelarNFSe(id_NFSe, args){
        let api_endpoint_path = util.BASE_URL + "/nfse/cancelar/" + id_NFSe;

        var payload = JSON.stringify({
            "codigo": args.cod_cancelamento_cidade || "C099",
            "message": "É necessário o body ao cancelar uma NFe, para incluir o código de cancelamento da cidade."
        });

        return default_nf.cancelarNF(api_endpoint_path, payload);
    }

    //ext - extensao do arquivo
    async download_NFSe(id_NFSe, ext){
        let api_endpoint_path = util.BASE_URL + `/nfse/${ext}/${id_NFSe}`;

        return default_nf.download_NF(api_endpoint_path);
    }
    
    async consultarDadosNFSe(id_NFSe){
        let api_endpoint_path = util.BASE_URL + "/nfse/consultar/" + id_NFSe;
    
        return default_nf.consultarDadosNF(api_endpoint_path);
    }

    //retorna o mesmo da consultarDadosNFSe porem usa cnpj no input
    async consultarDadosNFSe_CNPJ(idIntegracao, cnpj){
        let api_endpoint_path = util.BASE_URL + `/nfse/consultar/${idIntegracao}/${cnpj}`;
    
        return default_nf.consultarDadosNF_CNPJ(api_endpoint_path);
    }
}
