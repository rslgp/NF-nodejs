require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
});

const AesEncryption = require("aes-encryption");

const aes = new AesEncryption();
aes.setSecretKey(process.env.AES_KEY);

const AWS = require("aws-sdk");

// Configure the AWS SDK
const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACESSKEYID,
	secretAccessKey: process.env.AWS_SECRETACESSKEY,
});

const aws_params = {
	Bucket: process.env.AWS_BUCKET,
};

function saveAWS(args) {
	aws_params.Key = args.arquivo_path;
	aws_params.Body = args.arquivo;

	s3.upload(aws_params, (err, data) => {
		if (err) {
			console.error(err);
		} else {
			console.log(`${aws_params.Key} uploaded to S3:`, data.Location);
		}
	});
	console.log(aws_params.Key);
}

class Certificado_PN {
	async add(args) {
		args.arquivo_path = `${args.cnpj}/certificado`;
		//args.arquivo_path = "/";
		//guardar arquivo no bucket
		saveAWS(args);
		args.senha = aes.encrypt(args.senha);

		let elem_cliente = await pool.query(
			`SELECT empresa_id FROM adm.cliente WHERE cpf_cnpj=$1`,
			[args.cnpj]
		);

		let sql_query_result = await pool.query(
			`INSERT INTO adm.certificado_nf
            (certificado_id, arquivo_path, arquivo_nome, senha, empresa_id, cnpj)
            VALUES ($1, $2, $3, $4, $5, $6)
            `,
			[
				args.certificado_id,
				args.arquivo_path,
				args.arquivo_nome,
				args.senha,
				elem_cliente.rows[0].empresa_id,
				args.cnpj,
			]
		);
	}

	async get_id(args) {
		let sql_query_result = await pool.query(
			`SELECT certificado_id FROM adm.certificado_nf WHERE cnpj=$1`,
			[args.cnpj]
		);

		return sql_query_result.rows[0].certificado_id;
	}
}
module.exports = new Certificado_PN();
