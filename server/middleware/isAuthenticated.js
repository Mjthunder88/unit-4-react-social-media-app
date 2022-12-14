require('dotenv').config()
const jwt = require('jsonwebtoken') //? This is creating a JSON Web Token so that we can use it throughout our verfiying function. 
const {SECRET} = process.env //? This is destructruing our secret key from our .env file. 

module.exports = {
    isAuthenticated: (req, res, next) => { //? This function is authorizeing the user or checking if the users JWT is correct/Valid. 
        const headerToken = req.get('Authorization')

        if (!headerToken) { //? If their is no token at all then it will send a 401 error status code.
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET) //? Otherwise it has a try catch block where its goign to verfiy the JSON Web Token  with the SECRET key we have stored in our .env file. 
        } catch (err) {  //? So its storing it in  the token variable then on the below if BLOCK.
            err.statusCode = 500
            throw err
        }

        if (!token) {
            const error = new Error('Not authenticated.') //? Its checking here to see if the token is valid. If its false then it will send a 401 error code. 
            error.statusCode = 401
            throw error
        }

        next() //? This just means it would run the next middleware if any were below. 
    }
}