const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
//handle errors

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
    //duplicate error code
    if (err.code === 11000) {
        errors.email = 'That email or username is already registered';
        return errors;
    }



    //Validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}


exports.post_signup = async (req, res) => {

    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

exports.post_login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json('Wrong credentials')
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        OriginalPassword !== req.body.password && res.status(401).json('Wrong credentials');

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC,
            { expiresIn: '3d' });

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.get_login = (req, res, next) => {
    const username = '';
    res.render('login', { 'username': username });
};

exports.get_signup = (req, res, next) => {
    const username = '';

    res.render('sign', { 'username': username });
};