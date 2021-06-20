const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const { writeFile } = fs.promises;

const apiUrl = process.argv[2];

if (apiUrl === undefined) {
  throw new Error(
    chalk.whiteBright.bgRed.bold("Pass the API URL as the 1st argument")
  );
}

const projectRoot = path.join(__dirname, "..");
const files = [`${projectRoot}/client/.env`, `${projectRoot}/admin/.env`];

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  fs.access(file, fs.F_OK, err => {
    if (!err)
      throw new Error(
        chalk.whiteBright.bgRed.bold(`The file ${file} already exists`)
      );
  });
}

const content = `REACT_APP_API_URL=${apiUrl}`;

for (let i = 0; i < files.length; i++) {
  writeFile(files[i], content);
}
