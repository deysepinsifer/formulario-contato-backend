const { emit } = require('nodemon');
const dataBase = require('../comunicacaoBanco');
const EntityAlreadyExistsError = require('../exception');
const clienteRepository = require('./../repository/cliente-repository')


function validar(nome, email) {
    if (!nome) {
        throw new Error("Erro: nome é obrigatório")
    }

    if (!email) {
        throw new Error("Erro: email é obrigatório");
    }
}

const buscarClientes = async () => {

    const clientes = await dataBase.sequelize.query(`
        SELECT 
            c.id,
            c.nome,
            c.email,
            e.cep,
            e.tipo_de_logradouro as tipo_De_Logradouro,
            e.logradouro,
            e.bairro,
            e.cidade,
            e.estado,
            t.ddd,
            t.tipo,
            t.numero_tel as telefone
        FROM cliente c
        left join endereco e on e.cliente_id = c.id
        left join telefone t on t.cliente_id = c.id`, { type: dataBase.Sequelize.QueryTypes.SELECT });

    return clientes;

}

const buscarClientePorIdCompleto = async (id) => {

    const clientes = await dataBase.sequelize.query(`
        SELECT 
            c.id,
            c.nome,
            c.email,
            e.cep,
            e.tipo_de_logradouro as tipoDeLogradouro,
            e.logradouro,
            e.bairro,
            e.cidade,
            e.estado,
            t.ddd,
            t.tipo,
            t.numero_tel as telefone,
            s.mensagem
            FROM cliente c
            left join endereco e on e.cliente_id = c.id
            left join telefone t on t.cliente_id = c.id
            left join solicitacao s on s.cliente_id = c.id
        where c.id = ${id}`, { type: dataBase.Sequelize.QueryTypes.SELECT })

    if (clientes && clientes.length) {
        return clientes[0];
    }

    throw new Error("enhum cliente encontrado para este id")
}

const buscarClientePorReference = async (reference) => {

    const clientes = await dataBase.sequelize.query(`
        SELECT 
            c.id,
            c.nome,
            c.email,
            e.cep,
            e.tipo_de_logradouro as tipoDeLogradouro,
            e.logradouro,
            e.bairro,
            e.cidade,
            e.estado,
            t.ddd,
            t.tipo,
            t.numero_tel as telefone,
            s.mensagem
            FROM cliente c
            left join endereco e on e.cliente_id = c.id
            left join telefone t on t.cliente_id = c.id
            left join solicitacao s on s.cliente_id = c.id
        where c.id = '${reference}' OR c.email = '${reference}'`, { type: dataBase.Sequelize.QueryTypes.SELECT })

    if (clientes && clientes.length) {
        return clientes[0];
    }

    throw new Error("enhum cliente encontrado para este reference")
}



const buscarPorEmail = async (email) => {


    try {
        const clienteJaNoBanco = await clienteRepository
            .sequelize.query(`SELECT * FROM cliente  where email = '${email}'`,
                { type: dataBase.Sequelize.QueryTypes.SELECT });
        return clienteJaNoBanco;
    } catch (erro) {
        console.error(erro);
        throw new Error(erro);
    }
}

const buscarPorId = async (id) => {
    try {
        const clienteJaNoBanco = await clienteRepository
            .sequelize.query(`SELECT * FROM cliente  where id = '${id}'`,
                { type: dataBase.Sequelize.QueryTypes.SELECT });
        return clienteJaNoBanco;
    } catch (erro) {
        console.error(erro);
        throw new Error(erro);
    }
}

const inserir = async (nome, email, transaction) => {
    validar(nome, email);
    const clienteJaNoBanco = await buscarPorEmail(email);
    if (!clienteJaNoBanco.length) {
        const resultado = await clienteRepository.create({
            nome: nome,
            email: email,

        }, transaction);
        return resultado.dataValues
    } 

    throw new EntityAlreadyExistsError('Cliente já cadastrado no banco');
}


const editarCliente = async (id, nome, email) => {
    const clienteBuscado = id ? await buscarPorId(id) : await buscarPorEmail(email);

    if (!clienteBuscado.length) {
        throw Error("Cliente não existe");
    }

    validar(nome, email);

    const clienteAtualizado = await dataBase.sequelize.query(`
    UPDATE cliente
            set nome='${nome}'
            WHERE id=${id}
            `, { type: dataBase.Sequelize.QueryTypes.UPDATE });

    return clienteAtualizado;

}



const excluirCliente = async (id) => {
    try {
        await clienteRepository
            .sequelize.query(`DELETE FROM cliente  where id = '${id}'`,
                { type: dataBase.Sequelize.QueryTypes.DELETE });

    } catch (erro) {
        console.error(erro);
        throw new Error(erro);
    }
}

module.exports = {
    excluirCliente,
    editarCliente,
    inserir,
    buscarClientes,
    buscarClientePorIdCompleto,
    buscarClientePorReference

} 
