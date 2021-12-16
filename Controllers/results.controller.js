const resultsHandle = require('../Models/results.handle');
const express = require('express');
const router = express.Router();
const status = require('../Config/status.json');
const middleware = require('../_Middleware/results.middleware');

router.get('/student/', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    console.log(`api/results/student/ view mark called!!!`);
    resultsHandle.getResultsOfStudent(req.UserID).then((results) => {
        res.json({status: status.Access, data: results.recordsets[0]});
    });
});

module.exports = router;