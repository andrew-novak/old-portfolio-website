const { join } = require("path");
const fs = require("fs");
const { access, mkdir } = fs.promises;
const { F_OK } = fs.constants;

const IMGS_LOCAL = process.env.PERSONAL_WEBSITE_IMGS_LOCAL;
const IMGS_ACCESS = process.env.PERSONAL_WEBSITE_IMGS_ACCESS;
const logger = require("../../logger");

const genImgPathGetters = group => {
  const defaultFilename = "original.png";
  return {
    groupImages: join(IMGS_LOCAL, group),
    itemImages: unique => join(IMGS_LOCAL, group, unique),
    itemImage: (unique, customFilename) =>
      join(
        IMGS_LOCAL,
        group,
        unique,
        customFilename ? `${customFilename}.png` : defaultFilename
      ),
    itemImageUrl: (unique, customFilename) =>
      `${IMGS_ACCESS}/${group}/${unique}/${
        customFilename ? `${customFilename}.png` : defaultFilename
      }`
  };
};

const createDirIfNone = async (path, res) => {
  try {
    await access(path, F_OK);
  } catch (err) {
    logger.debug(`directory not found: "${path}"\ncreating one...`);
    try {
      await mkdir(path);
    } catch (err) {
      logger.error(`could not create a directory "${path}"\n${err}`);
      res.status(500).json(null);
    }
  }
};

module.exports = { genImgPathGetters, createDirIfNone };
