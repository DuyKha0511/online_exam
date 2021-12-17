const userHandle = require('../Models/user.handle');
const express = require('express');
const router = express.Router();
const status = require('../Config/status.json');
const middleware = require('../_Middleware/user.middleware');


router.get('/', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    console.log('api/users called!!!!');
    userHandle.getAll().then(function(user) {
        user.recordsets[0].map((value) => {
            value.Password = ''
        });
        res.json({status: status.Access, data: user.recordsets[0]});
    });
})

router.get('/:UserID', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    var UserID = req.params.UserID;
    console.log(`api/users/${UserID} called!!!!`);
    userHandle.getByUserID(UserID).then(function(user) {
        res.json({status: status.Access, data: user.recordsets[0]});
    });
})

module.exports = router;
