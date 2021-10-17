const { createLogger, format, transports } = require("winston");
const { colorize, combine, timestamp, simple, printf } = format;
const { Console } = transports;

const colorizer = colorize();

const logger = createLogger({
  level: "silly",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    printf(({ timestamp, label, level, message }) =>
      colorizer.colorize(level, `[${timestamp}] [${level}] ${message}`)
    )
  ),
  transports: [new Console()]
});

module.exports = logger;
