var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("x-api-key", "2da392a6-79d2-4304-a8b7-959572c7e44d");

var raw = JSON.stringify({
  "codigo": "1.02",
  "idIntegracao": "A001XT",
  "discriminacao": "Descrição dos serviços prestados, utilize | para quebra de linha na impressão.",
  "codigoTributacao": "4115200",
  "cnae": "4751201",
  "codigoCidadeIncidencia": "4115200",
  "descricaoCidadeIncidencia": "MARINGA",
  "unidade": "UN",
  "quantidade": 1,
  "iss": {
    "tipoTributacao": 0,
    "exigibilidade": 1,
    "retido": false,
    "aliquota": 3,
    "valor": 0,
    "valorRetido": 0,
    "processoSuspensao": "70049875465"
  },
  "obra": {
    "art": "6270201",
    "codigo": "21"
  },
  "valor": {
    "servico": 0.1,
    "baseCalculo": 0.1,
    "deducoes": 0,
    "descontoCondicionado": 0,
    "descontoIncondicionado": 0,
    "liquido": 0.1,
    "unitario": 0.1,
    "valorAproximadoTributos": 0
  },
  "deducao": {
    "tipo": 0,
    "descricao": "Sem Deduções"
  },
  "retencao": {
    "pis": {
      "aliquota": 0,
      "valor": 0
    },
    "cofins": {
      "aliquota": 0,
      "valor": 0
    },
    "csll": {
      "aliquota": 0,
      "valor": 0
    },
    "inss": {
      "aliquota": 0,
      "valor": 0
    },
    "irrf": {
      "aliquota": 0,
      "valor": 0
    },
    "outrasRetencoes": 0,
    "cpp": {
      "aliquota": 0,
      "valor": 0
    }
  },
  "tributavel": true,
  "ibpt": {
    "simplificado": {
      "aliquota": 0
    },
    "detalhado": {
      "aliquota": {
        "municipal": 0,
        "estadual": 0,
        "federal": 0
      }
    }
  },
  "responsavelRetencao": "1"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api.sandbox.plugnotas.com.br/nfse/servico", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));