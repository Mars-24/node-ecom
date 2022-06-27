const mongoose = require('mongoose');

const OrderSchema = new Mongoose.Schema({
    userId: { type: String, required: true },
    products: [{
        productId: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 1,
        }
    }],
    amount: { type: Number, required: true },
    adress: { type: Object, required: true },
    status: { type: String, default: 'pending' },
}, { timestanp: true });


module.exports = mongoose.model('Order', OrderSchema);