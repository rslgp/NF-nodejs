const config = require("./config");
const BASE_URL = config.BASE_URL;
const API_KEY = config.API_KEY;

const fs = require("fs");

const global = {
    log_cb : (response) => {
        response.text().then((value)=> console.log(value));
    },
    
    do_fetch : (url, req_options, callback=global.log_cb, args_cb) => {    
        fetch(url, req_options)
        .then(response => {
            callback(response, args_cb);        
        })
        //.then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

}


const DEFAULT_HEADERS = new Headers();
DEFAULT_HEADERS.append("Content-Type", "application/json");
DEFAULT_HEADERS.append("x-api-key", API_KEY);

function Default_Req_Options(args){
    return {
        method: args.method,
        headers: DEFAULT_HEADERS,
        body: args.body,
        redirect: 'follow'
    };
}

function writeFile(response, id_NF, ext){    
    response.arrayBuffer().then((buffer) => {
        fs.writeFileSync("./"+ext+"/"+id_NF+'-NF.'+ext, Buffer.from(buffer));
        console.log(ext+' downloaded successfully');
      });
}

module.exports = {
    global,
    Default_Req_Options,
    writeFile,
    BASE_URL,
    API_KEY
};