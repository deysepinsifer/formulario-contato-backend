const formularioDeContatoService = require('./../service/formulario-service')

const salvarFormularioDeContato = async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const cep = req.body.cep;
    const logradouro = req.body.logradouro;
    const tipoDeLogradouro = req.body.tipoDeLogradouro;
    const numero = req.body.numero;
    const bairro = req.body.bairro;
    const complemento = req.body.complemento;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const tipo = req.body.tipo;
    const ddd = req.body.ddd;
    const numeroTel = req.body.telefone;
    const mensagem = req.body.mensagem;

    try {
        await formularioDeContatoService.salvarFormularioDeContato(nome, email, cep, tipoDeLogradouro, logradouro, numero, bairro, complemento, cidade, estado, tipo, ddd, numeroTel, mensagem);
        res.status(200);
        res.send("ok");
    } catch(erro) {
        res.status(400);
        res.send(erro.message);

    }

}

const editarFormulario = async (req, res) => { 
            const id = req.params.id;
            const nome = req.body.nome;
            const email = req.body.email;
            const logradouro = req.body.logradouro;
            const bairro = req.body.bairro;
            const cidade = req.body.cidade;
            const estado = req.body.estado;
            const numeroTel = req.body.numeroTel;
            const mensagem = req.body.mensagem;
           
            try {
                await formularioDeContatoService.editarFormularioDeContato(id, nome, email, logradouro, bairro, cidade, estado, numeroTel, mensagem);
                res.status(200);
                res.send("ok");
            } catch(erro) {
                console.error("editarFormulario", erro);
                res.status(400);
                res.send(erro.message);
        
            }
}





module.exports = {
    salvarFormularioDeContato,
    editarFormulario
} 