const express = require('express')
const bodyParser = require('body-parser')
const expressApp = express()
const formularioDeContatoService = require("./controller/formulario-contato-controller")
const dataBase = require('./comunicacaoBanco')
const EnviadorDeEmail = require("./enviadorDeEmail");
const cors = require('cors')



expressApp.use(bodyParser.urlencoded({ extended: true }))
expressApp.use(bodyParser.json());

expressApp.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
    res.header("Access-Control-Allow-Origin-Methods", 'GET,PUT,POST,DELETE')
    expressApp.use(cors());
    next();
})


expressApp.post('/formulario', formularioDeContatoService.salvarFormularioDeContato);
expressApp.get('/formulario', formularioDeContatoService.buscarContatos);
expressApp.get('/formulario/:id', formularioDeContatoService.buscarClientePorIdCompleto);
expressApp.delete('/formulario/:id', formularioDeContatoService.excluirContato);
expressApp.put('/formulario/:reference', formularioDeContatoService.editarFormulario);

expressApp.listen('3000', () => { console.log("Server iniciado") });
