const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('Requette recue !');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((res, rep, next) => {
    rep.json({ message : 'votre réponse à bien été reçue avec code ' + rep.statusCode})
    next();
});

app.use((req, res) => {
    console.log('Réponse envoyée avec succès');
});

module.exports = app;