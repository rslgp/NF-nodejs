const AWS = require("aws-sdk");

// Configure the AWS SDK
const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACESSKEYID,
	secretAccessKey: process.env.AWS_SECRETACESSKEY,
});

const aws_params = {
	Bucket: process.env.AWS_BUCKET,
};

function save_notafiscal(args, extensao, content) {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to get the correct month and padding with 0 if necessary

	const yearMonthString = `${year}-${month}`;
	let params = {
		Key: `${args.cnpj}/${yearMonthString}/${extensao}/NF-${args.dest_cnpj}-${args.id_nf}.${extensao}`,
		Body: content,
		...aws_params,
	};

	s3.upload(params, (err, data) => {
		if (err) {
			console.error(err);
		} else {
			console.log(`${extensao} uploaded to S3:`, data.Location);
		}
	});
	console.log(aws_params.Key);
}

async function download_notafiscal(args) {
	let params = {
		Key: `${args.cnpj}/${args.date}/${args.extensao}/NF-${args.dest_cnpj}-${args.id_nf}.${args.extensao}`,
		...aws_params,
	};
	const data = await s3.getObject(params).promise();
	return data;
}

class AWS_SERVICE {
	async saveNotaFiscalS3(args) {
		//TODO como sera o download dos arquivos?
		/** key
         * path: cnpj/data-criacao/pdf/NF-cpfCnpj_nf_id.pdf

           path: cnpj/data-criacao/xml/NF-cpfCnpj-nf_id.xml
         */
		let response = null;

		response = await fetch(args.xml_url);
		save_notafiscal(args, "xml", response.body);

		response = await fetch(args.pdf_url);
		save_notafiscal(args, "pdf", response.body);
	}

	async deleteFileS3(args) {
		//rule protected
		// Delete the file from S3
		aws_params.Key = args.key;

		s3.deleteObject(aws_params, (err, data) => {
			if (err) {
				console.error(err);
			} else {
				console.log("File deleted from S3");
			}
		});
	}

	async downloadNotaFiscalS3(args) {
		/**
		 * args: date (year-month), extensao, cnpj, dest_cnpj, id_nf
		 */
		return await download_notafiscal(args);
	}
}
module.exports = new AWS_SERVICE();
