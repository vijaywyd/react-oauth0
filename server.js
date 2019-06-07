const express = require('express');
const jwt = require('express-jwt'); // Validate jwt and set req.user
const jwksRsa = require('jwks-rsa'); // Retrieve RSA keys from a JSON Web Key Set Endpoint
require('dotenv').config();

const app = express();

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
    }),

    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
    algorithms: ["RS256"]
});



app.get('/public', function(req, res) {
    res.json({
        message: "Hello from a public API"
    });
});


/*
 *Express supports declarng multiple arguments here to validate the request. If any check fails then the request fails 
 */
app.get('/private', checkJwt, function(req, res) {
    res.json({
        message: "Hello from a private API"
    });
});


app.listen(3001);
console.log("Api server listening on " + process.env.REACT_APP_AUTH0_AUDIENCE);

