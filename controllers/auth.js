const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const { generateJWT } = require('../Helpers/createJWT.JS');

const createUser = async (req, res = express.response) => {

    //obtenemos los datos del usuario del formulario
    const { name, lastName, typeDocument, numberDocument, country, email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                status: false,
                msg: `El usuario con el email: ${email} ya existe`
            })
        }

        user = new User(req.body);

        //encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //inserta el nuevo usuario
        await user.save();

        //obtenemos el token para el nuevo usuario
        const token = await generateJWT(user.id, user.name);


        //si todo sale bien, llamamos el response con exito
        res.status(201).json({
            status: true,
            msg: `Usuario creado con exito`,
            token
        });

    } catch (error) {
        res.status(500).json({
            state: false,
            msg: `Hubo un error interno: ${error}`,
            error
        })
    }

}

const loginUser = async (req, res = express.response) => {

    const { email, password } = req.body;

    try {
        const usuario = await User.findOne({ email });

        //validamos si el usuario existe
        if (!usuario) {
            return res.status(400).json({
                status: false,
                msg: 'El usuario no existe'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                status: false,
                msg: 'Datos incorrectos, verifique las credenciales'
            });
        }

        // Generar JWT
        const token = await generateJWT(usuario.id, usuario.name);

        res.status(202).json({
            status: true,
            uid: usuario.id,
            name: usuario.name,
            token,
            msg: "Bienvenido usuario"
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Hubo un error internos',
            error
        });
    }
}

const validateToken = async(req, res = express.response) => {
    const { uid, name } = req;

    // generar nuevo jwt y enviarlo en esta nueva peticion
    const token = await generateJWT(uid, name);
    res.status(201).json({
        status: true,
        uid,
        name,
        token,
        msg: "Token renovado."
    });
}

const getUserById = async(req, res = express.response) => {

    const userId = req.params.id;
    const user = User.findById(userId);

    if(!user) {
        return res.status(404).json({
            status: false,
            msg: 'El usuario no existe'
        });
    }

    res.status(200).json({
        status: true,
        user,
        msg: "Usuario encontrado"
    });

}

module.exports = { createUser, loginUser, validateToken, getUserById };