
const MOCK_payload_tomador = 
{
    "cpfCnpj": "08187168000161",
    "inscricaoMunicipal": "8214100099",
    "inscricaoEstadual": "1234567850",
    "inscricaoSuframa": "1234567850",
    "indicadorInscricaoEstadual": 9,
    "razaoSocial": "Tomador de teste LTDA 2",
    "nomeFantasia": "Tomador de teste",
    "endereco": {
        "tipoLogradouro": "Avenida",
        "logradouro": "Duque de Caxias",
        "numero": "882",
        "complemento": "17 andar",
        "tipoBairro": "Zona",
        "bairro": "Zona 01",
        "codigoPais": "1058",
        "descricaoPais": "Brasil",
        "codigoCidade": "4115200",
        "descricaoCidade": "Maringá",
        "estado": "PR",
        "cep": "87020025"
    },
    "telefone": {
        "ddd": "44",
        "numero": "30379500"
    },
    "email": "tomador@plugnotas.com.br",
    "orgaoPublico": true
}

const MOCK_payload_servico = {
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
  }


const MOCK_payloadDataMultiplasNFSeJSONArray = [{
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

const MOCK_payloadDataMultiplasNFeJSONArray = [
  {
      "idIntegracao": "XXXYY99999",
      "presencial": true,
      "consumidorFinal": true,
      "natureza": "OPERAÇÃO INTERNA",
      "emitente": {
          "cpfCnpj": "08187168000160"
      },
      "destinatario": {
          "cpfCnpj": "08114280956",
          "razaoSocial": "NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL",
          "email": "contato@tecnospeed.com.br",
          "endereco": {
              "logradouro": "AVENIDA DUQUE DE CAXIAS",
              "numero": "882",
              "bairro": "CENTRO",
              "codigoCidade": "4115200",
              "descricaoCidade": "MARINGA",
              "estado": "PR",
              "cep": "87020025"
          }
      },
      "itens": [
          {
              "codigo": "1",
              "descricao": "NOTA FISCAL EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL",
              "ncm": "06029090",
              "cest": "0123456",
              "cfop": "5101",
              "valorUnitario": {
                  "comercial": 4.6,
                  "tributavel": 4.6
              },
              "valor": 4.6,
              "tributos": {
                  "icms": {
                      "origem": "0",
                      "cst": "00",
                      "baseCalculo": {
                          "modalidadeDeterminacao": 0,
                          "valor": 0
                      },
                      "aliquota": 0,
                      "valor": 0
                  },
                  "pis": {
                      "cst": "99",
                      "baseCalculo": {
                          "valor": 0,
                          "quantidade": 0
                      },
                      "aliquota": 0,
                      "valor": 0
                  },
                  "cofins": {
                      "cst": "07",
                      "baseCalculo": {
                          "valor": 0
                      },
                      "aliquota": 0,
                      "valor": 0
                  }
              }
          }
      ],
      "pagamentos": [
          {
              "aVista": true,
              "meio": "01",
              "valor": 4.6
          }
      ],
      "responsavelTecnico": {
          "cpfCnpj": "08187168000160",
          "nome": "Tecnospeed",
          "email": "contato@tecnospeed.com.br",
          "telefone": {
              "ddd": "44",
              "numero": "30379500"
          }
      }
  }
]

module.exports = {
    MOCK_payloadDataMultiplasNFSeJSONArray,
    MOCK_payloadDataMultiplasNFeJSONArray,
    MOCK_payload_servico,
    MOCK_payload_tomador,
}