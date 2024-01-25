const DefaultControllerObject = require("../DefaultControllerObject");
const ClasseMiddleware = require("./classe.middleware");

const ClasseController = new DefaultControllerObject("classes");


module.exports = { ClasseController, ClasseMiddleware }