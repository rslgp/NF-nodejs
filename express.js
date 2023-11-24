const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const nfseRouter = require('./routes/nfse');
app.use('/', nfseRouter);

const docsRouter = require('./routes/docs/swagger-thot-nf-api');
app.use('/', docsRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
