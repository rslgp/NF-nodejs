const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const nfseRouter = require("./routes/nfse");
app.use("/", nfseRouter);

const docsRouter = require("./routes/docs/swagger-thot-nf-api");
app.use("/", docsRouter);

//router buga e tem conflito com multer upload file
const cadastroRouter = require("./routes/cadastro");
app.use("/", cadastroRouter);

const webhookRouter = require("./routes/webhooks/webhook_plugnotas");
app.use("/webhook", webhookRouter);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
