const util = require("../../utils/util");
const axios = require("axios");
const FormData = require("form-data");
const express = require("express");
const multer = require("multer");
const upload = multer();

const router = express.Router();

const certificado_tabela = require("../../services/certificado/certificado_pn");

/**
 * certificado, senha, cnpj
 */
router.post("/certificado", upload.single("arquivo"), async (req, res) => {
	const buffer = req.file.buffer; // Access the file buffer from the request object
	console.log(req.body.senha);
	let data = new FormData();
	data.append("cnpj", req.body.cnpj);
	data.append("senha", req.body.senha);
	data.append("arquivo", buffer, {
		filename: req.file.originalname,
		contentType: req.file.mimetype,
	});

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: util.BASE_URL + "/certificado",
		headers: {
			"x-api-key": util.API_KEY,
			...data.getHeaders(),
		},
		data: data,
	};

	try {
		let response = await axios.request(config);
		console.log(JSON.stringify(response.data));
		certificado_tabela.add({
			certificado_id: response.data.data.id,
			arquivo: buffer,
			senha: req.body.senha,
			cnpj: req.body.cnpj,
			arquivo_nome: req.file.originalname,
		});
		res.sendStatus(200);
	} catch (e) {
		console.error(e);
		res.sendStatus(500);
	}
});

router.post("/empresa", async (req, res) => {
	req.body.certificado = await certificado_tabela.get_id({
		cnpj: req.body.cpfCnpj,
	});
	let data = JSON.stringify(req.body);
	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: util.BASE_URL + "/empresa",
		headers: {
			"Content-Type": "application/json",
			"x-api-key": util.API_KEY,
		},
		data: data,
	};

	axios
		.request(config)
		.then((response) => {
			console.log(JSON.stringify(response.data));
			res.sendStatus(200);
		})
		.catch((error) => {
			console.log(error.message);
			res.sendStatus(500);
		});
});

router.post("/logotipo/:cnpj", upload.single("arquivo"), async (req, res) => {
	const buffer = req.file.buffer;
	let data = new FormData();
	data.append("arquivo", buffer, {
		filename: req.file.originalname,
		contentType: req.file.mimetype,
	});

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${util.BASE_URL}/empresa/${req.params.cnpj}/logotipo`,
		headers: {
			"x-api-key": util.API_KEY,
			...data.getHeaders(),
		},
		data: data,
	};

	axios
		.request(config)
		.then((response) => {
			console.log(JSON.stringify(response.data));
			res.sendStatus(200);
		})
		.catch((error) => {
			console.log(error);
			res.sendStatus(500);
		});
});

// webhook_url
router.post("/cadastrar-webhook/:cnpj", async (req, res) => {
	let data = JSON.stringify({
		url: req.body.webhook_url,
		method: "POST",
		headers: {
			Authorization: "Basic YWRtaW46MTIzbXV=",
		},
	});

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: util.BASE_URL + `/empresa/${req.params.cnpj}/webhook`,
		headers: {
			"x-api-key": util.API_KEY,
			"Content-Type": "application/json",
		},
		data: data,
	};

	axios
		.request(config)
		.then((response) => {
			console.log(JSON.stringify(response.data));
			res.sendStatus(200);
		})
		.catch((error) => {
			console.log(error);
			res.sendStatus(500);
		});
});

module.exports = router;
