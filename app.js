const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

// Init MongoDB connection
mongoose.connect('mongodb+srv://gbague:gbague123@cluster0-4xpvn.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connection to MongoDB Successfull !'))
    .catch(() => console.log('Connection to MongoDb failed !'));

const app = express();

// ALLOW CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// PARSE REQ BODY TO JSON OBJECT
app.use(bodyParser.json());

// THINGS API
app.use('/api/stuff', stuffRoutes);

// USER API
app.use('/api/auth', userRoutes);

module.exports = app;