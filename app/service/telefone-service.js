const dataBase = require('../comunicacaoBanco')
const telefoneRepository = require('./../repository/telefone-repository')


const inserirTelefone = async (tipo, numero, clienteId ) => {
    console.log(tipo, numero, clienteId);
        try {
            const resultado = await enderecoRepository.create({
                tipo,
                numero,
                cliente_id: clienteId,
            });
            return resultado;
        } catch (erro) {
            console.error(erro);
            throw new Error(erro);
        }
    }
    function validar(tipo, numero){
       
    
        if(!tipo){
            throw new Error("Erro: tipo de telefone é obrigatório");
        }
    
        if(!numero){
            throw new Error("Erro: numero é obrigatório");
        }
    
    
    }
    
    const salvarFormularioDeContato = async (tipo, numero) => {
        validar(tipo, numero);
        const cliente = await cadastrarTelefone(tipo, numero);
        cadastrarTelefone(tipo, numero, cliente.id);
    }
    
    module.exports = salvarFormularioDeContato
    
    module.exports = inserirTelefone