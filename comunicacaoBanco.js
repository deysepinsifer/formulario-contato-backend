const Sequelize = require("sequelize")

const sequelize = new Sequelize('formulario', 'user', 'Mysql123@', {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

/*const mysql = require('mysql')

const conectar = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'Mysql123@',
    database: 'formulario'
})

conectar.connect((err) => {
    if (err) {
        console.log('Erro de conecção!', err)
        return
    }
    console.log('Conecção estabelecida!')
})

conectar.end((err) => {
    if(err) {
        console.log('Erro to finish connection...', err)
        return 
    }
    console.log('The connection was finish...')
})

module.exports{
   


}*/