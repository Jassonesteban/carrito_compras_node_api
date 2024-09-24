const { Schema, model } = require('mongoose');

const PaymentUser = Schema({
    number_card: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    name_owner: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    }
});

module.exports = model('PaymentUser', PaymentUser);