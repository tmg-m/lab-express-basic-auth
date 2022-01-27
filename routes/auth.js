const express = require('express');
const User = require('../models/User.model');

const bcrypt = require('bcryptjs');
const saltRounds = 10;


function authRouter() {
    const router = express.Router();

    // Sign Up
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

    // Log In
    router.get('/log-in', (req, res, next) => {
        res.render('auth/log-in');
    });

    router.post('/log-in', async (req, res, next) => {
        const { username, password } = req.body;
        /* res.render('auth/sign-up', { errorMessage: "all signed up" }); */

        try {
            if (!username) {
                return res.render('auth/log-in', { errorMessage: 'Enter your username' });
            }
            if (!password) {
                return res.render('auth/log-in', { errorMessage: 'Enter your password' });
            }
            console.log("finding user")
            const dbUser = await User.findOne({ username });
            console.log("user found")
            if (!dbUser) {
                return res.render('auth/log-in', { errorMessage: 'Enter correct username' });
            }

            const { _id, hashedPassword } = dbUser;
            if (bcrypt.compareSync(password, hashedPassword)) {
                console.log("password match")
                req.session.currentUser = {
                    _id,
                    username,
                  }; 
                console.log(_id)
                res.redirect('/protected/home');
              } else {
                return res.render('auth/log-in', { errorMessage: 'Your username or password is Incorrect' });
              }

        } catch (error) {
            next(error)
        }

        // Log out
        router.post('/log-out', (req, res, next) => {
            req.session.destroy(err => {
                if (err) next(err);
                res.redirect('/');
              });
        })
        
    })

    return router
}

module.exports = authRouter();