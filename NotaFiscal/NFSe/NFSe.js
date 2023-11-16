const util = require("../global/util");

const mock = require("../global/MOCK");

const nf = require("../default/NF")
const default_nf = new nf();

module.exports = class NFSe {
    registrarNFSe(payloadDataMultiplasNotasJSONArray= mock.MOCK_payloadDataMultiplasNFSeJSONArray, cb){
        let api_endpoint_path = util.BASE_URL + "/nfse";
        default_nf.registrarNF(api_endpoint_path, cb, payloadDataMultiplasNotasJSONArray);
    }

    //retorna rps (recibo provisorio de servico)
    consultarNFSe(id_NFSe, cb){ //id_NFSe from current.id, sandbox id 5eef8cbc1666445f0598c958
        let api_endpoint_path = util.BASE_URL + "/nfse/" + id_NFSe;
    
        let requestOptionsArgs = {
            method: 'GET',
        };

        let requestOptions = util.Default_Req_Options(requestOptionsArgs);
               
        //const cb = (r) => {
        //    r.text().then((value)=> console.log(value));
        //}
        util.global.do_fetch(api_endpoint_path, requestOptions, cb);
    }

    cancelarNFSe(id_NFSe, cod_cancelamento_cidade="C099", cb){
        let api_endpoint_path = util.BASE_URL + "/nfse/cancelar/" + id_NFSe;
        
        default_nf.cancelarNF(api_endpoint_path, cb, cod_cancelamento_cidade);
    }

    //ext - extensao do arquivo
    download_NFSe(id_NFSe, ext, local_cb){
        let api_endpoint_path = util.BASE_URL + `/nfse/${ext}/${id_NFSe}`;
           
        let default_cb = (response) => {
            if (response.ok) {
                util.writeFile(response, id_NFSe, ext);
            } else {
              console.error('Failed to download '+ext, response.status, response.statusText);
            }
        };

        const cb = (local_cb) ? local_cb : default_cb;

        default_nf.download_NF(api_endpoint_path, cb);
    }
    
    consultarDadosNFSe(id_NFSe, cb){
        let api_endpoint_path = util.BASE_URL + "/nfse/consultar/" + id_NFSe;
    
        default_nf.consultarDadosNF(api_endpoint_path, cb);
    }

    //retorna o mesmo da consultarDadosNFSe porem usa cnpj no input
    consultarDadosNFSe_CNPJ(idIntegracao, cnpj, cb){
        let api_endpoint_path = util.BASE_URL + `/nfse/consultar/${idIntegracao}/${cnpj}`;
    
        default_nf.consultarDadosNF_CNPJ(api_endpoint_path, cb);
    }
}
