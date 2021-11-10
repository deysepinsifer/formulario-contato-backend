const Sequelize = require("sequelize")
require('dotenv').config()

const sequelize = new Sequelize('formulario', process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}