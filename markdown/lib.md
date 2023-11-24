# Pacote `THOT_NotaFiscal.js`

Este é um pacote Node.js que faz requisições REST relacionados a Nota Fiscal, emitir, consultar, cancelar, e usar conta_receber para gerar NF.

## Uso

Para usar a escrita dos logs, siga estas etapas:

1. Instancie a inicialização do com default ou passando um provedor

```javascript
const Actions_NFSe = require("../actions/Actions_NFSe");
const actions_nfse_instance = new Actions_NFSe(); //para usar provedor default
//const actions_nfse_instance = new Actions_NFSe(provedor); //para escolher um provedor especifico
```

2. Faça a chamada da função:

```javascript
    await actions_nfse_instance.action_run_nfse_avulsa(payload)

    await actions_nfse_instance.action_run_nfse_cancelar(id_NFSe, payload)

    await actions_nfse_instance.action_run_nfse_consultar(id_NFSe)

    actions_nfse_instance.action_run_conta_receber(contas_receber_id, payload)
```

3. parametros, estao no arquivo MOCK.js
```javascript
//action_run_nfse_avulsa
[{
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
}]

```

```javascript
//action_run_nfse_cancelar
//id da nota fiscal
//payload do PlugNotas (por default se nao for passado, coloca C099)
{cod_cancelamento_cidade="C099"}

```

```javascript
//action_run_nfse_consultar
//id da nota fiscal

```

```javascript
//action_run_conta_receber(contas_receber_id, payload)
//contas_receber_id é o index do banco de dados
//mesmo payload de action_run_nfse_avulsa

```


## Contribuição

Contribuições são bem-vindas! Se você encontrar um problema ou tiver uma melhoria, sinta-se à vontade para abrir uma issue ou enviar uma pull request.