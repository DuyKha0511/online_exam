const roleHandle = require('../Models/role.handle');
const express = require('express');
const router = express.Router();
const status = require('../Config/status.json');
const middleware = require('../_Middleware/role.middleware');

router.get('/group-function/', middleware.verifyToken, middleware.checkRole_All, (req, res) => {
    console.log(`api/role/group-function called!!!`);
    roleHandle.getAllGFs().then((GFs) => {
        res.json({status: status.Access, data: GFs.recordset});
    });
})

router.get('/group-function/:GFid', middleware.verifyToken, middleware.checkRole_All, (req, res) => {
    console.log(`api/role/group-function/${req.params.GFid} called!!!`);
    roleHandle.getFunctionFromGF(req.params.GFid).then((functions) => {
        if (functions.recordset.length !== 0) {
            res.json({status: status.Access, data: functions.recordset});
        }
        else {
            res.json({status: status.Error, message: "Group Function not existed!"});
        }
    });
})

router.post('/', middleware.verifyToken, middleware.checkRole_All, (req, res) => {
    console.log(`api/role/ create role called!!!`);
    const RoleName = req.body.RoleName;
    const Permissions = req.body.Permissions;
    roleHandle.getRoleByRoleName(RoleName).then((role) => {
        if (role.recordset.length === 0) {
            roleHandle.createNewRole(RoleName, Permissions).then((newRole) => {
                res.json({status: status.Error, data: {RoleID: newRole.recordset[0]}})
            })
        }
        else {
            res.json({status: status.Error, message: "RoleName is already in use!"})
        }
    })
})

module.exports = router;