const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/Thing');

// Init MongoDB connection
mongoose.connect('url', {
    useNewUrlParser: true,
    useUnifiedTopology: true})
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

// POST ROUTE
app.post(('/api/stuff'), (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body // use Spread syntax to bind all items
    });

    thing.save()
    .then(() => res.status(201).json({message: 'Ressource Created !'}))
    .catch(error => res.status(400).json({error}));
});

// GET ROUTE
app.use(('/api/stuff'), (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json(error));
});

module.exports = app;