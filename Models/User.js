const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        require: true
    },
    typeDocument: {
        type: String,
        require: true
    },
    numberDocument: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'AddressUser',
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: 'PaymentUser',
    }

});

UserSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;

    return object;
});

module.exports = model('User', UserSchema);