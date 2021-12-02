const profileHandle = require('../Models/profile.handle');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const status = require('../Config/status.json');


router.get('/',  (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    // 'Bear [token]'
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.json({status: status.Unauthorized});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) res.json({status: status.Forbidden});
        console.log('api/profile called!!!!');

        profileHandle.profile(data.username).then(function(value) {
            res.json({status: status.Access, data: value.recordsets[0]});
        });
    })
})

router.post('/update',  (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    // 'Bear [token]'
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.json({status: status.Unauthorized});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) res.json({status: status.Forbidden});
        console.log('api/profile/update called!!!!');
        // console.log(req.body);
        profileHandle.updateProfile(data.username, req.body).then(function(value) {
            res.json({status: status.Access});
        });
    })
})


module.exports = router;