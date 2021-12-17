const dataBase = require('../comunicacaoBanco')

const telefone = dataBase.sequelize.define('telefone', {
    id: {
        type: dataBase.Sequelize.INTEGER
    },
    tipo: {
        type: dataBase.Sequelize.STRING
    },
    numero: {
        type: dataBase.Sequelize.STRING
    },
    cliente_id: {
        type: dataBase.Sequelize.INTEGER
    }  
}, { freezeTableName: true });

module.exports = telefone