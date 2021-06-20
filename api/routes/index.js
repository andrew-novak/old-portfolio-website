const express = require("express");
const router = express.Router();

const admin = require("./admin");
const public = require("./public");

router.options("/*", (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.header("Access-Control-Allow-Origin", "*");
  }
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.sendStatus(200);
});

router.use("/admin", admin);
router.use("/public", public);

module.exports = router;
