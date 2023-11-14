var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("x-api-key", "2da392a6-79d2-4304-a8b7-959572c7e44d");

var payload = JSON.stringify([
  {
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
  }
]);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: payload,
  redirect: 'follow'
};

fetch("https://api.sandbox.plugnotas.com.br/nfse", requestOptions)
  .then(response => {
    response.text().then((value)=> console.log(value));
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));