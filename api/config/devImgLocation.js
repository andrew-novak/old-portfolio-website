const { tmpdir } = require("os");
const { join } = require("path");
const { existsSync, mkdirSync } = require("fs");
const { static } = require("express");
const serveIndex = require("serve-index");

const IMGS_ACCESS = process.env.PERSONAL_WEBSITE_IMGS_ACCESS;
const IMGS_LOCAL = process.env.PERSONAL_WEBSITE_IMGS_LOCAL;
const logger = require("./logger");

const devImgLocation = app => {
  if (!existsSync(IMGS_LOCAL)) {
    mkdirSync(IMGS_LOCAL);
  }

  logger.info(`serving images in development mode at: ${IMGS_LOCAL}`);
  app.use(IMGS_ACCESS, static(IMGS_LOCAL), serveIndex(IMGS_LOCAL));
};

module.exports = devImgLocation;
