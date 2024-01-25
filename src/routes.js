const {AlunoController, AlunoMiddleware, VincularMiddleware} = require("./aluno");
const {ClasseController, ClasseMiddleware} = require("./classe");

module.exports =  function (app){
    app.get("/",(req,res)=>{
        return res.send({message: "API Online"});
    });

    app.get("/alunos/:id?", AlunoController.index );
    app.post("/alunos",AlunoMiddleware.validateFields,AlunoMiddleware.handle,AlunoController.store);
    app.put("/alunos/:id",AlunoController.update);
    app.delete("/alunos/:id",AlunoController.destroy);


    app.get("/classes/:id?", ClasseController.index );
    app.post("/classes",ClasseMiddleware.validateFields,ClasseMiddleware.handle,ClasseController.store);
    app.put("/classes/:id",ClasseController.update);
    app.delete("/classes/:id",ClasseController.destroy);
    
    app.post("/vincular-aluno", VincularMiddleware.validateFields,VincularMiddleware.handle,AlunoController.vincular );
}