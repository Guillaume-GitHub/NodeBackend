const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(('/api/stuff'), (req, res, next) => {
    const stuff = [
        {
            _id: 'ABCDERF',
            title: 'Mon premier objet',
            description: 'Decription de mon 1er objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2017/08/06/07/28/instrument-2589863_960_720.jpg',
            price: 4900,
            userId: 'JJKFZJcedlkjdf'
        },
        {
            _id: 'PDGHVNBKF',
            title: 'Mon second objet',
            description: 'Decription de mon 2eme objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2010/12/13/10/01/accord-2119_960_720.jpg',
            price: 3500,
            userId: 'kjdbvhn536fdg0f'
        }
    ];
    res.status(200).json(stuff);
});

module.exports = app;