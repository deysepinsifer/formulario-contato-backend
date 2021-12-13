const dataBase = require('../comunicacaoBanco')
const clienteRepository = require('./../repository/cliente-repository')

const buscarPorEmail = async ( email ) => {
    try {
        const clienteJaNoBanco = await clienteRepository
                .sequelize.query(`SELECT * FROM cliente  where email = '${email}'`, 
                { type: dataBase.Sequelize.QueryTypes.SELECT});
        return clienteJaNoBanco;
    } catch (erro) {
        console.error(erro);
        throw new Error(erro);
    }
}

const inserirOuBuscar = async (nome, email, telefone) => {

    const clienteJaNoBanco = await buscarPorEmail(email);
    try {

        if(!clienteJaNoBanco.length){
            const resultado = await clienteRepository.create({
                nome: nome,
                email: email,
                telefone: telefone,
            });
            return resultado.dataValues;
        }

        return clienteJaNoBanco[0];

    } catch (erro) {
        console.error(erro);
        throw new Error(erro);
    }
}

module.exports = inserirOuBuscar
