const NFSe_PlugNotas = require("../NotaFiscal/async/PlugNotas/NFSe_PlugNotas");

const action_run_conta_receber_provider = require('./Actions_NFSe_conta_receber');

module.exports = class Actions_NFSe {
    constructor(provedor){
        switch(provedor){
            case "PlugNotas":
                this.nfse_instance = new NFSe_PlugNotas();
            break;

            default:
                this.nfse_instance = new NFSe_PlugNotas();
            break;
        }
    }

    /**
     * 
     * 
[
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
]
     *  
     */
    async action_run_nfse_avulsa(payload){
        return await this.nfse_instance.registrarNFSe(payload);
    }

    async action_run_nfse_cancelar(id_NFSe,payload){
        return await this.nfse_instance.cancelarNFSe(id_NFSe, payload);
    }

    async action_run_nfse_consultar(id_NFSe){
        return await this.nfse_instance.consultarDadosNFSe(id_NFSe);
    }

    action_run_conta_receber(contas_receber_id, payload){
        action_run_conta_receber_provider(contas_receber_id, payload, this.nfse_instance);
    }
}