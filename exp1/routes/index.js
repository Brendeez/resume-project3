
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
/* GET home page. */
/*
router.get('/countries', function (req, res, next) {
    res.status(200).json(
        [
            "Algeria",
            "Antarctica",
            "Argentina",
            "Armenia",
            "Australia"
        ]
    );
});

*/
/*
router.get('/countries', function (req, res, next) {

    req.db.distinct().from('data').select("country").orderBy('country')
       
        .then(rows => { return res.status(200).json(rows.map(row => { return row.country })) })
        .catch((err) => {
            console.log(err);
            res.json({ "Error": true, "Message": "Error in MySQL query" })
        })
});
*/
/*
router.get('/volcanoes', (req, res, next) => {
    if (req.query.populatedWithin === undefined) {

        req.db.select('id', 'name', 'country', 'region', 'subregion').from('data').where('country', '=', req.query.country)
            .then(volcanoes => {
                return res.status(200).json(volcanoes.map(volcano => {
                    return {
                        "id": volcano.id,
                        "name": volcano.name,
                        "country": volcano.country,
                        "region": volcano.region,
                        "subregion": volcano.subregion,
                    }
                }))
            })
            .catch((err) => {
                console.log(err);
                res.json({ "Error": true, "Message": "Error in MySQL query" })
            })
    } else {
        req.db.select('id', 'name', 'country', 'region', 'subregion').from('data').where('country', '=', req.query.country).andWhere(`population_${req.query.populatedWithin}`, '>', '0')
            .then(volcanoes => {
                return res.status(200).json(volcanoes.map(volcano => {
                    return {
                        "id": volcano.id,
                        "name": volcano.name,
                        "country": volcano.country,
                        "region": volcano.region,
                        "subregion": volcano.subregion,
                    }
                }))
            })
            .catch((err) => {
                console.log(err);
                res.json({ "Error": true, "Message": "Error in MySQL query" })
            })
    }
});
*/
/*
router.get('/volcano/:id', (req, res, next) => {

    req.db.select('id', 'name', 'country', 'region', 'subregion').from('data').where('id', '=', req.params.id)
        .then(volcanoes => {
            return res.status(200).json(volcanoes.map(volcano => {
                return {
                    "id": volcano.id

                }
            }))
        })
        .catch((err) => {
            console.log(err);
            res.json({ "Error": true, "Message": "Error in MySQL query" })
        })

});
*/
module.exports = router;
