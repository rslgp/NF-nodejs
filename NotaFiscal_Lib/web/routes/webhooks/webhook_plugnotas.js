const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
//const port = 3001;

//app.use(bodyParser.json());
router.use(bodyParser.json());

const util = require("../../../utils/util");

require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
});

//ngrok http 3000
async function cadastrarWebhook() {
	let url = "https://fe95-52-54-4-232.ngrok-free.app/webhook";
	url += "/plugnotas";

	let payload = JSON.stringify({
		url: url,
		method: "POST",
	});

	let requestOptionsArgs = {
		method: "PUT",
		body: payload,
	};

	let requestOptions = util.Default_Req_Options(requestOptionsArgs);

	let resposta = await fetch(util.BASE_URL + "/webhook", requestOptions);
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

const aws = require("../../../utils/aws");
router.post("/plugnotas", async (req, res) => {
	// Handle the incoming webhook payload here
	console.log("Received webhook payload:", req.body);

	let result_sqlInsert = await pool.query(
		`UPDATE adm.nota_fiscal 
        SET 
        id_nf=$1,
        pdf_url=$2,
        xml_url=$3
        WHERE
        id_integracao=$4
        `,
		[req.body.id, req.body.pdf_url, req.body.xml_url, req.body.idIntegracao]
	);
	aws.saveNotaFiscalS3({
		pdf_url: req.body.pdf_url,
		xml_url: req.body.xml_url,
	});

	res.status(200).send("Webhook received");
});
module.exports = router;
/*
app.listen(port, () => {
	console.log(`Webhook server is running at http://localhost:${port}`);
});
*/
