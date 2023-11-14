const config = require("../config.js");
const BASE_URL = config.BASE_URL;
const API_KEY = config.API_KEY;


const MOCK_payloadDataMultiplasNotasJSONArray = [{
    "idIntegracao": "XXXYY999",
    "prestador": {
    "cpfCnpj": "08187168000160"
    },
    "tomador": {
    "cpfCnpj": "99999999999999",
    "razaoSocial": "Empresa de Teste LTDA",
    "inscricaoMunicipal": "8214100099",
    "email": "teste@plugnotas.com.br",
    "endereco": {
        "descricaoCidade": "Maringa",
        "cep": "87020100",
        "tipoLogradouro": "Rua",
        "logradouro": "Barao do rio branco",
        "tipoBairro": "Centro",
        "codigoCidade": "4115200",
        "complemento": "sala 01",
        "estado": "PR",
        "numero": "1001",
        "bairro": "Centro"
    }
    },
    "servico": [
    {
        "codigo": "14.10",
        "codigoTributacao": "14.10",
        "discriminacao": "Descrição dos serviços prestados, utilize | para quebra de linha na impressão.",
        "cnae": "7490104",
        "iss": {
        "tipoTributacao": 7,
        "exigibilidade": 1,
        "aliquota": 3
        },
        "valor": {
        "servico": 1,
        "descontoCondicionado": 0,
        "descontoIncondicionado": 0
        }
    }
    ]
}];

function do_fetch(url, req_options, callback, args){    
    fetch(url, req_options)
    .then(response => {
        //callback(response);
        response.text().then((value)=> console.log(value));
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

module.exports = class NFSe {
    static get NFSe_Header(){
        let defaultNFSe_headers = new Headers();
        defaultNFSe_headers.append("Content-Type", "application/json");
        defaultNFSe_headers.append("x-api-key", API_KEY);

        return defaultNFSe_headers;
    }

    NFSe_Req_Options(args){
        return {
            method: args.method,
            headers: NFSe.NFSe_Header,
            body: args.body,
            redirect: 'follow'
        };
    }

    registrarNFSe(payloadDataMultiplasNotasJSONArray){
        let api_endpoint_path = BASE_URL + "/nfse";        
    
        let payload = JSON.stringify( MOCK_payloadDataMultiplasNotasJSONArray );
    
        let requestOptionsArgs = {
            method: 'POST',
            body: payload,
        };

        let requestOptions = this.NFSe_Req_Options(requestOptionsArgs);

        do_fetch(api_endpoint_path, requestOptions);
    }

    consultarNFSe(id_NFSe){ //id_NFSe from current.id, sandbox id 5eef8cbc1666445f0598c958
        let api_endpoint_path = BASE_URL + "/nfse/"+id_NFSe;
    
        let requestOptionsArgs = {
            method: 'GET',
        };

        let requestOptions = this.NFSe_Req_Options(requestOptionsArgs);
               
        //const cb = (r) => {
        //    r.text().then((value)=> console.log(value));
        //}
        do_fetch(api_endpoint_path, requestOptions);
    }

    cancelarNFSe(id_NFSe, cod_cancelamento_cidade="C099"){
        let api_endpoint_path = BASE_URL + "/nfse/cancelar/"+id_NFSe;
        
        var payload = JSON.stringify({
            "codigo": cod_cancelamento_cidade,
            "message": "É necessário o body ao cancelar uma NFSe, para incluir o código de cancelamento da cidade."
          });

        let requestOptionsArgs = {
            method: 'POST',
            body: payload,
        };

        let requestOptions = this.NFSe_Req_Options(requestOptionsArgs);

        do_fetch(api_endpoint_path, requestOptions);
    }
}
