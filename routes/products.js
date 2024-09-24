const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { validarCampos } = require('../Middlewares/validarCampos');
const { validarJWT } = require('../Middlewares/validarJWT');
const { createProduct, getProducts, getProductById } = require('../controllers/Products');

//crear un producto
router.post('/newProduct', [
    check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('price', 'Ingrese un precio valido al producto').not().isEmpty(),
    check('description', 'Ingrese una descripcion valida').not().isEmpty(),
    check('quantity', 'Ingrese una cantidad valida').not().isEmpty(),
    check('available', 'Seleccione si esta disponible o no').not().isEmpty(),
    check('color', 'Seleccione un color que se parezca al producto').not().isEmpty(),
    check('country', 'Seleccione un pais valido').not().isEmpty(),
    check('reference', 'Ingrese una referencia valida').not().isEmpty(),
    check('image', 'Ingrese una url de la imagen').not().isEmpty(),
    check('category', 'Ingrese una categoria valida').not().isEmpty(),
    validarCampos
], createProduct);


//obtener todos los productos
router.get('/getProducts', getProducts);

//obtener producto por id
router.get('/getById/:id', getProductById);

//obtener producto por categoria


module.exports = router;