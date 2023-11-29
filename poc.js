
const axios = require('axios');
const FormData = require('form-data');
const express = require('express');
const multer = require('multer');
const upload = multer();

const app = express();

app.post('/upload', upload.single('arquivo'), async (req, res) => {
  const buffer = req.file.buffer; // Access the file buffer from the request object
  
  let data = new FormData();
  data.append('senha', '123mudar');
  data.append('arquivo', buffer, {
    filename: req.file.originalname,
    contentType: req.file.mimetype
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.sandbox.plugnotas.com.br/certificado',
    headers: { 
      'x-api-key': '2da392a6-79d2-4304-a8b7-959572c7e44d', 
      ...data.getHeaders()
    },
    data: data
  };
  
  try{    
    let response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    res.sendStatus(200);
  }catch(e){
    res.sendStatus(500);
  }
  
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
