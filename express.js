const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Actions_NFSe = require("./actions/Actions_NFSe");
const actions_nfse_instance = new Actions_NFSe();

const { v4: uuidv4 } = require('uuid');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

/*
const mock_payload_contas_receber = {
    "servico_cod_item_lista_servico": 1.07,
    "servico_discriminacao": "teste"
}

actions_nfse_instance.action_run_conta_receber(415, mock_payload_contas_receber);
*/

app.post('/contas_receber/:id/criar_nf', async (req, res) => {
    const contas_receber_id = req.params.id;
    const payload = req.body;
    //console.log(contas_receber_id);
    actions_nfse_instance.action_run_conta_receber(contas_receber_id, payload);
    // Handle the payload here
    console.log(payload);
    res.send('Received the payload');
});

app.post('/nfse/criar', async (req, res) => {
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

app.post('/nfse/cancelar/:id', async (req, res) => {
    const id_NFSe = req.params.id;
    const payload = req.body;
    let action_retorno = await actions_nfse_instance.action_run_nfse_cancelar(id_NFSe, payload);
    let resposta = await action_retorno.json();
    console.log(resposta);
    res.send(resposta);
    //res.send('Received the payload');
});

app.get('/nfse/consultar/:id', async (req, res) => {
    const id_NFSe = req.params.id;
    let action_retorno = await actions_nfse_instance.action_run_nfse_consultar(id_NFSe);
    let resposta = await action_retorno.json();
    console.log(resposta);
    res.send(resposta);
    //res.send('Received the payload');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
