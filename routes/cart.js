const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();
const Cart = require('../models/Cart');
const { json } = require('express/lib/response');

router.post('/', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedcart);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {

    try {
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updateCart);
    } catch (err) {
        res.status(500).json(err)
    }
});


router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json('Cart has been deleted.....')
    } catch (error) {
        res.status(500).json(error);
    }
});
// //GET USER Cart

router.get('/find/:userId', async (req, res) => {
    try {
        const carts = await Cart.findOne({ userId: req.params.userId })
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error);
    }
});

// //GET ALL Cart

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500); json(error);
    }
})


module.exports = router;