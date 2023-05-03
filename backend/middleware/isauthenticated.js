const jwt = require("jsonwebtoken");
const { JWTSECTRET} = require("../util/const");
const db = require("../util/db");
const { User, Posting, Vote } = require("../models/main");


module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    jwt.verify(token, JWTSECTRET, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        }
    
        // Extract the user ID from the decoded JWT token
        const userId = decodedToken.sub;
    
        // Add the user ID to the request object as a new property
        req.userId = userId;
    
        // Call the next middleware in the chain
        next();
      });
}