const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).json({ message: "No token, access denied" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const decoded = jwt.verify(token, "secretkey");

        // ✅ HANDLE BOTH CASES
        req.user = decoded.user || decoded;

        next();

    } catch (err) {
        console.log("AUTH ERROR:", err); // 🔥 helps debugging
        res.status(401).json({ message: "Invalid token" });
    }
};