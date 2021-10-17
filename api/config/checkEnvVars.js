const envKeys = [
  "PERSONAL_WEBSITE_MONGO_URL",
  "PERSONAL_WEBSITE_API_PORT",
  "PERSONAL_WEBSITE_JWT_SECRET",
  "PERSONAL_WEBSITE_IMGS_LOCAL",
  "PERSONAL_WEBSITE_IMGS_ACCESS"
];

const checkEnvVars = () => {
  for (envKey of envKeys) {
    if (!process.env.hasOwnProperty(envKey)) {
      throw new Error(`Environemnt variable ${envKey} not found.`);
    }
  }
};

module.exports = checkEnvVars;
