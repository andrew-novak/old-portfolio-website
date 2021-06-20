const express = require("express");
const { query } = require("express-validator");
const mongoose = require("mongoose");
const fs = require("fs");
const { writeFile } = fs.promises;
const path = require("path");
const rimraf = require("rimraf");

const { MediaLink: Link } = require("../../models/MediaLink");
const logger = require("../../logger");
const { validateRange, validateId, reviewValidation } = require("./validation");

const router = express.Router();

// Get many
router.get("/", [validateRange, reviewValidation], (req, res, next) => {
  const { range } = req.query;
  const [start, end] = range.replace(/[\[\]']+/g, "").split(",");
  Link.find({ id: { $gte: start, $lte: end } })
    .sort({ id: -1 })
    .exec((err, links) => {
      if (err) {
        logger.error(err);
        return res.status(400).json(null);
      }
      Link.countDocuments().exec((err, total) => {
        if (err) {
          logger.error(err);
          return res.json({ err });
        }
        logger.debug("links in the range: " + total);
        res.header("Access-Control-Expose-Headers", "Content-Range");
        res.header("Content-Range", `links ${start}-${end}/${total}`);
        logger.debug("sending links...");
        res.status(200).json([...links]);
      });
    });
});

// Get one
router.get("/:id", [validateId, reviewValidation], (req, res, next) => {
  const { id } = req.params;
  Link.findOne({ id }).exec((err, link) => {
    if (err) {
      logger.error(err);
      return res.status(500).json(null);
    }
    if (!link) {
      logger.debug(`link (id: ${id}) not found`);
      return res.status(400).json(null);
    }
    logger.debug(`sending link (id: ${id}) to client...`);
    res.status(200).json(link);
  });
});

// Create
router.post("/", [reviewValidation], (req, res, next) => {
  const { variant, url } = req.body;
  logger.debug("getting last link id or 0");
  Link.find({})
    .sort({ id: -1 })
    .limit(1)
    .then(result => {
      const lastLink = result[0];
      let id = 0;
      if (lastLink) {
        id = lastLink.id + 1;
      }
      logger.debug("attempt to create a link");
      Link.create({ id, variant, url }, (err, link) => {
        if (err) {
          logger.error("cound not create a link document:\n" + err);
          return res.status(500).json(null);
        }
        logger.debug("sending the new link id to client...");
        res.status(200).json({ id: link.id });
      });
    });
});

// Update one
router.put("/:id", [validateId, reviewValidation], (req, res, next) => {
  const { id } = req.params;
  const { variant, url } = req.body;
  logger.debug(`attempt to update a link (id: ${id})`);
  Link.findOneAndUpdate(
    { id },
    { $set: { id, variant, url } },
    async (err, link) => {
      if (err) {
        logger.error(err);
        return res.status(500).json(null);
      }
      if (!link) {
        logger.debug(`link (id: ${id}) nof found`);
        return res.status(400).json(null);
      }
      logger.debug(`sending the updated link (id: ${id}) to client`);
      res.status(200).json({ id: link.id });
    }
  );
});

// Delete one
router.delete(
  "/:id",
  [validateId, reviewValidation],
  async (req, res, next) => {
    const { id } = req.params;
    logger.debug(`link (id: ${id}) deletion attempt`);
    Link.findOneAndDelete({ id }, async (err, link) => {
      if (err) {
        logger.error(err);
        return res.status(500).json(null);
      }
      if (!link) {
        logger.debug(`link (id: ${id}) not found`);
        return res.status(400).json(null);
      }
      logger.debug(`link (id: ${id}) deleted`);
      await Link.bulkWrite([
        {
          updateMany: {
            filter: { id: { $gte: id } },
            update: { $inc: { id: -1 } }
          }
        }
      ]);
      logger.debug(`all link ids bigger than ${id} has been decremented by 1`);
      res.status(200).json({ id: link.id });
    });
  }
);

module.exports = router;
