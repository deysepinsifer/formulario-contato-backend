
const dataBase = require('../comunicacaoBanco')
const solicitacaoRepository = require('../repository/solicitacao-repository')


const inserirSolicitacao = async (mensagem, clienteId, transaction) => {
    validar(mensagem);
    console.log(mensagem, clienteId);
    try {
        const resultado = await solicitacaoRepository.create({
            mensagem: mensagem,
            cliente_id: clienteId,
        }, transaction);
        return resultado;
    } catch (erro) {
        console.error(erro);
        throw new Error(erro);
    }
}


function validar(mensagem) {

    if (!mensagem) {
        throw new Error("Erro: mensagem é obrigatória");
    }

}



const buscarPorId = async (id) => {
    try {
        const clienteJaNoBanco = await solicitacaoRepository
            .sequelize.query(`SELECT * FROM solicitacao  where cliente_id = '${id}'`,
                { type: dataBase.Sequelize.QueryTypes.SELECT });
        return clienteJaNoBanco;
    } catch (erro) {
        console.error(erro);
        throw new Error(erro);
    }
}



const editarSolicitacao = async (clienteId, mensagem) => {
    const solicitacaoBuscado = await buscarPorId(clienteId);
    console.log(mensagem);
    if (!solicitacaoBuscado.length) {
        throw Error("Solicitacao não existe");
    }

    validar(clienteId, mensagem);

    const solicitacaoAtualizado = await dataBase.sequelize.query(`
            UPDATE solicitacao
                set mensagem='${mensagem}'
                WHERE cliente_id=${clienteId}
                `, { type: dataBase.Sequelize.QueryTypes.UPDATE });

    return solicitacaoAtualizado;

}

const excluirSolicitacao = async (id) => {
    try {
        await solicitacaoRepository
            .sequelize.query(`DELETE FROM solicitacao  where cliente_id = '${id}'`,
                { type: dataBase.Sequelize.QueryTypes.DELETE });

    } catch (erro) {
        console.error(erro);
        throw new Error(erro);
    }
}


module.exports = {
    inserirSolicitacao,
    editarSolicitacao,
    excluirSolicitacao
}