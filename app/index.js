const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const salvarFormularioDeContato = require("./controller/formulario-contato-controller")
const dataBase = require('./comunicacaoBanco')
const EnviadorDeEmail = require("./enviadorDeEmail");
const cors = require('cors')

const formularioDeContato = require('./service/cliente-service')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin","http://127.0.0.1:5500")
    res.header("Access-Control-Allow-Origin-Methods", 'GET,PUT,POST,DELETE')
    app.use(cors());
    next();
})

function buscarContatos(req, res){
    dataBase.sequelize.query("SELECT * FROM cadastro", { type: dataBase.Sequelize.QueryTypes.SELECT})
    .then(function(contatos) {
        res.send(contatos)
    }).catch(function(erro){
        console.error(erro);
        res.status(500);
        res.send("Erro ao buscar os dados!")
    })
}

function deletarContato(req, res){
    console.log(req.params.id);
    dataBase.sequelize.query(`DELETE FROM cadastro where id = ${req.params.id}`, { type: dataBase.Sequelize.QueryTypes.DELETE})
    .then(function(contatos) {
        res.send(contatos)
    }).catch(function(erro){
        console.error(erro);
        res.status(500);
        res.send("Erro ao buscar os dados!")
    })
}

function editarContato (req, res) {
    console.log(req.params);
    console.log(req.body);
    dataBase.sequelize.query(`
    UPDATE cadastro 
            set nome='${req.body.nome}',
            email='${req.body.email}',
            telefone='${req.body.telefone}'
        WHERE id = ${req.params.id}
   `, { type: dataBase.Sequelize.QueryTypes.UPDATE})
        .then(function(contato) {
            res.send(contato)
    })  .catch(function(erro){
            console.error(erro);
            res.status(500);
            res.send("Erro ao buscar os dados!")
    })
}

function buscarPorId (req, res) {
    console.log(req.params.id);
    dataBase.sequelize.query(`SELECT * FROM cadastro  where id = ${req.params.id}`, { type: dataBase.Sequelize.QueryTypes.SELECT})
    .then(function(contatos) {

        if(contatos.length){
           res.send(contatos[0])
        } else {
            res.status(404)
            res.send()
        }

    }).catch(function(erro){
        console.error(erro);
        res.status(500);
        res.send("Erro ao buscar os dados!")
    })
}


app.post('/formulario', salvarFormularioDeContato);
app.get('/formulario', buscarContatos);
app.get('/formulario/:id', buscarPorId);
app.delete('/formulario/:id', deletarContato);
app.put('/formulario/:id', editarContato);


app.listen('3000', () => { console.log("Server iniciado") } );
