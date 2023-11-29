const AWS = require('aws-sdk');

// Configure the AWS SDK
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACESSKEYID,
    secretAccessKey: process.env.AWS_SECRETACESSKEY
});

const aws_params = {
    Bucket: process.env.AWS_BUCKET
}

function save(args, extensao, content){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to get the correct month and padding with 0 if necessary

    const yearMonthString = `${year}-${month}`;
    aws_params.Key = `${args.cnpj}/${yearMonthString}/${extensao}/NF-${args.dest_cnpj}-${args.id_nf}.${extensao}`;
    aws_params.Body = content;

    s3.upload(aws_params, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${extensao} uploaded to S3:`, data.Location);
        }
    });
    console.log(aws_params.Key);

}

module.exports = class AWS_SERVICE {
    async saveFilesS3(args){
        /** key
         * path: cnpj/data-criacao/pdf/NF-cpfCnpj_nf_id.pdf

           path: cnpj/data-criacao/xml/NF-cpfCnpj-nf_id.xml
         */
        let response = null;
        
        response = await fetch(args.xml_url);
        save(args, "xml", response.body);

        response = await fetch(args.pdf_url);
        save(args, "pdf", response.body);


    }

    async deleteFileS3(args){
        // Delete the file from S3
        aws_params.Key = args.key;
        
        s3.deleteObject(aws_params, (err, data) => {
            if (err) {
            console.error(err);
            } else {
            console.log('File deleted from S3');
            }
        });
    }
}