const User = require('..models/User');
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

};