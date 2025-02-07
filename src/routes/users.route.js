const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { getAllUsers } = require("../controllers/user.controller");
const asyncWrapper = require("../utils/asyncWrapper");

const router = express.Router();

router.get("/", verifyToken, asyncWrapper(getAllUsers));

module.exports = router;
