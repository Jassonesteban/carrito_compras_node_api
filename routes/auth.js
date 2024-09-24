const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { createUser, loginUser, validateToken, getUserById } = require('../controllers/auth');
const { validarCampos } = require('../Middlewares/validarCampos');
const { validarJWT } = require('../Middlewares/validarJWT');

//crear un nuevo usuario
router.post('/createUser', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'Debe ingresar almenos un apellido').not().isEmpty(),
    check('typeDocument', 'Ingrese un tipo de documento valido').not().isEmpty(),
    check('numberDocument', 'Ingrese un numero de documento valido').not().isEmpty(),
    check('country', 'Seleccione un pais').not().isEmpty(),
    check('email', 'debe ser un email valido').isEmail(),
    check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
], createUser);

//Login del usuario
router.post('/login', [
    check('email', 'debe ser un email valido').isEmail(),
    check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
], loginUser);

//renovar token del usuario
router.get('/validateToken',validarJWT, validateToken);

//obtener informacion del usuario
router.get('/getUser/:id', getUserById);

module.exports = router;