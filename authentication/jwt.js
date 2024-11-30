const jwt = require('jsonwebtoken');
class Jwt {
    constructor(expiry) {
        this.expiry = expiry;
    }
    generateToken(user) {
        try {
            return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: this.expiry });
        } catch (error) {
            return null;
        }
    }
    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return null;
        }
    }
}
module.exports = Jwt;