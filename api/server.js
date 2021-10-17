require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

const checkEnvVars = require("./config/checkEnvVars");
const logger = require("./config/logger");
const devImgLocation = require("./config/devImgLocation");
const configPassport = require("./config/passport");

const rootRouter = require("./routes");

checkEnvVars();
const NODE_ENV = process.env.NODE_ENV;
const MONGO_URL = process.env.PERSONAL_WEBSITE_MONGO_URL;
const ROOT_ROUTE = process.env.PERSONAL_WEBSITE_API_ROOT_ROUTE;
const PORT = process.env.PERSONAL_WEBSITE_API_PORT;
const app = express();

app.use(cors());

app.use(express.json({ limit: "10mb" }));

if (NODE_ENV === "development") {
  devImgLocation(app);
}

/*
Object.keys(process.env)
  .sort()
  .forEach((v, i) => {
    console.log(v, process.env[v]);
  });
*/

configPassport(passport);
app.use(passport.initialize());

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => logger.info(`connected to the MongoDB ${MONGO_URL}`))
  .catch(err =>
    logger.error("error occurred during connecting to MongoDB:\n" + err)
  );

app.use((req, res, next) => {
  logger.debug(`got request: ${req.method} ${req.url}`);
  next();
});

app.use(ROOT_ROUTE, rootRouter);

app.listen(PORT, () => logger.info(`server started on port: ${PORT}`));
