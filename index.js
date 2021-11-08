const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cadastroDB = require("./bd")
const EnviadorDeEmail = require("./enviadorDeEmail");
const cors = require('cors')


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin","http://127.0.0.1:5500")
    res.header("Access-Control-Allow-Origin-Methods", 'GET,PUT,POST,DELETE')
    app.use(cors());
    next();
})

function formularioDeContato(req, res){
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const mensagem = req.body.mensagem;

    if(nome === "" || nome === undefined){
        res.status(400);
        res.send("Erro: nome é obrigatório");
        return;
    }

    if(email === "" || email === undefined){
        res.status(400);
        res.send("Erro: email é obrigatório");
        return;
    }

    if(telefone === "" || telefone === undefined){
        res.status(400);
        res.send("Erro: telefone é obrigatório");
        return;
    }

    if(mensagem === "" || mensagem === undefined){
        res.status(400);
        res.send("Erro: mensagem é obrigatória");
        return;
    } 

    cadastroDB.create({
        nome: nome,
        email: email,
        telefone: telefone,
        mensagem: mensagem
    }).then(function(){
        res.send("Formulario cadastrado com sucesso!")
        EnviadorDeEmail({nome, email, telefone, mensagem});
    }).catch(function(erro){
        console.error(erro);
        res.send("Erro: Formulario não cadastrado!")
    })
}

app.post('/formulario', formularioDeContato)

app.listen('3000', () => { console.log("Server iniciado") } );