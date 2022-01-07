
const telefoneRepository = require('./../repository/telefone-repository')

const inserirTelefone = async (tipo, ddd, numeroTel, clienteId ) => {
    console.log(tipo, ddd, numeroTel, clienteId);
    validar(tipo, ddd, numeroTel);
    console.log(tipo, ddd, numeroTel, clienteId);
    try {
        const resultado = await telefoneRepository.create({
            tipo,
            ddd,
            numero_tel: numeroTel,
            cliente_id: clienteId,
        });
        return resultado;
    } catch (erro) {
        console.error(erro);
        throw new Error(erro);
    }
}

function validar(tipo, ddd, numeroTel){
    

    if(!tipo){
        throw new Error("Erro: tipo de telefone é obrigatório");
    }

    if(!ddd){
        throw new Error("Erro: ddd é obrigatório");
    }

    if(!numeroTel){
        throw new Error("Erro: numero de telefone é obrigatório");
    }


}

const editarTelefone = async (id, numeroTel) => {
    const clienteBuscado = await buscarPorId(id);
    
    if(!clienteBuscado.length){
        throw Error("Cliente não existe");
    }

    validar(numeroTel);

    const telefoneAtualizado = await dataBase.sequelize.query(`
    UPDATE telefone
            set numeroTel='${numeroTel}'
            WHERE id=${id}
            `, { type: dataBase.Sequelize.QueryTypes.UPDATE});

    return telefoneAtualizado;

}
    
module.exports = {
    inserirTelefone,
    editarTelefone
}

