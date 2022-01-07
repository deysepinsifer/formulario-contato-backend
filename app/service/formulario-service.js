const clienteService = require('./cliente-service');
const solicitacaoService = require('./solicitacao-service');
const enderecoService = require('./endereco-service');
const telefoneService = require('./telefone-service');
const clienteService = require('./cliente-service');
const enderecoService = require('./endereco-service');
const solicitacaoService = require('./solicitacao-service');
const { required } = require('nodemon/lib/config');

const salvarFormularioDeContato = async (nome, email, cep, tipoDeLogradouro, logradouro, numero, bairro, complemento, cidade, estado, tipo, ddd, numeroTel, mensagem) => {
    const cliente = await clienteService.inserirOuBuscar(nome, email);
     await solicitacaoService.inserirSolicitacao(mensagem, cliente.id);
     await enderecoService.inserirEndereco(cep, tipoDeLogradouro, logradouro, numero, bairro, complemento, cidade, estado, cliente.id);
     await telefoneService.inserirTelefone(tipo, ddd, numeroTel, cliente.id);
}

const editarFormularioDeContato = async (id, nome, email, cep, tipoDeLogradouro, logradouro, numero, bairro, complemento, cidade, estado, tipo, ddd, numeroTel, mensagem) => {
    const cliente = await clienteService.editarCliente(id, nome, email);
    await solicitacaoService.editarSolicitacao(mensagem, cliente.id);
    await enderecoService.editarEndereco(cep, tipoDeLogradouro, logradouro, numero, bairro, complemento, cidade, estado, cliente.id);
    await telefoneService.editarTelefone(tipo, ddd, numeroTel, cliente.id);
}

module.exports = {
    salvarFormularioDeContato,
    editarFormularioDeContato
}
