const libraryHandle = require('../Models/library.handle');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const status = require('../Config/status.json');
const middleware = require('../_Middleware/question.middleware');

function get(username, req, res, next) {
    console.log("aaa" + username);
    next(username)
}

router.get('/',  (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    // 'Bear [token]'
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.json({status: status.Unauthorized});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) res.json({status: status.Forbidden});
        console.log('api/libraries called!!!!');

        libraryHandle.getLibrariesByUser(data.username).then(function(value) {
            res.json({status: status.Access, data: value.recordsets[0]});
        });
    })

    // console.log('api/questions called!!!!');

    // libraryHandle.getLibrariesByUser(username).then(function(value) {
    //     res.json({status: status.Access, data: value.recordsets[0]});
    // });
})


module.exports = router;