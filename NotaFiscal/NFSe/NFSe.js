const fs = require("fs");

const util = require("./util.js");



function writeFile(response, id_NFSe, ext){    
    response.arrayBuffer().then((buffer) => {
        fs.writeFileSync("./"+ext+"/"+id_NFSe+'-NF.'+ext, Buffer.from(buffer));
        console.log(ext+' downloaded successfully');
      });
}

const mock = require("../../MOCK");

module.exports = class NFSe {
    registrarNFSe(payloadDataMultiplasNotasJSONArray= mock.MOCK_payloadDataMultiplasNotasJSONArray){
        let api_endpoint_path = util.BASE_URL + "/nfse";        
    
        let payload = JSON.stringify( payloadDataMultiplasNotasJSONArray );
    
        let requestOptionsArgs = {
            method: 'POST',
            body: payload,
        };

        let requestOptions = util.NFSe_Req_Options(requestOptionsArgs);

        util.global.do_fetch(api_endpoint_path, requestOptions);
    }

    //retorna rps
    consultarNFSe(id_NFSe){ //id_NFSe from current.id, sandbox id 5eef8cbc1666445f0598c958
        let api_endpoint_path = util.BASE_URL + "/nfse/" + id_NFSe;
    
        let requestOptionsArgs = {
            method: 'GET',
        };

        let requestOptions = util.NFSe_Req_Options(requestOptionsArgs);
               
        //const cb = (r) => {
        //    r.text().then((value)=> console.log(value));
        //}
        util.global.do_fetch(api_endpoint_path, requestOptions);
    }

    cancelarNFSe(id_NFSe, cod_cancelamento_cidade="C099"){
        let api_endpoint_path = util.BASE_URL + "/nfse/cancelar/" + id_NFSe;
        
        var payload = JSON.stringify({
            "codigo": cod_cancelamento_cidade,
            "message": "É necessário o body ao cancelar uma NFSe, para incluir o código de cancelamento da cidade."
          });

        let requestOptionsArgs = {
            method: 'POST',
            body: payload,
        };

        let requestOptions = util.NFSe_Req_Options(requestOptionsArgs);

        util.global.do_fetch(api_endpoint_path, requestOptions);
    }

    //ext - extensao do arquivo
    download_NFSe(id_NFSe, ext){
        let api_endpoint_path = util.BASE_URL + `/nfse/${ext}/${id_NFSe}`;
    
        let requestOptionsArgs = {
            method: 'GET',
        };

        let requestOptions = util.NFSe_Req_Options(requestOptionsArgs);
               
        const cb = (response) => {
            if (response.ok) {
                writeFile(response, id_NFSe, ext);
            } else {
              console.error('Failed to download '+ext, response.status, response.statusText);
            }
          };

        util.global.do_fetch(api_endpoint_path, requestOptions, cb);
    }
    
    consultarDadosNFSe(id_NFSe){
        let api_endpoint_path = util.BASE_URL + "/nfse/consultar/" + id_NFSe;
    
        let requestOptionsArgs = {
            method: 'GET',
        };

        let requestOptions = util.NFSe_Req_Options(requestOptionsArgs);

        util.global.do_fetch(api_endpoint_path, requestOptions);
    }

    //retorna o mesmo da consultarDadosNFSe porem usa cnpj no input
    consultarDadosNFSe_CNPJ(idIntegracao, cnpj){
        let api_endpoint_path = util.BASE_URL + `/nfse/consultar/${idIntegracao}/${cnpj}`;
    
        let requestOptionsArgs = {
            method: 'GET',
        };

        let requestOptions = util.NFSe_Req_Options(requestOptionsArgs);

        util.global.do_fetch(api_endpoint_path, requestOptions);
    }
}
