const express = require("express");

const Product = require("../models/post.model");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const user = req.user;

    const product = await Product.create({
      title: req.body.title,
      body: req.body.body,
      user: user.user._id,
    });

    return res.status(201).json({ product });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("/", async (req, res) => {
  const products = await Product.find().populate({path: "user", select : "name"}).lean().exec();

  return res.send(products);
});

module.exports = router;
