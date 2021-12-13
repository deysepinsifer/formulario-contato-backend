const cadastrarCliente = require('./cliente-service');
const cadastrarSolicitacao = require('./solicitacao-service');

function validar(nome, email, telefone, mensagem){
    if(!nome){
        throw new Error("Erro: nome é obrigatório")
    }

    if(!email){
        throw new Error("Erro: email é obrigatório");
    }

    if(!telefone){
        throw new Error("Erro: telefone é obrigatório");
    }

    if(!mensagem){
        throw new Error("Erro: mensagem é obrigatória");
    } 

}

const salvarFormularioDeContato = async (nome, email, telefone, mensagem) => {
    validar(nome, email, telefone, mensagem);
    const cliente = await cadastrarCliente(nome, email, telefone, mensagem);
    cadastrarSolicitacao(mensagem, cliente.id);
}

module.exports = salvarFormularioDeContato
