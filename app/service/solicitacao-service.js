const solicitacaoRepository = require('../repository/solicitacao-repository')

const inserir = async (mensagem, clienteId ) => {
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

module.exports = inserir
