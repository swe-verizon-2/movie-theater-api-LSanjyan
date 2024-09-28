const express = require("express");
const { User, Show } = require("../../models");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:id/shows", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId, {
      include: Show,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user.Shows || []);
  } catch (error) {
    console.error("Error fetching shows:", error.message || error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
