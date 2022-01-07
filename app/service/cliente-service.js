
const dataBase = require('../comunicacaoBanco')
const clienteRepository = require('./../repository/cliente-repository')

function validar(nome, email){
    if(!nome){
        throw new Error("Erro: nome é obrigatório")
    }

    if(!email){
        throw new Error("Erro: email é obrigatório");
    }
}

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

const buscarPorId = async ( id ) => {
    try {
        const clienteJaNoBanco = await clienteRepository
                .sequelize.query(`SELECT * FROM cliente  where id = '${id}'`, 
                { type: dataBase.Sequelize.QueryTypes.SELECT});
        return clienteJaNoBanco;
    } catch (erro) {
        console.error(erro);
        throw new Error(erro);
    }
}

const inserirOuBuscar = async (nome, email) => {
    validar(nome, email);
    const clienteJaNoBanco = await buscarPorEmail(email);
    try {

        if(!clienteJaNoBanco.length){
            const resultado = await clienteRepository.create({
                nome: nome,
                email: email,
               
            });
            return resultado.dataValues;
        }

        return clienteJaNoBanco[0];

    } catch (erro) {
        console.error(erro);
        throw new Error(erro);
    }
}


const editarCliente = async (id, nome, email) => {
    const clienteBuscado = await buscarPorId(id);
    
    if(!clienteBuscado.length){
        throw Error("Cliente não existe");
    }

    validar(nome, email);

    const clienteAtualizado = await dataBase.sequelize.query(`
    UPDATE cliente
            set nome='${nome}',
            email='${email}'
            WHERE id=${id}
            `, { type: dataBase.Sequelize.QueryTypes.UPDATE});

    return clienteAtualizado;

}


module.exports = {
    editarCliente,
    inserirOuBuscar
} 
