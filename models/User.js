const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'], unique: true, lowercase: true, validate: [isEmail, 'Please enter a valid email']
    },
    password: { type: String, required: [true, 'Please enter a password'], minLength: [6, 'Minimum password length is 6 characters'] },
    isAdmin: { type: Boolean, default: false, },

}, { timestamps: true, });

userSchema.post('save', function (doc, next) {
    console.log('new user was created', doc),
        next();
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log('prev');
    next();
});
module.exports = mongoose.model("User", userSchema);
