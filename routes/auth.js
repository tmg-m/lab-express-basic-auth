const express = require('express');
const User = require('../models/User.model');

const bcrypt = require('bcryptjs');
const saltRounds = 10;


function authRouter() {
    const router = express.Router();

    router.get('/sign-up', (req, res, next) => {
        res.render('auth/sign-up');
    });

    router.post('/sign-up', (req, res, next) => {
        const { username, email, password, repeatPassword } = req.body;

        if (password !== repeatPassword) {
            return res.render('auth/sign-up', { errorMessage: "passwords does not match" });
        }
        /* res.render('auth/sign-up', { errorMessage: "all signed up" }); */

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        
        User.create({
            username,
            email,
            hashedPassword,
        })
        .then(userCreated => {
            res.redirect('/')
        })
        .catch(err => {
            next(err)
        });
    })

    return router
}

module.exports = authRouter();