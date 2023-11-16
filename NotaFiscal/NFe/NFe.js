const util = require("../global/util");

const mock = require("../global/MOCK");

const nf = require("../default/NF")
const default_nf = new nf();

module.exports = class NFe {
    registrarNFe(payloadDataMultiplasNotasJSONArray= mock.MOCK_payloadDataMultiplasNFeJSONArray, cb){
        let api_endpoint_path = util.BASE_URL + "/nfe";        
        
        default_nf.registrarNF(api_endpoint_path, cb, payloadDataMultiplasNotasJSONArray);
    }

    //retorna rps (NAO TEM)
    /*consultarNFe(id_NFe){ //id_NFe from current.id, sandbox id 5eef8cbc1666445f0598c958
    }
    */

    cancelarNFe(id_NFe, cod_cancelamento_cidade="C099", cb){
        let api_endpoint_path = util.BASE_URL + `/nfe/${id_NFe}/cancelamento`;
        
        default_nf.cancelarNF(api_endpoint_path, cb, cod_cancelamento_cidade);
    }

    //ext - extensao do arquivo
    download_NFe(id_NFe, ext, local_cb){
        let api_endpoint_path = util.BASE_URL + `/nfe/${id_NFe}/${ext}`;
           
        let default_cb = (response) => {
            if (response.ok) {
                util.writeFile(response, id_NFe, ext);
            } else {
              console.error('Failed to download '+ext, response.status, response.statusText);
            }
        };

        const cb = (local_cb) ? local_cb : default_cb;

        default_nf.download_NF(api_endpoint_path, cb);
    }
    
    consultarDadosNFe(id_NFe, cb){
        let api_endpoint_path = util.BASE_URL + `/nfe/${id_NFe}/resumo`;
        
        default_nf.consultarDadosNF(api_endpoint_path, cb);
    }

    //retorna o mesmo da consultarDadosNFe porem usa cnpj no input
    consultarDadosNFe_CNPJ(idIntegracao, cnpj, cb){
        let api_endpoint_path = util.BASE_URL + `/nfe/${cnpj}/${idIntegracao}/resumo`;
    
        default_nf.consultarDadosNF_CNPJ(api_endpoint_path, cb);
    }
}
