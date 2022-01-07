const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const formularioDeContatoService = require("./controller/formulario-contato-controller")
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

function buscarClientes(req, res){
    dataBase.sequelize.query(`SELECT
    distinct c.id,
    c.nome,
    c.email,
    e.logradouro,
    e.bairro,
    e.cidade,
    e.estado,
    t.numero_tel as telefone
   FROM cliente c
   left join endereco e on e.cliente_id = c.id
   left join telefone t on t.cliente_id = c.id`, { type: dataBase.Sequelize.QueryTypes.SELECT})
    .then(function(contatos) {
        res.send(contatos)
    }).catch(function(erro){
        console.error(erro);
        res.status(500);
        res.send("Erro ao buscar os dados no buscar clientes!")
    })
}

function deletarContato(req, res){
    console.log(req.params.id);
    dataBase.sequelize.query(`DELETE FROM contatos where id = ${req.params.id}`, { type: dataBase.Sequelize.QueryTypes.DELETE})
    .then(function(contatos) {
        res.send(contatos)
    }).catch(function(erro){
        console.error(erro);
        res.status(500);
        res.send("Erro ao deletar os dados!")
    })
}



function buscarPorId (req, res) {
    console.log(req.params.id);
    dataBase.sequelize.query(`SELECT 
    c.id,
    c.nome,
    c.email,
    e.logradouro,
    e.bairro,
    e.cidade,
    e.estado,
    t.numero_tel as telefone
    FROM cliente c
    left join endereco e on e.cliente_id = c.id
    left join telefone t on t.cliente_id = c.id
    where c.id = ${req.params.id}`, { type: dataBase.Sequelize.QueryTypes.SELECT})
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
        res.send("Erro ao buscar os dados no buscar por id!")
    })
}


app.post('/formulario', formularioDeContatoService.salvarFormularioDeContato);
app.get('/formulario/', buscarClientes);
app.get('/formulario/:id', buscarPorId);
app.delete('/formulario/:id', deletarContato);
app.put('/formulario/:id', formularioDeContatoService.editarFormulario);


app.listen('3000', () => { console.log("Server iniciado") } );
