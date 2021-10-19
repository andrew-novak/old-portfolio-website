const { join } = require("path");
const fs = require("fs");
const { access, mkdir } = fs.promises;
const { F_OK } = fs.constants;

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PERSONAL_WEBSITE_API_PORT;
const IMGS_LOCAL = process.env.PERSONAL_WEBSITE_IMGS_LOCAL;
const IMGS_ACCESS = process.env.PERSONAL_WEBSITE_IMGS_ACCESS;
const logger = require("../../config/logger");

const genImgPathGetters = group => {
  const imgsAccessUrl =
    NODE_ENV === "development"
      ? `http://localhost:${PORT}${IMGS_ACCESS}`
      : IMGS_ACCESS;

  return {
    groupImages: join(IMGS_LOCAL, group),
    itemImages: unique => join(IMGS_LOCAL, group, unique),
    itemImage: (unique, filename, extension) =>
      join(IMGS_LOCAL, group, unique, `${filename}.${extension}`),
    itemImageUrl: (unique, filename, extension) =>
      `${imgsAccessUrl}/${group}/${unique}/${filename}.${extension}`
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
