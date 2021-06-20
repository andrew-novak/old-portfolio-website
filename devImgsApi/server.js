const express = require("express");
const path = require("path");
const { existsSync, mkdirSync } = require("fs");

const app = express();
const PORT = 3003;

const imagesDir = path.join(__dirname, "images");

if (!existsSync(imagesDir)) {
  mkdirSync(imagesDir);
}

app.use(express.static(imagesDir));

app.listen(PORT, () => console.log(`dev imgs api started on port: ${PORT}`));
