const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try {
        // 1. Get token from header
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: "No token, access denied" });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, "secretkey");

        // 3. Attach user to request
        req.user = decoded;

        next(); // move to next
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};