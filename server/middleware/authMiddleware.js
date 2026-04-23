const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try {
        // 1. Get header
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).json({ message: "No token, access denied" });
        }

        // 2. Extract token from "Bearer <token>"
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        // 3. Verify token
        const decoded = jwt.verify(token, "secretkey");

        // 4. Attach user
        req.user = decoded;

        next();

    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};