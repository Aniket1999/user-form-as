const express = require('express');
const router = express.Router();
const login = require('../models/db');

router.post('/register', async (req, res, next) => {
    login.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("error found");
        }
        if (user) {
            return res.json({ message: "user exists" });
        } else {
            //code if no user with entered email was found
            let user = new login({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                dob: req.body.dob
            });
            user.save(function (err, user) {
                if (err) res.json({ message: "not created" });
                res.json({ name: req.body.name, email: req.body.email, message: "user created" });
            });
        }
    });
});


module.exports = router;        