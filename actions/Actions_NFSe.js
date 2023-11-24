const NFSe_PlugNotas = require("../NotaFiscal/async/PlugNotas/NFSe_PlugNotas");

const action_run_conta_receber_provider = require('./Actions_NFSe_conta_receber');

module.exports = class Actions_NFSe {
    constructor(provedor){ //TODO FALTA COLOCAR POR CIDADE
        switch(provedor){
            case "PlugNotas":
                this.nfse_instance = new NFSe_PlugNotas();
            break;

            default:
                this.nfse_instance = new NFSe_PlugNotas();
            break;
        }
    }

    async action_run_nfse_avulsa(payload){
        return await this.nfse_instance.registrarNFSe(payload);
    }

    async action_run_nfse_cancelar(id_NFSe,payload){
        return await this.nfse_instance.cancelarNFSe(id_NFSe, payload);
    }

    async action_run_nfse_consultar(id_NFSe){
        return await this.nfse_instance.consultarDadosNFSe(id_NFSe);
    }

    action_run_conta_receber(contas_receber_id, payload){
        action_run_conta_receber_provider(contas_receber_id, payload, this.nfse_instance);
    }
}