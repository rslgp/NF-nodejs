let util = require("../../../global/util")

//entidade servico ou tomador
module.exports = class NFSe_Entidades{
    cadastrarEntidade(entidade, args){
        let api_endpoint_path = util.BASE_URL + "/nfse/"+entidade;        
    
        let payload = JSON.stringify( args["payloadJSON"] );
    
        let requestOptionsArgs = {
            method: 'POST',
            body: payload,
        };

        let requestOptions = util.Default_Req_Options(requestOptionsArgs);

        util.global.do_fetch_cb(api_endpoint_path, requestOptions);
    }

    consultaNFSe_Entidade(entidade, args){
        let api_endpoint_path = util.BASE_URL + `/nfse/${entidade}/${args.id}`;
    
        let requestOptionsArgs = {
            method: 'GET',
        };
    
        let requestOptions = util.Default_Req_Options(requestOptionsArgs);
             
        util.global.do_fetch_cb(api_endpoint_path, requestOptions);
    }

    updateEntidade(entidade, args){
        let api_endpoint_path = util.BASE_URL + "/nfse/"+entidade;        
    
        let payload = JSON.stringify( args["payloadJSON"] );
    
        let requestOptionsArgs = {
            method: 'PATCH',
            body: payload,
        };

        let requestOptions = util.Default_Req_Options(requestOptionsArgs);

        util.global.do_fetch_cb(api_endpoint_path, requestOptions);
    }
}