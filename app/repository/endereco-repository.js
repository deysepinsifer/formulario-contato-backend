const dataBase = require('../comunicacaoBanco')

const endereco = dataBase.sequelize.define('endereco', {
    
    cep: {
        type: dataBase.Sequelize.STRING
    },
    tipo_de_logradouro: {
        type: dataBase.Sequelize.STRING
    }, 
    logradouro: {
        type: dataBase.Sequelize.STRING
    }, 
    numero: {
        type: dataBase.Sequelize.STRING
    }, 
    bairro: {
        type: dataBase.Sequelize.STRING
    }, 
    complemento: {
        type: dataBase.Sequelize.STRING
    }, 
    cidade: {
        type: dataBase.Sequelize.CHAR
    },
    estado: {
        type: dataBase.Sequelize.STRING
    },
    cliente_id: {
        type: dataBase.Sequelize.INTEGER
    }   
}, { freezeTableName: true });

module.exports = endereco