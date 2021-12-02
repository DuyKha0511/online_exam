const roleHandle = require('../Models/role.handle');
const status = require('../Config/status.json');
const jwt = require('jsonwebtoken');

const class_GroupFunction = 9

function verifyToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    // 'Bear [token]'
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.json({status: status.Unauthorized});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) res.json({status: status.Forbidden});
        next(data.username);
    })
}

function checkRole_View(username, req, res, next) {
    const view_type = 1;
    roleHandle.getRole(username, class_GroupFunction).then(function(role) {
        if (role.recordsets[0][0].Enable >= view_type) next();
        else res.json({status: status.Forbidden, message: `As a ${role.recordsets[0][0].RoleName}, you cannot access this function!`});
    });
}

function checkRole_Create(username, req, res, next) {
    const view_type = 2;
    roleHandle.getRole(username, class_GroupFunction).then(function(role) {
        if (role.recordsets[0][0].Enable >= view_type) next();
        else res.json({status: status.Forbidden, message: `As a ${role.recordsets[0][0].RoleName}, you cannot access this function!`});
    });
}

function checkRole_Update(username, req, res, next) {
    const view_type = 3;
    roleHandle.getRole(username, class_GroupFunction).then(function(role) {
        if (role.recordsets[0][0].Enable >= view_type) next();
        else res.json({status: status.Forbidden, message: `As a ${role.recordsets[0][0].RoleName}, you cannot access this function!`});
    });
}

module.exports = {
    verifyToken, 
    checkRole_View,
    checkRole_Create,
    checkRole_Update
}