const express = require('express');
const router = express.Router();
router.get('/volcanoes', (req, res, next) => {
    if (req.query.country === null) {
        res.status(400).json({ "error": true,
  "message": "Country is a required query parameter." })
    }


    if (req.query.populatedWithin === undefined) {

        req.db.select('id', 'name', 'country',
            'region', 'subregion').from('data').
            where('country', '=', req.query.country)
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
                res.status(400).json({
                    "error": true,
                    "message": "Country is a required query parameter."
                })
            })
    } else {
        req.db.select('id', 'name', 'country',
            'region', 'subregion').from('data')
            .where('country', '=', req.query.country)
        .andWhere(`population_${req.query.populatedWithin}`, '>', '0')
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
                res.status(400).json({
                    "error": true,
                    "message": "Country is a required query parameter."
                })
            })
    }
});

module.exports = router;