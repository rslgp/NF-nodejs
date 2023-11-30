
const util = require('../NotaFiscal/global/util')
const axios = require('axios');
const FormData = require('form-data');
const express = require('express');
const multer = require('multer');
const upload = multer();

const router = express.Router();

const Certificado_PN = require('../NotaFiscal/certificado/certificado_pn');
const certificado_tabela = new Certificado_PN();

/**
 * certificado, senha, cnpj
 */
router.post('/certificado', upload.single('arquivo'), async (req, res) => {
  const buffer = req.file.buffer; // Access the file buffer from the request object
  console.log(req.body.senha)
  let data = new FormData();
  data.append('cnpj', req.body.cnpj);
  data.append('senha', req.body.senha);
  data.append('arquivo', buffer, {
    filename: req.file.originalname,
    contentType: req.file.mimetype
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: util.BASE_URL+"/certificado",
    headers: { 
      'x-api-key': util.API_KEY, 
      ...data.getHeaders()
    },
    data: data
  };
  
  try{    
    let response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    certificado_tabela.add(
        {"certificado_id":response.data.data.id, 
        "arquivo": buffer, 
        "senha": req.body.senha, 
        "cnpj":req.body.cnpj
    })
    res.sendStatus(200);
  }catch(e){
    console.error(e);
    res.sendStatus(500);
  }
  
});

module.exports = router;
