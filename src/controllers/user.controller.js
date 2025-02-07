const Joi = require("joi");
const User = require("../models/user.model");

async function getAllUsers(req, res) {
  const querySchema = Joi.object({
    limit: Joi.number().min(0),
    offset: Joi.number().min(0),
  });

  try {
    const { value, error } = querySchema.validate(req.query);

    if (error) {
      return res.status(400).json({ message: error.details?.[0]?.message });
    }

    const { limit = 10, offset = 0 } = value;
    const users = await User.findAll({ limit, offset });

    res.json({ data: users });
  } catch (err) {
    console.log("Internal Error:", err);
    res.status(500).json({ message: "Internal error!" });
  }
}

module.exports = { getAllUsers };
