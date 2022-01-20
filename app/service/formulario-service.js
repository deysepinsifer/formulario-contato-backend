const clienteService = require('./cliente-service');
const solicitacaoService = require('./solicitacao-service');
const enderecoService = require('./endereco-service');
const telefoneService = require('./telefone-service');

const { required } = require('nodemon/lib/config');
const { sequelize } = require('../comunicacaoBanco');

const buscarContatos = async (id, nome, email) => {
    const clientes = await clienteService.buscarClientes(id, nome, email);
    return clientes;
}

const buscarClientePorIdCompleto = async (id) => {
    const clientesPorId = await clienteService.buscarClientePorIdCompleto(id);
    return clientesPorId;
}

const salvarFormularioDeContato = (nome, email, cep, tipoDeLogradouro, logradouro, numero, complemento, bairro, cidade, estado, tipo, ddd, numeroTel, mensagem) => {

    sequelize.transaction(async function (t) {
        const cliente = await clienteService.inserir(nome, email, {transaction: t})
        return Promise.all([
            enderecoService.inserirEnd(cep, tipoDeLogradouro, logradouro, numero, complemento, bairro, cidade, estado, cliente.id, {transaction: t}),
            telefoneService.inserirTelefone(tipo, ddd, numeroTel, cliente.id, {transaction: t}),
            solicitacaoService.inserirSolicitacao(mensagem, cliente.id, {transaction: t})
        ]);
    });
}

const editarFormulario = async (reference, nome, email, cep, tipoDeLogradouro, logradouro, bairro, cidade, estado, tipo, ddd, numeroTel) => {

    const cliente = await clienteService.buscarClientePorReference(reference);

    await clienteService.editarCliente(cliente.id, nome, email);
    await enderecoService.editarEndereco(cliente.id, cep, tipoDeLogradouro, logradouro, bairro, cidade, estado);
    await telefoneService.editarTelefone(cliente.id, tipo, ddd, numeroTel);
}

const excluirContato = async (id) => {
    await solicitacaoService.excluirSolicitacao(id);
    await enderecoService.excluirEndereco(id);
    await telefoneService.excluirTelefone(id);
    await clienteService.excluirCliente(id);
}


module.exports = {
    buscarContatos,
    salvarFormularioDeContato,
    editarFormulario,
    excluirContato,
    buscarClientePorIdCompleto
}
