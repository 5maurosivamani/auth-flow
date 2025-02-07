const { verifyAccessToken } = require("../utils/jwt");

function verifyToken(req, res, next) {
  try {
    const authorization = req.headers["authorization"];
    const token = authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authorization Token Missing!" });
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded; // Store decoded payload in request for further use
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Authorization Token Expired!" });
    }
    return res.status(401).json({ message: "Authorization Token not valid!" });
  }
}

module.exports = verifyToken;
