const path = require("path");
const rimraf = require("rimraf");
const mongoose = require("mongoose");
const readline = require("readline");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const IMGS_LOCAL = process.env.PERSONAL_WEBSITE_IMGS_LOCAL;
const MONGO_URL = process.env.PERSONAL_WEBSITE_MONGO_URL;

const checkMark = "\u2713";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const yesNoQuestion = ({ question, onSuccess, onFailure }) =>
  new Promise((resolve, reject) => {
    const ask = () => {
      rl.question(`${question} [Y/n]: `, answer => {
        const answerLower = answer.toLowerCase();
        if (answerLower === "y") {
          resolve(onSuccess ? onSuccess() : null);
        } else if (answerLower === "n") {
          resolve(onFailure ? onFailure() : null);
        } else {
          ask();
        }
      });
    };
    ask();
  });

const specificValueQuestion = ({ value, question, onSuccess }) =>
  new Promise((resolve, reject) => {
    const ask = () => {
      rl.question(`${question}: `, answer => {
        const match = answer === value;
        if (match) resolve(onSuccess ? onSuccess() : null);
        ask();
      });
    };
    ask();
  });

const deleteImgsDir = () =>
  new Promise((resolve, reject) => {
    rimraf(IMGS_LOCAL, err => {
      if (err) {
        resolve(
          console.log(
            `An error occured while removing the directory '${IMGS_LOCAL}':\n${err}`
          )
        );
      } else {
        resolve(console.log(`${checkMark} 1/2 Image directory removed.`));
      }
    });
  });

const connectToDb = () =>
  new Promise((resolve, reject) => {
    mongoose
      .connect(MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      })
      .then(() => resolve())
      .catch(err => {
        console.log(
          `Couldn't connect to the MongoDB database '${dbUri}':\n${err}`
        );
      });
  });

const dropDatabase = dbName =>
  new Promise((resolve, reject) => {
    mongoose.connection.db.dropDatabase();
    console.log(`${checkMark} 2/2 '${dbName}' database dropped.`);
    resolve();
  });

const startQuestions = async () => {
  await yesNoQuestion({
    question: "Are you sure you want to proceed to data clearing?"
  });
  await yesNoQuestion({
    question: `Are you sure you want to delete directory '${IMGS_LOCAL}'`
  });
  await deleteImgsDir();
  await connectToDb();
  const dbName = MONGO_URL.split("/").at(-1);
  await specificValueQuestion({
    question: `Are you absolutely sure you want to drop '${dbName}' DB?\nEnter the DB name '${dbName}'`,
    value: dbName
  });
  console.log(`Mongoose connection: ${mongoose.connection.toString()}`);
  await dropDatabase(dbName);
  rl.close();
  process.exit(1);
};

startQuestions();
