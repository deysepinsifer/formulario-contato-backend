const dataBase = require('../comunicacaoBanco')

const telefone = dataBase.sequelize.define('telefone', {
    
    tipo: {
        type: dataBase.Sequelize.STRING
    },
    ddd: {
        type: dataBase.Sequelize.CHAR
    },
    numero_tel: {
        type: dataBase.Sequelize.STRING
    },
    cliente_id: {
        type: dataBase.Sequelize.INTEGER
    }  
}, { freezeTableName: true });

module.exports = telefone