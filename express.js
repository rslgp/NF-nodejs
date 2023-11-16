const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const NFSe = require("./NotaFiscal/NFSe/NFSe");
let nfse_instance = new NFSe();
//const mock = require("./NotaFiscal/global/MOCK");

require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

const { v4: uuidv4 } = require('uuid');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

function payloadHandle(payload, cliente_id){
    pool.query(
        `SELECT cliente_id FROM cliente WHERE id=$1`,
        [cliente_id],
        (error, results) => {
            if (error) {
                console.error('Error executing query', error);
            } else {
                const cliente = results.rows[0];
                for(let i in payload){
                    payload[i].idIntegracao = uuidv4();
                    payload[i].emitente.cpfCnpj = "04544707000110";
                    payload[i].destinatario.cpfCnpj = cliente.cpf_cnpj;
                    payload[i].destinatario.razaoSocial = cliente.nome; //TODO DIVIDA TECNICA MUDAR PARA CLIENTE RAZAO SOCIAL
                    payload[i].destinatario.endereco = {
                        "logradouro": cliente.logradouro,
                        "numero": cliente.numero,
                        "bairro": cliente.bairro,
                        "codigoCidade": "4115200", //TODO
                        "descricaoCidade": "MARINGA",
                        "estado": cliente.estado,
                        "cep": cliente.cep
                    };
                }
            }
            pool.end();
        }
    );
}

app.post('/contas_receber/:id/criar_nf', (req, res) => {
    const contas_a_receber_id = req.params.id;
    pool.query(
        `SELECT cliente_id FROM conta_receber WHERE id=$1`,
        [contas_a_receber_id],
        (error, results) => {
            if (error) {
                console.error('Error executing query', error);
            } else {
                console.log('Query result', results.rows);
            }
            pool.end();
        }
    );
    const payload = req.body;
    // Handle the payload here
    let custom_cb = (response) => {
        response.text().then((value)=> console.log(value));
    };
    nfse_instance.registrarNFSe(payload, custom_cb);
    console.log(payload);
    res.send('Received the payload');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
