const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    quantity: {
        type: String,
        require: true
    },

    available: {
        type: String,
        require: true
    },

    color: {
        type: String,
        require: true
    },

    country: {
        type: String,
        require: true
    },

    reference: {
        type: String,
        require: true
    }


});

module.exports = model('ProductSchema', ProductSchema);