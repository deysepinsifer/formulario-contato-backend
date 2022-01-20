const dataBase = require('../comunicacaoBanco')
const enderecoRepository = require('../repository/endereco-repository')


function validar(cep, tipoDeLogradouro, logradouro, bairro, cidade, estado) {

    
    if (!cep) {
        throw new Error("Erro: cep é obrigatório");
    }

    if (!tipoDeLogradouro) {
        throw new Error("Erro: tipo de logradouro é obrigatório");
    }
   
    if (!logradouro) {
        throw new Error("Erro: logradouro é obrigatório");
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

const inserirEnd = async (cep, tipoDeLogradouro, logradouro, numero, complemento, bairro, cidade, estado, clienteId, transaction) => {
    console.log(cep, tipoDeLogradouro, logradouro, numero, complemento, bairro, cidade, estado, clienteId);
    validar(cep, tipoDeLogradouro, logradouro, bairro, cidade, estado);

    try {
        const resultado = await enderecoRepository.create({
            cep,
            tipo_de_logradouro: tipoDeLogradouro,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cliente_id: clienteId
        }, transaction);
        return resultado;
    } catch (erro) {/*  */
        console.error(erro);
        
        throw new Error(erro);
    }
}


const buscarPorId = async (id) => {
    try {
        const clienteJaNoBanco = await enderecoRepository
            .sequelize.query(`SELECT * FROM endereco  where cliente_id = '${id}'`,
                { type: dataBase.Sequelize.QueryTypes.SELECT });
        return clienteJaNoBanco;
    } catch (erro) {
        console.error(erro);
        throw new Error(erro);
    }
}


const editarEndereco = async (clienteId, cep, tipoDeLogradouro, logradouro, bairro, cidade, estado) => {
    const enderecoBuscado = await buscarPorId(clienteId);

    if (!enderecoBuscado.length) {
        throw Error("Cliente não existe");
    }

    validar(cep, tipoDeLogradouro, logradouro, bairro, cidade, estado);

    const enderecoAtualizado = await dataBase.sequelize.query(`
    UPDATE endereco
            set cep='${cep}',
            tipo_de_logradouro='${tipoDeLogradouro}',
            logradouro='${logradouro}',
            bairro='${bairro}',
            cidade='${cidade}',
            estado='${estado}'
            WHERE cliente_id=${clienteId}
            `, { type: dataBase.Sequelize.QueryTypes.UPDATE });

    return enderecoAtualizado;

}

const excluirEndereco = async (id) => {
    try {
        await enderecoRepository
            .sequelize.query(`DELETE FROM endereco  where cliente_id = '${id}'`,
                { type: dataBase.Sequelize.QueryTypes.DELETE });

    } catch (erro) {
        console.error(erro);
        throw new Error(erro);
    }
}



module.exports = {

    inserirEnd,
    editarEndereco,
    excluirEndereco
}


