const bcrypt = require("bcrypt");

const { SALT_ROUNDS } = process.env;
const saltRounds = Number(SALT_ROUNDS);

async function encrypt(plainText) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(plainText, salt);
  return hash;
}

async function compare(plainText, hashedString) {
  const isMatch = await bcrypt.compare(plainText, hashedString);
  return isMatch;
}

module.exports = { encrypt, compare };
