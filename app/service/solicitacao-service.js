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

function validar( mensagem){

    if(!mensagem){
        throw new Error("Erro: mensagem é obrigatória");
    } 

}

const salvarFormularioDeContato = async (mensagem) => {
    validar(mensagem);
    const cliente = await cadastrarMensagem(mensagem);
    cadastrarMensagem(mensagem, cliente.id);
}

module.exports = salvarFormularioDeContato


module.exports = inserir
