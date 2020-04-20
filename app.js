const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/Thing');

// Init MongoDB connection
mongoose.connect('mongodb+srv://gbague:gbague123@cluster0-4xpvn.mongodb.net/test?retryWrites=true&w=majority', {
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

// GET ROUTE ID
app.get(('/api/stuff/:id'), (req, res, next) => {
    Thing.findOne({ _id: req.params.id})
    .then( thing => res.status(200).json(thing))
    .catch( error => res.status(404).json({ error }));
});

// GET ROUTE
app.get(('/api/stuff'), (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json(error));
});

// PUT ROUTE ID
app.put(('/api/stuff/:id'), (req, res, next) => {
    Thing.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Object Updated !' }))
    .catch( error => res.status(400).json({ error }));
});

// DELETE ROUTE ID
app.delete(('/api/stuff/:id'), (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Object Deleted !' }))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;