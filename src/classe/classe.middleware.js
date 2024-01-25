const { body, validationResult } = require('express-validator');

const AlunoMiddleware = {

   validateFields :  [
    body('nome').notEmpty().withMessage('O campo nome é obrigatório')
  ],

  handle: (req, res,next) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }

}

module.exports = AlunoMiddleware