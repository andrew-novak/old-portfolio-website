const express = require("express");

const { Segment } = require("../../models/Segment");

const router = express.Router();

router.get("/", (req, res, next) => {
  Segment.find({}).exec((err, segments) => {
    if (err) return res.status(500).json(null);
    const filtered = segments.map((segment, index) => {
      const { id, imageUrl, header, text } = segment;
      return {
        id,
        imageUrl,
        header,
        text
      };
    });
    res.status(200).json({ segments: filtered });
  });
});

module.exports = router;
