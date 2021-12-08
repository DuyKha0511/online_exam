const userHandle = require('../Models/user.handle');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const status = require('../Config/status.json');


function verifyToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    // 'Bear [token]'
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.json({status: status.Unauthorized});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) res.json({status: status.Forbidden});
        next();
    })
}

router.get('/', verifyToken, (req, res) => {
    console.log('api/users called!!!!');
    userHandle.getAll().then(function(value) {
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})

router.get('/:username', verifyToken, (req, res) => {
    var username = req.params.username;
    console.log(`api/users/${username} called!!!!`);
    userHandle.getByUsername(username).then(function(user) {
        res.json({status: status.Access, data: user.recordsets[0]});
    });
})

module.exports = router;