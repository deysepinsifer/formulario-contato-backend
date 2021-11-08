const dataBase = require('./comunicacaoBanco')

const cadastro = dataBase.sequelize.define('cadastro', {
    nome: {
        type: dataBase.Sequelize.STRING
    },
    email: {
        type: dataBase.Sequelize.STRING
    },
    telefone: {
        type: dataBase.Sequelize.STRING
    },
    mensagem: {
        type: dataBase.Sequelize.STRING
    }

})
module.exports = cadastro
