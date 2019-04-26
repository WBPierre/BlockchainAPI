User = require('../views/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config/secrets');

const crypto = require('crypto');

const algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
const key = 'password';

exports.user_register = function (req, res) {

    const cipher = crypto.createCipher(algorithm, key);
    const encrypted = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');
    req.body.password = encrypted;

    const new_user = new User(req.body);
    new_user.save(function (err, user) {
        if (err) res.send(err);
        res.json(user);
    })
};

exports.user_login = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {

        const cipher = crypto.createCipher(algorithm, key);
        const encrypted = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');
        req.body.password = encrypted;

        if (err) res.send(err);
        if (user.email === req.body.email && user.password === req.body.password) {
            jwt.sign({ user: user }, config.secrets.jwt_key, { expiresIn: '7 days' }, (err, token) => {
                if (err) res.send(err);
                res.json({ token });
            });
        } else {
            res.sendStatus(400);
        }
    });
};

exports.deleteUser = function (req, res) {
    User.remove({ email: req.body.email }, function (err, user) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(user);
        }
    });
}

exports.listAllUsers = function (req, res) {
    User.find({}, function (err, user) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(user);
        }
    });
}