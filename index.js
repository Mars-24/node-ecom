const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const categoryRoute = require('./routes/category');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connexion su')
    }).catch(err => { console.log(`Erreur : ${err}`); });

app.use(express.json());
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res, next) => {
    const username = '';
    res.render('index', { 'username': username });

});

app.use('/api/users', userRoute);
app.use(authRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/category', categoryRoute);



app.listen(3000, () => {
    console.log('Backend server');
})