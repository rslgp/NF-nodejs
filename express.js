const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const action_run_conta_receber = require('./NF_Services/gateway/plugnotas');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const mock_payload_contas_receber = {
    "servico_cod_item_lista_servico": 1.07,
    "servico_discriminacao": "teste"
}

action_run_conta_receber(415, mock_payload_contas_receber);

app.post('/contas_receber/:id/criar_nf', async (req, res) => {
    const contas_receber_id = req.params.id;
    const payload = req.body;
    //console.log(contas_receber_id);
    action_run_conta_receber(contas_receber_id, payload);
    // Handle the payload here
    console.log(payload);
    res.send('Received the payload');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
