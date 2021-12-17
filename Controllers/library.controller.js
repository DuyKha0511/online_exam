const libraryHandle = require('../Models/library.handle');
const express = require('express');
const router = express.Router();
const status = require('../Config/status.json');
const middleware = require('../_Middleware/question.middleware');

router.get('/all', middleware.verifyToken, middleware.checkRole_View,  (req, res) => {
    console.log('api/libraries/all called!!!!');
    libraryHandle.getAll().then(function(value) {
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})

router.get('/', middleware.verifyToken, middleware.checkRole_View,  (req, res) => {
    console.log('api/libraries called!!!!');
    libraryHandle.getLibrariesByUserID(req.UserID).then(function(value) {
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})

router.get('/:LibraryID', middleware.verifyToken, middleware.checkRole_View,  (req, res) => {
    console.log(`api/libraries/${req.params.LibraryID} called!!!!`);
    libraryHandle.getLibraryByID(req.params.LibraryID).then(function(value) {
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})

router.post('/', middleware.verifyToken, middleware.checkRole_Create,  (req, res) => {
    const newInfo = {
        LibraryFolderName: req.body.LibraryFolderName,
        Description: req.body.Description,
        Avatar: req.body.Avatar
    }
    console.log(`api/libraries/ create called!!!!`);
    libraryHandle.insertLibraryFolder(req.UserID, newInfo).then(function(value) {
        res.json({status: status.Access});
    });
})


router.put('/:LibraryID', middleware.verifyToken, middleware.checkRole_Update,  (req, res) => {
    const LibraryID = req.params.LibraryID;
    const newInfo = {
        LibraryFolderName: req.body.LibraryFolderName,
        Description: req.body.Description,
        Avatar: req.body.Avatar
    }
    console.log(`api/libraries/${LibraryID} update called!!!!`);
    libraryHandle.updateLibraryFolder(LibraryID, newInfo).then(function(value) {
        res.json({status: status.Access});
    });
})


router.delete('/:LibraryID', middleware.verifyToken, middleware.checkRole_Update,  (req, res) => {
    console.log(`api/libraries/${req.params.LibraryID} delete called!!!!`);
    libraryHandle.deleteLibraryFolder(req.params.LibraryID).then(function(value) {
        res.json({status: status.Access});
    });
})

module.exports = router;
