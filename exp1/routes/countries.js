const express = require('express');
const router = express.Router();
router.get('/countries', function (req, res, next) {

    req.db.distinct().from('data').select("country").orderBy('country')

        .then(rows => { return res.status(200).json(rows.map(row => { return row.country })) })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ "error": true, "message": "Invalid query parameters. Query parameters are not permitted." })
        })
});

module.exports = router;

/*  if(!req.body.City || !req.body.CountryCode || !req.body.Pop) {
        res.status(400).json({ message: `Error updating population` });
        
        */