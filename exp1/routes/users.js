
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/* GET users listing. */

// Create route for users to register
router.post("/register", function (req, res, next) {

    // Retrieve email and password from req.body
    const email = req.body.email
    const password = req.body.password

    // Verify body and send error message if email or password is missing
    if (!email || !password) {
        res.status(400).json({
            "error": true,
            "message": "Request body incomplete, both email and password are required"
        })
        return
    }
    if (!/^[^@]+@[^@]+.[^@]+$/.test(email)) {
        res.status(400).json({
            Error: true,
            Message: "Invalid format email address"
        });
        return;
    }

    // Determine if user already exists in table
    const queryUsers = req.db.from("users").select("*").where("email", "=", email)
    queryUsers
        // If user does exist, return error response
        .then((users) => {
            if (users.length > 0) {
                res.status(409).json({
                    "error": true,
                    "message": "User already exists"
                });
                return
            }

            // If user does not exist, insert into table and encrypt password using hash
            const saltRounds = 10
            const hash = bcrypt.hashSync(password, saltRounds)
            res.status(201).json({ success: true, message: "User created" })
            return req.db.from("users").insert({ email, hash }) 
        })
        
})

router.post("/login", function (req, res, next) {
    const email = req.body.email
    const password = req.body.password

    // Verify body and send error message if email or password is missing
    if (!email || !password) {
        res.status(400).json({
            "error": true,
            "message": "Request body incomplete, both email and password are required"
        })
        return
    }
    const queryUsers = req.db.from("users").select("*").where("email", "=", email)
    queryUsers
        // If user does exist, return error response
        .then((users) => {
            if (users.length == 0) {
                console.log("User does not exist");
                return;
            }
            const user = users[0]
            return bcrypt.compare(password, user.hash)
        })
        .then((match) => {
            if (!match) {
                res.status(401).json({
                    "error": true,
                    "message": "Incorrect email or password"
                })
                return
            }
            console.log("password match")
            const secretKey = "secret key"
            const expires_in = 60 * 60 * 24 // 1 day
            const exp = Date.now() + expires_in * 1000
            const token = jwt.sign({ email, exp }, secretKey)
            res.json({ token_type: "Bearer", token, expires_in })
        })
})
router.get("/:email/profile", function (req, res, next) {
    let email = req.params.email;
    const queryUsers = req.db.from("users").select("email",'firstname','lastname','dob','address').where("email", "=", email)
    queryUsers
        // If user does exist, return error response
        .then((users) => {
            if (users.length == 0) {
                res.status(401).json({
                    "error": true,
                    "message": "User not found"
                })
                return;
            }
            let array = users.map(user => {
                return {
                    'email': user.email,
                    'firstname': user.firstname,
                    'lastname': user.lastname,
                    'dob': user.dob,
                    'address': user.address
                }
            })
            res.status(200).json(array[0])
        })
        
})
router.put("/:email/profile", function (req, res, next) {
    let email = req.params.email;
    if (!req.body.firstName || !req.body.lastName || !req.body.dob || !req.body.address) {
        res.status(400).json({ message: `Error updating population` });
        // console.log(`Error on request body:`, JSON.stringify(req.body));
        return
    }
    let firstName = req.body.firstName
    let lastName  = req.body.lastName
    let dob       = req.body.dob
    let address   = req.body.address
   //const queryUsers = req.db.from("users").update( 'firstname', 'lastname','dob','address').where("email", "=", email)
    const putUsers = req.db.from("users").update("firstname", '=', firstName)
    putUsers.update("lastname", '=', lastName)
        .update("dob", '=', dob)
        .update("address", '=', address)
        .where("email", "=", email)
        .then(function () {
            res.status(201).json({
                'email': user.email,
                'firstname': user.firstname,
                'lastname': user.lastname,
                'dob': user.dob,
                'address': user.address
            });
            
        }).catch((error) => {
            res.status(500).json({ message: 'Database error - not updated' })
        })
})

module.exports = router;


