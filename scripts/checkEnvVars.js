const { readFile } = require("fs");
const chalk = require("chalk");
const path = require("path");

const validateFile = file =>
  new Promise((resolve, reject) => {
    readFile(file, (err, content) => {
      if (err)
        throw new Error(
          chalk.whiteBright.bgRed.bold(`Cannot read the file ${file}`)
        );

      const regex = new RegExp("REACT_APP_API_URL=*");
      if (!regex.test(content))
        throw new Error(
          chalk.whiteBright.bgRed.bold(`Wrong content in the file ${file}`)
        );

      resolve();
    });
  });

(async () => {
  const projectRoot = path.join(__dirname, "..");
  await validateFile(`${projectRoot}/client/.env`);
  await validateFile(`${projectRoot}/admin/.env`);
  console.log("client and admin .env files are ok :)");
})();
