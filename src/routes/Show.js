const express = require("express");
const Show = require("../../models/Show");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res, next) => {
  try {
    const shows = await Show.findAll();
    res.json(shows);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) {
      return res.status(404).json({ error: "Show not found" });
    }
    res.json(show);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
