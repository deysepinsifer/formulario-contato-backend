const dataBase = require('../comunicacaoBanco')
const enderecoRepository = require('../repository/endereco-repository')

const inserirEnd = async (cep, logradouro, endereco, bairro, complemento, cidade, estado, clienteId ) => {
console.log(cep, logradouro, endereco, bairro, complemento, cidade, estado, clienteId);
    try {
        const resultado = await enderecoRepository.create({
            cep,
            logradouro,
            endereco, 
            bairro,
            complemento,
            cidade,
            estado,
            cliente_id: clienteId,
        });
        return resultado;
    } catch (erro) {
        console.error(erro);
        throw new Error(erro);
    }
}
function validar(cep, logradouro, endereco, bairro, cidade, estado){
   

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

    

}

const salvarFormularioDeContato = async (cep, logradouro, endereco, bairro, complemento, cidade, estado) => {
    validar(cep, logradouro, endereco, bairro, cidade, estado);
    const cliente = await cadastrarEndereco(cep, logradouro, endereco, bairro, complemento, cidade, estado);
    cadastrarEndereco(cep, logradouro, endereco, bairro, complemento, cidade, estado, cliente.id);
}

module.exports = salvarFormularioDeContato

module.exports = inserirEnd