
const solicitacao = require('../repository/solicitacao-repository');
const solicitacaoRepository = require('../repository/solicitacao-repository')

const inserirSolicitacao = async (mensagem, clienteId ) => {
    validar(mensagem);
console.log(mensagem, clienteId);
    try {
        const resultado = await solicitacaoRepository.create({
            mensagem: mensagem,
            cliente_id: clienteId,
        });
        return resultado;
    } catch (erro) {
        console.error(erro);
        throw new Error(erro);
    }
}

function validar( mensagem){

    if(!mensagem){
        throw new Error("Erro: mensagem é obrigatória");
    } 

}

const editarSolicitacao = async (id, mensagem) => {
    const clienteBuscado = await buscarPorId(id);
    
    if(!clienteBuscado.length){
        throw Error("Cliente não existe");
    }

    validar(mensagem);

    const solicitacaoAtualizado = await dataBase.sequelize.query(`
    UPDATE solicitacao
            set solicitacao='${solicitacao}'
            WHERE id=${id}
            `, { type: dataBase.Sequelize.QueryTypes.UPDATE});

    return solicitacaoAtualizado;

}


module.exports = {
    inserirSolicitacao,
    editarSolicitacao
}