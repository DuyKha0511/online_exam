const profileHandle = require('../Models/profile.handle');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const status = require('../Config/status.json');
const middleware = require('../_Middleware/profile.middleware');

/**
 * @swagger
 * /api/profile:
 *  get:
 *    tags: 
 *    - "Auth Server"
 *    summary: "Self Profile"
 *    description: Self Profile of an account
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "headers"
 *      name: "authorization"
 *      description: "Json Web Token"
 *      required: true
 *    security:
 *    - Bearer: []
 *    responses:
 *      '200':
 *        description: "status: Access | data"
 *      '601':
 *        description: "status: Forbidden/Access Denied | message: Error Token"
 *      '602':
 *        description: "status: Unauthorized | message: Unauthorized"
 */
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


module.exports = router;