var express = require('express');
var router = express.Router();

router.get('/me', function (req, res, next) {
    res.json({ "name": "Brendon Dam", "student_number": "n11072059" });// "" or no "" arount the name and student number
});

module.exports = router;
