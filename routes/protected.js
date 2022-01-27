const express = require('express');

function protectedRoutes() {
  const router = express.Router();

  /* GET protected page */

  router.get("/home", (req, res, next) => {
    let user = req.session.currentUser
    res.render("protected/home", { user });
  });

  router.get("/main", (req, res, next) => {
    let user = req.session.currentUser
    res.render("protected/main", { user });
  });

  router.get("/private", (req, res, next) => {
    let user = req.session.currentUser
    res.render("protected/private",{ user });
  });

  return router;
}

module.exports = protectedRoutes;