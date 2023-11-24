const express = require('express');
const router = express.Router();

const Actions_NFSe = require("../actions/Actions_NFSe");
const actions_nfse_instance = new Actions_NFSe();

const { v4: uuidv4 } = require('uuid');

/*
const mock_payload_contas_receber = {
    "servico_cod_item_lista_servico": 1.07,
    "servico_discriminacao": "teste"
}

actions_nfse_instance.action_run_conta_receber(415, mock_payload_contas_receber);
*/

router.post('/contas_receber/:id/criar_nf', async (req, res) => {
    const contas_receber_id = req.params.id;
    const payload = req.body;
    //console.log(contas_receber_id);
    actions_nfse_instance.action_run_conta_receber(contas_receber_id, payload);
    // Handle the payload here
    console.log(payload);
    res.send('Received the payload');
});

/**
 * @swagger
 * /nfse/criar:
 *   post:
 *     summary: Criar nota fiscal
 *     description: |
 *       Cria uma nova nota fiscal com os dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             - idIntegracao: "XXXYY999"
 *               prestador:
 *                 cpfCnpj: "08187168000160"
 *               tomador:
 *                 cpfCnpj: "99999999999999"
 *                 razaoSocial: "Empresa de Teste LTDA"
 *                 inscricaoMunicipal: "8214100099"
 *                 email: "teste@plugnotas.com.br"
 *                 endereco:
 *                   descricaoCidade: "Maringa"
 *                   cep: "87020100"
 *                   tipoLogradouro: "Rua"
 *                   logradouro: "Barao do rio branco"
 *                   tipoBairro: "Centro"
 *                   codigoCidade: "4115200"
 *                   complemento: "sala 01"
 *                   estado: "PR"
 *                   numero: "1001"
 *                   bairro: "Centro"
 *               servico:
 *                 - codigo: "14.10"
 *                   codigoTributacao: "14.10"
 *                   discriminacao: "Descrição dos serviços prestados, utilize | para quebra de linha na impressão."
 *                   cnae: "7490104"
 *                   iss:
 *                     tipoTributacao: 7
 *                     exigibilidade: 1
 *                     aliquota: 3
 *                   valor:
 *                     servico: 1
 *                     descontoCondicionado: 0
 *                     descontoIncondicionado: 0
 *     responses:
 *       200:
 *         description: Nota fiscal criada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               idNotaFiscal: "12345"

 */
router.post('/nfse/criar', async (req, res) => {
    const payload = req.body;
    for(let i=0; i<payload.length; i++){
        payload[i].idIntegracao = uuidv4();
    }
    let action_retorno = await actions_nfse_instance.action_run_nfse_avulsa(payload);
    let resposta = await action_retorno.json();
    console.log(resposta);
    res.send(resposta);
    //res.send('Received the payload');
});

/**
 * @swagger
 * /nfse/cancelar/{id}:
 *   get:
 *     summary: Cancelar nota fiscal por id da nota fiscal
 *     description:  |
 *      Cancela uma nota fiscal, tentando 10 vezes em caso de erro 400
 *       200:
 *         description: Emite mensagem de nota cancelada
 */
router.post('/nfse/cancelar/:id', async (req, res) => {
    const id_NFSe = req.params.id;
    const payload = req.body;
    let action_retorno = await actions_nfse_instance.action_run_nfse_cancelar(id_NFSe, payload);
    let resposta = await action_retorno.json();
    console.log(resposta);
    res.send(resposta);
    //res.send('Received the payload');
});

/**
 * @swagger
 * /nfse/consultar/{id}:
 *   get:
 *     summary: Consulta nota fiscal por id da nota fiscal
 *     description:   |
 *      Consulta uma nota fiscal, obtendo todas informações sobre a nota, incluindo pdf e xml
 *       200:
 *         description: JSON com dados da nota fiscal
 */
router.get('/nfse/consultar/:id', async (req, res) => {
    const id_NFSe = req.params.id;
    let action_retorno = await actions_nfse_instance.action_run_nfse_consultar(id_NFSe);
    let resposta = await action_retorno.json();
    console.log(resposta);
    res.send(resposta);
    //res.send('Received the payload');
});

module.exports = router;