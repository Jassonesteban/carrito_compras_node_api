const { Schema, model } = require('mongoose');

const AddressUser = Schema({
    Address: {
        type: String,
        required: true
    },
    country: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    postal_code: {
        type: String,
        require: true
    },
    details: {
        type: String,
        require: true
    }
});


module.exports = model('AddressUser', AddressUser);