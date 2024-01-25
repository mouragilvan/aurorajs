const DefaultControllerObject = require("../DefaultControllerObject");
const vincularAluno = require("./vincular.function");
const AlunoMiddleware = require("./aluno.middleware");
const VincularMiddleware = require("./vincular.middleware");
const resource = require("./aluno.resource");

var AlunoController = new DefaultControllerObject("alunos",resource);

AlunoController.vincular = vincularAluno;

module.exports =  {AlunoController,AlunoMiddleware, VincularMiddleware} 