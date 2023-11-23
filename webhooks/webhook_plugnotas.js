const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const util = require("../NotaFiscal/global/util");

async function cadastrarWebhook(){
    let url = "https://dashing-swift-precious.ngrok-free.app";    
    url += '/plugnotas/webhook';


    let payload = JSON.stringify( {
        "url": url,
        "method": "POST"
      } );
    
    let requestOptionsArgs = {
        method: 'PUT',
        body: payload,
    };

    let requestOptions = util.Default_Req_Options(requestOptionsArgs);

    let resposta = await fetch(util.BASE_URL+"/webhook", requestOptions);
    resposta = await resposta.json();
    console.log("webhook");
    console.log(resposta);
}
cadastrarWebhook();

/**
 * webhook payload response
{
  id: '655f97b22deb5cd9b2d6d06d',
  idIntegracao: '1de7f975-9813-4f8d-a9e7-5d5a98d1d404',
  emissao: '23/11/2023',
  situacao: 'CONCLUIDO',
  prestador: '08187168000160',
  tomador: '99999999999999',
  valorServico: 1,
  numeroNfse: '13277',
  serie: 'LAL',
  lote: 290008,
  numero: 7,
  codigoVerificacao: '5278FE6A7',
  autorizacao: '23/11/2023',
  mensagem: 'RPS Autorizada com sucesso',
  pdf: 'https://api.sandbox.plugnotas.com.br/nfse/pdf/655f97b22deb5cd9b2d6d06d',
  xml: 'https://api.sandbox.plugnotas.com.br/nfse/xml/655f97b22deb5cd9b2d6d06d'
}
 * 
 */
app.post('/plugnotas/webhook', (req, res) => {
  // Handle the incoming webhook payload here
  console.log('Received webhook payload:', req.body);
  res.status(200).send('Webhook received');
});

app.listen(port, () => {
  console.log(`Webhook server is running at http://localhost:${port}`);
});
