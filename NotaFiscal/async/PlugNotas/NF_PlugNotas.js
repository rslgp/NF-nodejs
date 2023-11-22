const util = require("../../global/util");

const mock = require("../../global/MOCK");
const NFSeStrategy = require("../default/NFSeStrategy");

let instance = null;

module.exports = class NF_PlugNotas extends NFSeStrategy {
    constructor(){
        super();
        if(!instance){
            instance = this;
        }
        return instance;
    }
    
    registrarNF(api_endpoint_path, payloadDataMultiplasNotasJSONArray= mock.MOCK_payloadDataMultiplasNFeJSONArray){
        let payload = JSON.stringify( payloadDataMultiplasNotasJSONArray );
    
        let requestOptionsArgs = {
            method: 'POST',
            body: payload,
        };

        let requestOptions = util.Default_Req_Options(requestOptionsArgs);

        return fetch(api_endpoint_path, requestOptions);
    }

    //retorna rps (NAO TEM)
    /*consultarNFe(id_NFe){ //id_NFe from current.id, sandbox id 5eef8cbc1666445f0598c958
        let api_endpoint_path = util.BASE_URL + `/nfe/${id_NFe}`;
    
        let requestOptionsArgs = {
            method: 'GET',
        };

        let requestOptions = util.Default_Req_Options(requestOptionsArgs);
               
        //const cb = (r) => {
        //    r.text().then((value)=> console.log(value));
        //}
        return fetch(api_endpoint_path, requestOptions);
    }
    */

    cancelarNF(api_endpoint_path, payload){
        let requestOptionsArgs = {
            method: 'POST',
            body: payload,
        };

        let requestOptions = util.Default_Req_Options(requestOptionsArgs);

        return fetch(api_endpoint_path, requestOptions);
    }

    //ext - extensao do arquivo
    download_NF(api_endpoint_path){    
        let requestOptionsArgs = {
            method: 'GET',
        };

        let requestOptions = util.Default_Req_Options(requestOptionsArgs);
        
        return fetch(api_endpoint_path, requestOptions);
    }
    
    consultarDadosNF(api_endpoint_path){    
        let requestOptionsArgs = {
            method: 'GET',
        };

        let requestOptions = util.Default_Req_Options(requestOptionsArgs);

        return fetch(api_endpoint_path, requestOptions);
    }

    //retorna o mesmo da consultarDadosNFe porem usa cnpj no input
    consultarDadosNF_CNPJ(api_endpoint_path){
        let requestOptionsArgs = {
            method: 'GET',
        };

        let requestOptions = util.Default_Req_Options(requestOptionsArgs);

        return fetch(api_endpoint_path, requestOptions);
    }
}
