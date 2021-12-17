const cadastrarCliente = require('./cliente-service');
const cadastrarSolicitacao = require('./solicitacao-service');


function validar(nome, email, cep, logradouro, endereco, bairro, cidade, estado, tipo, telefone, mensagem){
    if(!nome){
        throw new Error("Erro: nome é obrigatório")
    }

    if(!email){
        throw new Error("Erro: email é obrigatório");
    }

    if(!cep){
        throw new Error("Erro: cep é obrigatório");
    }

    if(!logradouro){
        throw new Error("Erro: logradouro é obrigatório");
    }

    if(!endereco){
        throw new Error("Erro: endereco é obrigatório");
    }

    if(!bairro){
        throw new Error("Erro: bairro é obrigatório");
    }

    if(!cidade){
        throw new Error("Erro: cidade é obrigatório");
    }

    if(!estado){
        throw new Error("Erro: estado é obrigatório");
    }

    if(!tipo){
        throw new Error("Erro: tipo é obrigatório");
    }

    if(!telefone){
        throw new Error("Erro: telefone é obrigatório");
    }

    if(!mensagem){
        throw new Error("Erro: mensagem é obrigatória");
    } 

}

const salvarFormularioDeContato = async (nome, email, cep, logradouro, endereco, bairro, complemento, cidade, estado, tipo, telefone, mensagem) => {
    validar(nome, email, cep, logradouro, endereco, bairro, cidade, estado, tipo, telefone, mensagem);
    const cliente = await cadastrarCliente(nome, email, cep, logradouro, endereco, bairro, complemento, cidade, estado, tipo, telefone, mensagem);
    cadastrarSolicitacao(mensagem, cliente.id);
}

module.exports = salvarFormularioDeContato
