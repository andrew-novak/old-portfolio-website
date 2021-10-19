const express = require("express");
const path = require("path");
const { query } = require("express-validator");
const mongoose = require("mongoose");
const fs = require("fs");
const { writeFile } = fs.promises;
const rimraf = require("rimraf");

const { Segment } = require("../../models/Segment");
const logger = require("../../config/logger");
const {
  validateRange,
  validateId,
  validateImage64Optional,
  validateHeaderText,
  reviewValidation
} = require("./validation");
const { genImgPathGetters, createDirIfNone } = require("./shared");

const router = express.Router();
const { groupImages, itemImages, itemImage, itemImageUrl } = genImgPathGetters(
  "segments"
);

// Get many
router.get("/", [validateRange, reviewValidation], (req, res, next) => {
  const { range } = req.query;
  const [start, end] = range.replace(/[\[\]']+/g, "").split(",");
  Segment.find({ id: { $gte: start, $lte: end } })
    .sort({ id: -1 })
    .exec((err, segments) => {
      if (err) {
        logger.error(err);
        return res.status(400).json(null);
      }
      Segment.countDocuments().exec((err, total) => {
        if (err) {
          logger.error(err);
          return res.json({ err });
        }
        logger.debug("segments in the range: " + total);
        res.header("Access-Control-Expose-Headers", "Content-Range");
        res.header("Content-Range", `segments ${start}-${end}/${total}`);
        logger.debug("sending segments...");
        res.status(200).json([...segments]);
      });
    });
});

// Get one
router.get("/:id", [validateId, reviewValidation], (req, res, next) => {
  const { id } = req.params;
  const logId = `(id: ${id})`;
  Segment.findOne({ id }).exec((err, segment) => {
    if (err) {
      logger.error(err);
      return res.status(500).json(null);
    }
    if (!segment) {
      logger.debug(`segment ${logId} not found`);
      return res.status(400).json(null);
    }
    logger.debug(`sending segment ${logId} to client...`);
    res.status(200).json(segment);
  });
});

// Create
router.post(
  "/",
  [validateImage64Optional, ...validateHeaderText, reviewValidation],
  (req, res, next) => {
    const { image64, header, text } = req.body;
    logger.debug("getting last segment id or 0");
    Segment.find({})
      .limit(1)
      .then(result => {
        const lastSegment = result[0];
        let id = 0;
        if (lastSegment) {
          id = lastSegment.id + 1;
        }
        const logId = `(${id} "${header}")`;
        logger.debug(`attempt to create a segment ${logId}`);
        Segment.create(
          {
            id,
            image64,
            header,
            text
          },
          async (err, segment) => {
            const { _id } = segment;
            if (err) {
              logger.error(`could not create a segment ${logId}:\n${err}`);
              return res.status(500).json(null);
            }

            const dir = itemImages(_id.toString());
            await createDirIfNone(groupImages, res);
            logger.debug(`creating an image directory ${logId}`);
            fs.mkdir(dir, async err => {
              if (err) {
                logger.error(
                  `error during a directory creation (fs.mkdir):\n${err}`
                );
                logger.debug(
                  `deleting newly creted segment document ${logId} due to the error`
                );
                return Segment.findByIdAndDelete({ _id }, err => {
                  if (err) logger.error(err);
                  res.status(500).json(null);
                });
              }

              if (image64) {
                const imgPath = itemImage(_id.toString(), "original", "png");
                logger.debug(`saving segment image ${logId}`);
                try {
                  await writeFile(imgPath, image64, "base64");
                } catch (err) {
                  logger.error(err);
                  logger.debug(
                    `deleting newly created segment document & directory ${logId} due to the error`
                  );
                  return Segment.findByIdAndDelete({ _id }, err => {
                    if (err) logger.error(err);
                    rimraf(dir, err => {
                      logger.error(err);
                      res.status(500).json(null);
                    });
                  });
                }
                logger.debug(`adding image url to segment ${logId}`);
                const imageUrl = itemImageUrl(
                  _id.toString(),
                  "original",
                  "png"
                );
                Segment.findByIdAndUpdate({ _id }, { imageUrl }, err => {
                  if (err) {
                    logger.error(err);
                    return res.status(500).json(null);
                  }
                  logger.debug(`sending new segment ${logId} to client...`);
                  res.status(200).json({ id });
                });
              }
            });
          }
        );
      });
  }
);

// Update one
router.put(
  "/:id",
  [
    validateId,
    validateImage64Optional,
    ...validateHeaderText,
    reviewValidation
  ],
  (req, res, next) => {
    const { id } = req.params;
    const { image64, header, text } = req.body;
    const logId = `(${id} "${header}")`;
    logger.debug(`finding segment ${logId}`);
    Segment.findOne({ id }, async (err, segment) => {
      const { _id } = segment;
      if (err) {
        logger.error(err);
        return res.status(500).json(null);
      }
      if (!segment) {
        logger.debug(`segment ${logId} not found`);
        return res.status(400).json(null);
      }

      let imageUrl;
      if (image64) {
        imageUrl = itemImageUrl(_id.toString(), "original", "png");
        const imgPath = itemImage(_id.toString(), "original", "png");
        logger.debug(`replacing image for segment ${logId}`);
        await writeFile(imgPath, image64, "base64", err => {
          if (err) {
            logger.error(err);
            return res.status(400).json(null);
          }
        });
      }

      logger.debug(`updating segment document ${logId}`);
      Segment.findOneAndUpdate(
        { id },
        {
          $set: {
            ...(imageUrl ? imageUrl : null),
            header,
            text
          }
        },
        (err, segment) => {
          if (err) {
            logger.error(err);
            return res.status(500).json(null);
          }
          if (!segment) return res.status(400).json(null);
          logger.debug(`sending updated segment ${logId} to client...`);
          res.status(200).json({ id });
        }
      );
    });
  }
);

// Delete one
router.delete(
  "/:id",
  [validateId, reviewValidation],
  async (req, res, next) => {
    const { id } = req.params;
    const logId = `(id': ${id})`;
    logger.debug(`segment ${logId} deletion attempt`);
    Segment.findOneAndDelete({ id }, (err, segment) => {
      const { _id } = segment;
      if (err) {
        logger.error(err);
        return res.status(500).json(null);
      }
      if (!segment) {
        logger.debug(`segment document ${logId} not found`);
        return res.status(400).json(null);
      }
      logger.debug(
        `segment document ${logId} deleted, removing image directory...`
      );
      const dir = itemImages(_id.toString());
      rimraf(dir, async err => {
        if (err) {
          logger.error(err);
          return res.status(500).json(null);
        }
        logger.debug(
          `whole segment ${logId} deleted, moving ids in latter segments...`
        );
        await Segment.bulkWrite([
          {
            updateMany: {
              filter: { id: { $gte: id } },
              update: { $inc: { id: -1 } }
            }
          }
        ]);
        logger.debug(`all ids bigger than ${id} has been decremented by 1`);
        res.status(200).json({ id });
      });
    });
  }
);

module.exports = router;
