const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const authorize = require('./routes/auth.js');


router.get('/volcano/:id', function(req, res,next) {

    
    req.db.select(
        'id', 'name', 'country', 'region',
        'subregion', 'last_eruption', 'summit',
        'elevation', 'latitude', 'longitude', 'population_5km',
        'population_10km', 'population_30km','population_100km').
        from('data').where('id', '=', req.params.id)
        .then(volcanoes => {
            
            let a = volcanoes.map(volcano => {
                return {
                    "id": volcano.id, 'name': volcano.name,
                    'country': volcano.country, 'region': volcano.region,
                    'subregion': volcano.subregion, 'last_eruption': volcano.last_eruption,
                    'summit': volcano.summit, 'elevation': volcano.elevation,
                    'latitude': volcano.latitude, 'longitude': volcano.longitude,
                    'population_5km': volcano.population_5km,
                    'population_10km': volcano.population_10km,
                    'population_30km': volcano.population_30km,
                    'population_100km': volcano.population_100km

                }
            })
            
            res.status(200).json(a[0])
           
        })
        .catch((err) => {
            console.log(err);
            res.json({ "Error": true, "Message": "Error in MySQL query" })
        })

});
//module.exports = authorize;
module.exports = router;