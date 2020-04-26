const User = require('../models/User');
const bcryt = require('bcrypt');

exports.signup = (req, res, next) => {
    bcryt.hash(req.boby.password, 10)
    .then(hash => {
        const user =  User({
            email: req.body.email,
            password: hash
        });

        user.save()
        .then(() => res.status(201).json({ message: 'User created !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then( user => {
        if(!user) {
            return res.status(404).json({ error: 'User not found !'});
        }
        bcryt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ message: 'Invalid password !'});
            }
            res.status(200).json({ 
                userId: user._id,
                token: 'FdsdfD_gfgPLS4s6df53g4qgsHYggh_6qsd4f'
            });
        })
        .catch()
    })
    .catch(error => res.status(400).json({ error }));
};