const dataBase = require('../comunicacaoBanco')

const cliente = dataBase.sequelize.define('cliente', {

    nome: {
        type: dataBase.Sequelize.STRING
    },
    email: {
        type: dataBase.Sequelize.STRING
    },
   
}, { freezeTableName: true });

module.exports = cliente
