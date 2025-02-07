const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = process.env;

function createToken(payload, secretKey, expiresIn) {
  return jwt.sign(payload, secretKey, { expiresIn });
}

function generateAccessToken(payload) {
  return createToken(payload, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN);
}

function generateRefreshToken(payload) {
  return createToken(payload, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN);
}

function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
