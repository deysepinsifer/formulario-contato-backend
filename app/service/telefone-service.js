const dataBase = require('../comunicacaoBanco');
const telefoneRepository = require('./../repository/telefone-repository')


function validar(tipo, ddd, numeroTel) {
    
    if (!tipo) {
        throw new Error("Erro: tipo de telefone é obrigatório");
    }
    
    if (!ddd) {
        throw new Error("Erro: ddd do telefone é obrigatório");
    }
    
    if (!numeroTel) {
        throw new Error("Erro: numero de telefone é obrigatório");
    }
    

}

const inserirTelefone = async (tipo, ddd, numeroTel, clienteId, transaction) => {
    console.log(tipo, ddd, numeroTel, clienteId);
    validar(tipo, ddd, numeroTel);
    console.log(tipo, ddd, numeroTel, clienteId);

    try {
        const resultado = await telefoneRepository.create({
            tipo,
            ddd,
            numero_tel: numeroTel,
            cliente_id: clienteId,
        }, transaction);
        return resultado;
    } catch (erro) {
        console.error(erro);
        throw new Error(erro);
    }
}



const buscarPorId = async (id) => {
    try {
        const clienteJaNoBanco = await telefoneRepository
            .sequelize.query(`SELECT * FROM telefone  where cliente_id = '${id}'`,
                { type: dataBase.Sequelize.QueryTypes.SELECT });
        return clienteJaNoBanco;
    } catch (erro) {
        console.error(erro);
        throw new Error(erro);
    }
}
const editarTelefone = async (clienteId, tipo, ddd, numeroTel) => {
    const telefoneBuscado = await buscarPorId(clienteId);

    if (!telefoneBuscado.length) {
        throw Error("Cliente não existe");
    }

    validar(tipo, ddd, numeroTel);

    const telefoneAtualizado = await dataBase.sequelize.query(`
    UPDATE telefone
            set tipo='${tipo}',
            ddd='${ddd}',
            numero_tel='${numeroTel}'
            WHERE cliente_id=${clienteId}
            `, { type: dataBase.Sequelize.QueryTypes.UPDATE });

    return telefoneAtualizado;

}

const excluirTelefone = async (id) => {
    try {
        await telefoneRepository
            .sequelize.query(`DELETE FROM telefone  where cliente_id = '${id}'`,
                { type: dataBase.Sequelize.QueryTypes.DELETE });

    } catch (erro) {
        console.error(erro);
        throw new Error(erro);

    }
}



module.exports = {
    inserirTelefone,
    editarTelefone,
    excluirTelefone
}

