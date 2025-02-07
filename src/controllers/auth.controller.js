const Joi = require("joi");
const User = require("../models/user.model");
const RefreshToken = require("../models/refresh_tokens.model");
const { encrypt, compare } = require("../utils/hash");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

const userSchema = Joi.object({
  username: Joi.string().required().min(3).max(30),
  password: Joi.string().min(8).max(20),
});

async function registerUser(req, res) {
  try {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
      return res.status(400).send({ message: error.details?.[0]?.message });
    }

    const { username, password } = value;

    const existingUser = await User.findOne({
      where: {
        username,
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = await encrypt(password);

    const newUser = await User.create({ username, password: hashedPassword });
    const stringifiedUser = JSON.stringify(newUser);

    console.log(stringifiedUser);

    res.send({ message: "User registered  SuccessFully!" });
  } catch (err) {
    console.error("Internal Error:", err);

    next(err);
  }
}

async function loginUser(req, res) {
  try {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
      return res.status(400).send({ message: error.details?.[0]?.message });
    }

    const { username, password } = value;

    const userDetails = await User.findOne({
      where: {
        username,
      },
    });
    const user = userDetails?.dataValues;

    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid UserName or Password!" });
    }

    const payload = { username: user.username, id: user.id };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await RefreshToken.create({
      user_id: user.id,
      token: refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const cookieConfig = {
      httpOnly: true,
      sameSite: "none",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    };

    res.cookie("refreshToken", refreshToken, cookieConfig);
    res.header("Authorization", `Bearer ${accessToken}`);
    res.send({ message: "Successfully login!", accessToken });
  } catch (err) {
    console.log("Error:", err);
    res.send("login  user");
  }
}

async function logoutUser(req, res) {
  try {
    // get refreshToken cookie
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
      return res.json({ message: "Refresh Token does not exist!" });
    }

    const tokenExist = await RefreshToken.findOne({ where: { token: refreshToken } });

    // if not 
    if (!tokenExist) {
      return res.json({ message: "Refresh Token not found in database!" });
    }

    // if exist remove token from table in db
    await tokenExist.destroy();

    const cookieConfig = {
      httpOnly: true,
      // secure: true, // Use secure cookies in production (HTTPS required)
      sameSite: "none",
      expires: new Date(0), // Expire the cookie immediately
    };
    res.cookie("refreshToken", "", cookieConfig);
    return res.json({ message: "User logged out successfully!" });
  } catch (err) {
    console.error("Logout Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function newRefreshToken(req, res) {
  try {
    const refreshToken = req.cookies["refreshToken"];

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh Token not available!" });
    }

    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded || !decoded.username || !decoded.id) {
      return res.status(401).json({ message: "Refresh Token not valid!" });
    }

    const payload = { username: decoded.username, id: decoded.id };
    const accessToken = generateAccessToken(payload);

    return res.json({ message: "New access token generated!", accessToken });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

module.exports = { registerUser, loginUser, logoutUser, newRefreshToken };
