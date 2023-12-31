const NFSe_PlugNotas = require("../services/NotaFiscal_Service/PlugNotas/NFSe_PlugNotas");

const {
	action_run_conta_receber: action_run_conta_receber_provider,
	action_run_conta_receber_vencimento:
		action_run_conta_receber_vencimento_provider,
} = require("./Actions_NFSe_conta_receber");

module.exports = class Actions_NFSe {
	constructor(provedor) {
		//TODO FALTA COLOCAR POR CIDADE
		switch (provedor) {
			case "PlugNotas":
				this.nfse_instance = NFSe_PlugNotas;
				break;

			default:
				this.nfse_instance = NFSe_PlugNotas;
				break;
		}
	}

	async action_run_nfse_avulsa(payload) {
		return await this.nfse_instance.registrarNFSe(payload);
	}

	async action_run_nfse_cancelar(id_NFSe, payload) {
		return await this.nfse_instance.cancelarNFSe(id_NFSe, payload);
	}

	async action_run_nfse_consultar(id_NFSe) {
		return await this.nfse_instance.consultarDadosNFSe(id_NFSe);
	}

	async action_run_nfse_download(id_NFSe, extensao) {
		return await this.nfse_instance.download_NFSe(id_NFSe, extensao);
	}

	action_run_conta_receber(contas_receber_id, payload) {
		action_run_conta_receber_provider(
			contas_receber_id,
			payload,
			this.nfse_instance
		);
	}

	action_run_conta_receber_vencimento(vencimento, payload) {
		action_run_conta_receber_vencimento_provider(
			vencimento,
			payload,
			this.nfse_instance
		);
	}

	async action_run_plugnotas_certificado(payload) {
		return await this.nfse_instance.cadastrarCertificado(payload);
	}
};
