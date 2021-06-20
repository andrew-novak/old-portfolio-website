const express = require("express");
const { query } = require("express-validator");
const mongoose = require("mongoose");
const fs = require("fs");
const { writeFile } = fs.promises;
const path = require("path");
const rimraf = require("rimraf");

const { Project } = require("../../models/Project");
const logger = require("../../logger");
const {
  validateRange,
  validateId,
  validateImage64,
  validateImage64Optional,
  validateImage64Extra,
  sharedProjectValidation,
  reviewValidation
} = require("./validation");
const { genImgPathGetters, createDirIfNone } = require("./shared");

const router = express.Router();
const { groupImages, itemImages, itemImage, itemImageUrl } = genImgPathGetters(
  "projects"
);
const filterLinks = links => links.map(({ text, url }) => ({ text, url }));

// Get many
router.get("/", [validateRange, reviewValidation], (req, res, next) => {
  const { range } = req.query;
  const [start, end] = range.replace(/[\[\]']+/g, "").split(",");
  Project.find({ id: { $gte: start, $lte: end } })
    .sort({ id: -1 })
    .exec((err, projects) => {
      if (err) {
        logger.error(err);
        return res.status(400).json(null);
      }
      Project.countDocuments().exec((err, total) => {
        if (err) {
          logger.error(err);
          return res.json({ err });
        }
        logger.debug("projects in the range: " + total);
        res.header("Access-Control-Expose-Headers", "Content-Range");
        res.header("Content-Range", `projects ${start}-${end}/${total}`);
        logger.debug("sending projects...");
        res.status(200).json([...projects]);
      });
    });
});

// Get one
router.get("/:id", [validateId, reviewValidation], (req, res, next) => {
  const { id } = req.params;
  Project.findOne({ id }).exec((err, project) => {
    if (err) {
      logger.error(err);
      return res.status(500).json(null);
    }
    if (!project) {
      logger.debug("project not found");
      return res.status(400).json(null);
    }
    logger.debug("sending to client...");
    res.status(200).json(project);
  });
});

// Create
router.post(
  "/",
  [
    validateImage64,
    validateImage64Extra,
    ...sharedProjectValidation,
    reviewValidation
  ],
  (req, res, next) => {
    const {
      image64,
      image64Extra,
      title,
      shortDescription,
      fullDescription,
      links
    } = req.body;
    logger.debug("getting last project id or 0");
    Project.find({})
      .sort({ id: -1 })
      .limit(1)
      .then(result => {
        const lastProject = result[0];
        let id = 0;
        if (lastProject) {
          id = lastProject.id + 1;
        }
        const logInfo = `(${id} ${title})`;
        logger.debug(`attempt to create a project ${logInfo}`);
        const filteredLinks = links ? filterLinks(links) : null;
        Project.create(
          {
            id,
            title,
            shortDescription,
            fullDescription,
            links: filteredLinks ? filteredLinks : []
          },
          async (err, project) => {
            const { _id } = project;
            if (err) {
              logger.error(
                `could not create a project document ${logInfo}:\n${err}`
              );
              return res.status(500).json(null);
            }

            await createDirIfNone(groupImages, res);
            const dir = itemImages(_id.toString());
            logger.debug(`creating image directory "${dir}"`);
            fs.mkdir(dir, async err => {
              if (err) {
                logger.error(
                  `error during a directory creation (fs.mkdir):\n${err}`
                );
                logger.debug(
                  `deleting newly created project document ${logInfo}`
                );
                return Project.findByIdAndDelete({ _id }, err => {
                  if (err) logger.error(err);
                  res.status(500).json(null);
                });
              }

              logger.debug(`saving project images ${logInfo}`);
              try {
                const imgPath = itemImage(_id.toString(), "main");
                await writeFile(imgPath, image64, "base64");
                if (image64Extra) {
                  const imgPathExtra = itemImage(_id.toString(), "extra");
                  await writeFile(imgPathExtra, image64Extra, "base64");
                }
              } catch (err) {
                logger.error(`error during project images save:\n${err}`);
                logger.debug(
                  `deleting newly created document & directory ${logInfo}`
                );
                return Project.findByIdAndDelete({ _id }, err => {
                  if (err) logger.error(err);
                  rimraf(dir, err => {
                    logger.error(err);
                    res.status(500).json(null);
                  });
                });
              }

              const imageUrl = itemImageUrl(_id.toString(), "main");
              const imageUrlExtra = image64Extra
                ? itemImageUrl(_id.toString(), "extra")
                : null;

              logger.debug(`adding image urls to project ${logInfo}`);
              Project.findByIdAndUpdate(
                { _id },
                { imageUrl, ...(imageUrlExtra ? { imageUrlExtra } : null) },
                err => {
                  if (err) {
                    logger.error(err);
                    return res.status(500).json(null);
                  }
                  logger.debug(
                    `sending new project id ${logInfo} to client...`
                  );
                  res.status(200).json({ id });
                }
              );
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
    validateImage64Extra,
    ...sharedProjectValidation,
    reviewValidation
  ],
  (req, res, next) => {
    const { id } = req.params;
    const {
      image64,
      image64Extra,
      title,
      shortDescription,
      fullDescription,
      links
    } = req.body;
    const logInfo = `(${id} ${title})`;
    logger.debug(`finding project ${logInfo}`);
    Project.findOne({ id }, async (err, project) => {
      const { _id } = project;

      if (err) {
        logger.error(err);
        return res.status(500).json(null);
      }
      if (!project) {
        logger.debug(`project ${logInfo} nof found`);
        return res.status(400).json(null);
      }

      let imageUrl;
      if (image64) {
        imageUrl = itemImageUrl(_id.toString(), "main");
        const img = itemImage(_id.toString(), "main");
        logger.debug(`replacing project main image ${logInfo}`);
        await writeFile(img, image64, "base64", err => {
          if (err) {
            logger.error(err);
            return res.status(400).json(null);
          }
        });
      }

      let imageUrlExtra;
      if (image64Extra) {
        imageUrlExtra = itemImageUrl(_id.toString(), "extra");
        const imgExtra = itemImage(_id.toString(), "extra");
        logger.debug(`replacing project extra image ${logInfo}`);
        await writeFile(imgExtra, image64Extra, "base64", err => {
          if (err) {
            logger.error(err);
            return res.status(400).json(null);
          }
        });
      }

      const filteredLinks = links ? filterLinks(links) : null;

      logger.debug(`updating the project document (id: ${id})`);
      Project.findOneAndUpdate(
        { id },
        {
          $set: {
            title,
            shortDescription,
            fullDescription,
            ...(imageUrl ? { imageUrl } : null),
            ...(imageUrlExtra ? { imageUrlExtra } : null),
            links: filteredLinks ? filteredLinks : []
          }
        },
        (err, project) => {
          if (err) {
            logger.error(err);
            return res.status(500).json(null);
          }
          if (!project) return res.status(400).json(null);
          logger.debug(`sending updated project ${logInfo} to client...`);
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
    const logInfo = `(${id})`;
    logger.debug(`project ${logInfo} deletion attempt`);
    Project.findOneAndDelete({ id }, (err, project) => {
      const { _id } = project;
      if (err) {
        logger.error(err);
        return res.status(500).json(null);
      }
      if (!project) {
        logger.debug("document not found");
        return res.status(400).json(null);
      }
      logger.debug(
        `project document ${logInfo} deleted, removing image directory...`
      );
      const dir = itemImages(_id.toString());
      rimraf(dir, async err => {
        if (err) {
          logger.error(err);
          return res.status(500).json(null);
        }
        logger.debug(
          `whole project ${logInfo} deleted, moving ids in latter projects...`
        );
        await Project.bulkWrite([
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
