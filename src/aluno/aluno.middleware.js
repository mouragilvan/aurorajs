const { body, validationResult } = require('express-validator');

const AlunoMiddleware = {

   validateFields :  [
    body('nome').notEmpty().withMessage('O campo nome é obrigatório'),
    body('telefone').notEmpty().withMessage('O campo telefone é obrigatório'),
    body('idade').notEmpty().withMessage('O campo idade é obrigatório')
      .isInt({ min: 0, max: 120 }).withMessage('O campo idade deve ser um número inteiro entre 0 e 120'),

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