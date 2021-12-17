const formularioDeContatoService = require('./../service/formulario-service')

const salvarFormularioDeContato = async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const cep = req.body.cep;
    const logradouro = req.body.logradouro;
    const endereco = req.body.endereco;
    const bairro = req.body.bairro;
    const complemento = req.body.complemento;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const tipo = req.body.tipo;
    const telefone = req.body.telefone;
    const mensagem = req.body.mensagem;

    try {
        await formularioDeContatoService(nome, email, cep, logradouro, endereco, bairro, complemento, cidade, estado, tipo, telefone, mensagem);
        res.status(200);
    } catch(erro) {
        res.status(400);
        res.send(erro.message);

    }

}

module.exports = salvarFormularioDeContato;