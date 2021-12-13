const dataBase = require('../comunicacaoBanco')

const solicitacao = dataBase.sequelize.define('solicitacao', {
    mensagem: {
        type: dataBase.Sequelize.STRING
    },
    cliente_id: {
        type: dataBase.Sequelize.BIGINT
    }  
}, { freezeTableName: true });

module.exports = solicitacao
