const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connexion su')
    }).catch(err => { console.log(`Erreur : ${err}`); });

app.use(express.json());
app.use(express.static('public'))
app.set('view engine', 'ejs');

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/', (req, res, next) => {
    res.render('index');
});


app.listen(3000, () => {
    console.log('Backend server');
})