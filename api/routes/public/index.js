const express = require("express");

const mediaLinks = require("./mediaLinks");
const segments = require("./segments");
const projects = require("./projects");

const router = express.Router();

router.use("/media-links", mediaLinks);
router.use("/segments", segments);
router.use("/projects", projects);

module.exports = router;
