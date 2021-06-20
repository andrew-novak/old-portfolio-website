const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.PERSONAL_WEBSITE_JWT_SECRET;
const logger = require("../../logger");

const router = express.Router();

router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, admin, info) => {
    if (err) {
      logger.error(err);
      return res.status(500).json(null);
    }

    if (!admin) {
      logger.debug(
        "failed admin login: admin with given credentials not found"
      );
      return res.status(400).json(null);
    }

    logger.debug("admin with given credentials found, logging in...");
    req.login(admin, err => {
      if (err) {
        logger.error(err);
        return res.status(500).json(null);
      }

      const idToken = jwt.sign({ adminId: admin._id }, jwtSecret);
      logger.debug(
        "admin successfully logged in, sending token id to the client..."
      );
      res.status(200).json({ idToken });
    });
  })(req, res, next);
});

module.exports = router;
