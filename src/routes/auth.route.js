const express = require("express");
const { registerUser, loginUser, newRefreshToken, logoutUser } = require("../controllers/auth.controller");
const asyncWrapper = require("../utils/asyncWrapper");

const router = express.Router();

router.post("/login", asyncWrapper(loginUser));

router.post("/register", asyncWrapper(registerUser));

router.get("/logout", asyncWrapper(logoutUser));

router.get("/refresh", asyncWrapper(newRefreshToken));

module.exports = router;
