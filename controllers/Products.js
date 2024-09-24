const express = require('express');
const Product = require('../Models/Product');

const createProduct = async (req, res = express.response) => {

    const product = new Product(req.body);

    try {

        const productSave = await product.save();

        res.status(201).json({
            state: true,
            msg: 'Producto guardado en el inventario',
            productSave
        });

    } catch (error) {
        res.status(500).json({
            state: false,
            msg: `Hubo un error interno: ${error}`,
            error
        })
    }

}

const getProducts = async(req, res = express.response) => {
    const products = await Product.find();

    res.status(200).json({
        state: true,
        products
    });
}

const getProductById = async(req, res = express.response) => {

    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                status: false,
                msg: "producto no encontrado o no disponible"
            });
        }

        return res.status(200).json({
            status: true,
            product,
            msg: "producto encontrado"
        });
        
    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: "Error en el servidor",
            error
        });
    }

}

const updateProduct = () => {

}

const deleteProduct = () => {

}

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };