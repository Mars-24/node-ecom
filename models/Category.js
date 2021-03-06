const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({

    title: { type: String, required: true },
    catImg: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);