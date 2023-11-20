const util = require("../../global/util");

const mock = require("../../global/MOCK");

module.exports = class NF {
    registrarNF(api_endpoint_path, cb, payloadDataMultiplasNotasJSONArray= mock.MOCK_payloadDataMultiplasNFeJSONArray){
        let payload = JSON.stringify( payloadDataMultiplasNotasJSONArray );
    
        let requestOptionsArgs = {
            method: 'POST',
            body: payload,
        };

        let requestOptions = util.Default_Req_Options(requestOptionsArgs);

        util.global.do_fetch_cb(api_endpoint_path, requestOptions, cb);
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
        util.global.do_fetch_cb(api_endpoint_path, requestOptions, cb);
    }
    */

    cancelarNF(api_endpoint_path, cb, cod_cancelamento_cidade="C099"){        
        var payload = JSON.stringify({
            "codigo": cod_cancelamento_cidade,
            "message": "É necessário o body ao cancelar uma NFe, para incluir o código de cancelamento da cidade."
          });

        let requestOptionsArgs = {
            method: 'POST',
            body: payload,
        };

        let requestOptions = util.Default_Req_Options(requestOptionsArgs);

        util.global.do_fetch_cb(api_endpoint_path, requestOptions, cb);
    }

    //ext - extensao do arquivo
    download_NF(api_endpoint_path, cb){    
        let requestOptionsArgs = {
            method: 'GET',
        };

        let requestOptions = util.Default_Req_Options(requestOptionsArgs);
        
        util.global.do_fetch_cb(api_endpoint_path, requestOptions, cb);
    }
    
    consultarDadosNF(api_endpoint_path, cb){    
        let requestOptionsArgs = {
            method: 'GET',
        };

        let requestOptions = util.Default_Req_Options(requestOptionsArgs);

        util.global.do_fetch_cb(api_endpoint_path, requestOptions, cb);
    }

    //retorna o mesmo da consultarDadosNFe porem usa cnpj no input
    consultarDadosNF_CNPJ(api_endpoint_path, cb){
        let requestOptionsArgs = {
            method: 'GET',
        };

        let requestOptions = util.Default_Req_Options(requestOptionsArgs);

        util.global.do_fetch_cb(api_endpoint_path, requestOptions, cb);
    }
}
