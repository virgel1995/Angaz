const jwt = require("jsonwebtoken");
// const endPoints = require("../common/roles");

const authenticator = (endPoint) => {
    return (req, res, next) => {
        try {
            const token = req.headers["authorization"].split(" ")[1];
            const decoded = jwt.verify(token, process.env.SECRET_TOKEN)
            const { role } = decoded.logUser
            // console.log(endPoint.includes(role));
            // console.log(role);
            if (endPoint.includes(role)) {
                // console.log(decoded);
                req.userIn = decoded.logUser
                next()
            } else {
                res.status(400).json({ message: "Not Authorized" })
            }
        } catch (error) {
            res.status(500).json({ message: "Error in Auth" })
        }
    }
}

module.exports = authenticator