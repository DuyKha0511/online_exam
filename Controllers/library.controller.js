const libraryHandle = require('../Models/library.handle');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const status = require('../Config/status.json');
const middleware = require('../_Middleware/question.middleware');

router.get('/', middleware.verifyToken, middleware.checkRole_View,  (req, res) => {
    console.log('api/libraries called!!!!');
    libraryHandle.getLibrariesByUserID(req.UserID).then(function(value) {
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})


module.exports = router;