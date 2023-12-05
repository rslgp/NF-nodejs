let util = require("../../../utils/util");

//entidade servico ou tomador
class NFSe_Entidades {
	cadastrarEntidade(entidade, args) {
		let api_endpoint_path = util.BASE_URL + "/nfse/" + entidade;

		let payload = JSON.stringify(args["payloadJSON"]);

		let requestOptionsArgs = {
			method: "POST",
			body: payload,
		};

		let requestOptions = util.Default_Req_Options(requestOptionsArgs);

		return fetch(api_endpoint_path, requestOptions);
	}

	consultaNFSe_Entidade(entidade, args) {
		let api_endpoint_path = util.BASE_URL + `/nfse/${entidade}/${args.id}`;

		let requestOptionsArgs = {
			method: "GET",
		};

		let requestOptions = util.Default_Req_Options(requestOptionsArgs);

		return fetch(api_endpoint_path, requestOptions);
	}

	updateEntidade(entidade, args) {
		let api_endpoint_path = util.BASE_URL + "/nfse/" + entidade;

		let payload = JSON.stringify(args["payloadJSON"]);

		let requestOptionsArgs = {
			method: "PATCH",
			body: payload,
		};

		let requestOptions = util.Default_Req_Options(requestOptionsArgs);

		return fetch(api_endpoint_path, requestOptions);
	}
}
module.exports = new NFSe_Entidades();
