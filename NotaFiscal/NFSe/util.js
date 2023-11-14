const config = require("../../config.js");
const BASE_URL = config.BASE_URL;
const API_KEY = config.API_KEY;

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

function get_NFSe_Header() {
    let defaultNFSe_headers = new Headers();
    defaultNFSe_headers.append("Content-Type", "application/json");
    defaultNFSe_headers.append("x-api-key", API_KEY);

    return defaultNFSe_headers;
}

function NFSe_Req_Options(args){
    return {
        method: args.method,
        headers: get_NFSe_Header(),
        body: args.body,
        redirect: 'follow'
    };
}

module.exports = {
    global,
    NFSe_Req_Options,
    BASE_URL,
    API_KEY
};