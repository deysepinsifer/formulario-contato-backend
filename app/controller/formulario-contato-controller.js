
const EntityAlreadyExistsError = require('../exception');
const formularioDeContatoService = require('./../service/formulario-service')


const buscarContatos = async (req, res) => {
    try {
        const clientes = await formularioDeContatoService.buscarContatos();
        res.status(200);
        res.send(clientes);
    } catch (erro) {
        console.error("buscarContato", erro);
        res.status(400);
        res.send(erro.message);

    }
}

const buscarClientePorIdCompleto = async (req, res) => {

    const id = req.params.id;
    try {
        const clientePorId = await formularioDeContatoService.buscarClientePorIdCompleto(id);
        res.status(200);
        res.send(clientePorId);
    } catch (erro) {
        console.error("buscarClientePorIdCompleto", erro);
        res.status(400);
        res.send(erro.message);

    }
}

const salvarFormularioDeContato = async (req, res) => {

    const nome = req.body.nome;
    const email = req.body.email;
    const cep = req.body.cep;
    const tipoDeLogradouro = req.body.tipoDeLogradouro;
    const logradouro = req.body.logradouro;
    const numero = req.body.numero;
    const complemento = req.body.complemento;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const tipo = req.body.tipo;
    const ddd = req.body.ddd;
    const numeroTel = req.body.telefone;
    const mensagem = req.body.mensagem;

    try {
        await formularioDeContatoService.salvarFormularioDeContato(nome, email, cep, tipoDeLogradouro, logradouro, numero, complemento, bairro, cidade, estado, tipo, ddd, numeroTel, mensagem);
        res.status(200);
        res.send("ok");
    } catch (erro) {
        console.log("salvarFormularioDeContato",);
        if(erro instanceof EntityAlreadyExistsError){
            res.status(409);
            res.send(erro.message);
            return;
        }

        res.status(400);
        res.send(erro.message);

    }

}

const editarFormulario = async (req, res) => {
    const reference = req.params.reference;
    const nome = req.body.nome;
    const email = req.body.email;
    const cep = req.body.cep;
    const tipoDeLogradouro = req.body.tipoDeLogradouro;
    const logradouro = req.body.logradouro;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const ddd = req.body.ddd;
    const tipo = req.body.tipo;
    const numeroTel = req.body.telefone;
    try {

        await formularioDeContatoService.editarFormulario(reference, nome, email, cep, tipoDeLogradouro, logradouro, bairro, cidade, estado, tipo, ddd, numeroTel);

        res.status(200);
        res.send("ok");
    } catch (erro) {
        console.error("editarFormulario", erro);
        res.status(400);
        res.send(erro.message);

    }
}

const excluirContato = async (req, res) => {
    const id = req.params.id;

    try {
        await formularioDeContatoService.excluirContato(id);
        res.status(200);
        res.send("ok");
    } catch (erro) {
        console.error("excluirContato", erro);
        res.status(400);
        res.send(erro.message);

    }
}

module.exports = {
    buscarContatos,
    salvarFormularioDeContato,
    editarFormulario,
    excluirContato,
    buscarClientePorIdCompleto

} 