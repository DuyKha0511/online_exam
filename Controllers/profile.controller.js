const profileHandle = require('../Models/profile.handle');
const express = require('express');
const router = express.Router();
const status = require('../Config/status.json');
const middleware = require('../_Middleware/profile.middleware');
const bcrypt = require('bcryptjs');

router.get('/', middleware.verifyToken, (req, res) => {
    console.log('api/profile called!!!!');
    profileHandle.profile(req.Username).then(function(value) {
        value.recordsets[0][0].Password = '';
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})

router.post('/update', middleware.verifyToken, (req, res) => {
    console.log('api/profile/update called!!!!');
    profileHandle.checkEmail(req.UserID, req.body.Email).then((response) => {
        if (response.recordsets[0].length === 1) {
            res.json({status: status.Error, message: "Email is already taken by the other user!"});
        }
        else {
            profileHandle.updateProfile(req.Username, req.body).then(function(value) {
                res.json({status: status.Access});
            });
        }
    })
})

router.post('/password', middleware.verifyToken, (req, res) => {
    console.log('api/profile/password called!!!!');
    var OldPassword = req.body.OldPassword;
    var NewPassword = req.body.NewPassword;
    profileHandle.checkPassword(req.UserID).then(function(result) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(NewPassword, salt);
            bcrypt.compare(OldPassword, result.recordset[0].Password).then((isMatch) => {
                if (isMatch) {
                    profileHandle.changePassword(req.UserID, hashPassword).then(function() {
                        res.json({status: status.Access})
                    });
                }
                else res.json({status: status.Error, message: 'Password is incorrect!'})
            });
        }
        catch {
            res.json({status: status.Error, message: 'Password is incorrect!'})
        }
    }) 
})

module.exports = router;
