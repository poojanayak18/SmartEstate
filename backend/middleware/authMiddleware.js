const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {

    try {

        // GET TOKEN
        const authHeader =
            req.headers.authorization;

        console.log(authHeader);

        if (!authHeader) {

            return res.status(401).json({

                message: "No Token"
            });
        }

        // EXTRACT TOKEN
        const token =
            authHeader.split(" ")[1];

        console.log("TOKEN:", token);

        // VERIFY TOKEN
        const decoded =
            jwt.verify(token, "secret");

        console.log(decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log(error);

        res.status(401).json({

            message: "Invalid Token"
        });
    }
};