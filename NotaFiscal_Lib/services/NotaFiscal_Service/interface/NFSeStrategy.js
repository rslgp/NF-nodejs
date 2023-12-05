module.exports = class NFSeStrategy {
	registrarNF(api_endpoint_path, payloadDataMultiplasNotasJSONArray) {
		throw new Error("This method should be overridden");
	}

	cancelarNF(api_endpoint_path, args) {
		throw new Error("This method should be overridden");
	}

	//ext - extensao do arquivo
	download_NF(api_endpoint_path) {
		throw new Error("This method should be overridden");
	}

	consultarDadosNF(api_endpoint_path) {
		throw new Error("This method should be overridden");
	}

	//retorna o mesmo da consultarDadosNFe porem usa cnpj no input
	consultarDadosNF_CNPJ(api_endpoint_path) {
		throw new Error("This method should be overridden");
	}
};
