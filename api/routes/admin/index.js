const express = require("express");
const passport = require("passport");

const login = require("./login");
const logger = require("../../config/logger");
const mediaLinks = require("./mediaLinks");
const segments = require("./segments");
const projects = require("./projects");

const router = express.Router();

router.use("/login", login);

router.use("/", (req, res, next) => {
  passport.authenticate("jwt", { session: "false" }, (err, admin) => {
    if (err) {
      logger.error(err);
      return res.status(500).json(null);
    }

    if (!admin) {
      logger.debug("failed admin auth: no valid id token");
      return res.status(401).json(null);
    }

    req.adminId = admin._id;
    next();
  })(req, res, next);
});

router.use("/media-links", mediaLinks);
router.use("/segments", segments);
router.use("/projects", projects);

module.exports = router;
