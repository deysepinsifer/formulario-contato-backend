const formularioDeContatoService = require('./../service/formulario-service')

const salvarFormularioDeContato = async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const mensagem = req.body.mensagem;

    try {
        await formularioDeContatoService(nome, email, telefone, mensagem);
        res.status(200);
    } catch(erro) {
        res.status(400);
        res.send(erro.message);

    }

}

module.exports = salvarFormularioDeContato;