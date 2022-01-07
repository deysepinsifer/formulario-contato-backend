
const enderecoRepository = require('../repository/endereco-repository')

const inserirEnd = async (cep, tipoDeLogradouro, logradouro, numero, bairro, complemento, cidade, estado, clienteId) => {
    validar(cep, tipoDeLogradouro, logradouro, numero, bairro, complemento, cidade, estado);
    console.log(cep, tipoDeLogradouro, logradouro, numero, bairro, complemento, cidade, estado, clienteId);
    try {
        const resultado = await enderecoRepository.create({
            cep,
            tipo_de_logradouro: tipoDeLogradouro,
            logradouro,
            numero,
            bairro,
            complemento,
            cidade,
            estado,
            cliente_id: clienteId,/*  */
        });
        return resultado;
    } catch (erro) {/*  */
        console.error(erro);
        throw new Error(erro);
    }
}

function validar(cep, tipoDeLogradouro, logradouro, numero, bairro, cidade, estado) {

    if (!cep) {
        throw new Error("Erro: cep é obrigatório");
    }

    if (!tipoDeLogradouro) {
        throw new Error("Erro tipo de logradouro é obrigatório");
    }
    if (!logradouro) {
        throw new Error("Erro: logradouro é obrigatório");
    }

    if (!numero) {
        throw new Error("Erro: numero é obrigatório");
    }

    if (!bairro) {
        throw new Error("Erro: bairro é obrigatório");
    }

    if (!cidade) {
        throw new Error("Erro: cidade é obrigatório");
    }

    if (!estado) {
        throw new Error("Erro: estado é obrigatório");
    }
}

const editarEndereco = async (id, logradouro, bairro, cidade, estado) => {
    const clienteBuscado = await buscarPorId(id);
    
    if(!clienteBuscado.length){
        throw Error("Cliente não existe");
    }

    validar(numeroTel);

    const enderecoAtualizado = await dataBase.sequelize.query(`
    UPDATE endereco
            set logradouro='${logradouro}',
             bairro='${bairro}',
             cidade='${cidade}',
             estado='${estado}'
            WHERE id=${id}
            `, { type: dataBase.Sequelize.QueryTypes.UPDATE});

    return enderecoAtualizado;

}

module.exports ={
     inserirEnd,
     editarEndereco
}


