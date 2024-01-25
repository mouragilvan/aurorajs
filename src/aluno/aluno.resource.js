const find = require("../crud/find");

module.exports = async (aluno) => {
    if(Array.isArray(aluno)){
        return aluno.map((a)=>{
            return {
                id: a._id,
                nome: a.nome,
                idade: a.idade,
                telefone: a.telefone                
            }
        });
    }
    return {
        nome: aluno.nome,
        idade: aluno?.idade,
        telefone: aluno.telefone,
        classes: aluno.classes ? await Promise.all(aluno.classes.map(async (item) => (await find("classes", item)).nome)) : []
    };

    
};
