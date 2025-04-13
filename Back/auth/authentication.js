const expressValidator = require("express-validator");
const check = expressValidator.check;


module.exports = new class {
    registerValidation(){
        return[
            check('Email').isEmail().withMessage('Email in mot valid'),
            check('Name').not().isEmpty().withMessage('Name cant be empty'),
            check('Password').not().isEmpty().withMessage('Password cant be empty')
        ]
    }
}