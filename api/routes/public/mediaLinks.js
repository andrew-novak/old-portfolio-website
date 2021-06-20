const express = require("express");

const { MediaLink } = require("../../models/MediaLink");

const router = express.Router();

router.get("/", (req, res, next) => {
  MediaLink.find({}).exec((err, links) => {
    if (err) return res.status(500).json(null);
    const filtered = links.map((link, index) => {
      const { id, variant, url } = link;
      return {
        id,
        variant,
        url
      };
    });
    res.status(200).json({ mediaLinks: filtered });
  });
});

module.exports = router;
