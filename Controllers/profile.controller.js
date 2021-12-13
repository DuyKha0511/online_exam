const profileHandle = require('../Models/profile.handle');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const status = require('../Config/status.json');
const middleware = require('../_Middleware/profile.middleware');

router.get('/', middleware.verifyToken, (req, res) => {
    console.log('api/profile called!!!!');
    profileHandle.profile(req.Username).then(function(value) {
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})

router.post('/update', middleware.verifyToken, (req, res) => {
    console.log('api/profile/update called!!!!');
    profileHandle.updateProfile(req.Username, req.body).then(function(value) {
        res.json({status: status.Access});
    });
})

router.post('/password', middleware.verifyToken, (req, res) => {
    console.log('api/profile/password called!!!!');
    var OldPassword = req.body.OldPassword;
    var NewPassword = req.body.NewPassword;
    profileHandle.checkPassword(req.UserID, OldPassword).then(function(result) {
        if (result.recordset.length == 1) 
            profileHandle.changePassword(req.UserID, OldPassword, NewPassword).then(function(value) {
                res.json({status: status.Access})
            });
        else res.json({status: status.Error, message: 'Password is incorrect!'})
    }) 
})

module.exports = router;
