const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const Category = require('../models/Category');
const multer = require('./../middleware/multer-config');

router.post('/', verifyTokenAndAdmin, multer, async (req, res, next) => {
    const newCategory = new Category(req.body);
    try {
        const savedCategory = await newCategory.save().then(category => res.status(200).json(category)).catch(err => res.status(401).json({ err }))


    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;