const { body, validationResult } = require('express-validator');
const client = require("../mongo");
const database = require("../database");
const {ObjectId} = require("mongodb");

const VincularMiddleware = {

    validateFields :  [
     body('idAluno').notEmpty().withMessage('O campo nome é obrigatório'),
     body('idClasse').notEmpty().withMessage('O campo telefone é obrigatório') 
   ],
 
   handle: async (req, res,next) =>{
 
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

     const {idAluno, idClasse} = req.body;
    
     await client.connect();
     const db = client.db(database);

     const alunoCol = db.collection("alunos");
     const classeCol = db.collection("classes");

     const uid = new ObjectId(idAluno);
     const aluno = await alunoCol.findOne({ _id: uid });
     if (!aluno) {
         return res.status(404).send({ message: "Aluno não encontrado" });
     }

     const uid2 = new ObjectId(idClasse);
     const classe = await classeCol.findOne({ _id: uid2 });
     if (!classe) {
         return res.status(404).send({ message: "Classe não encontrada" });
     }

     req.body.classe = classe;
     req.body.aluno = aluno;
      
     next();
   }
 
 }

 module.exports = VincularMiddleware;