require('dotenv').config();

module.exports = {
  dbUsername: process.env.DB_USERNAME,
  dbPasword: process.env.DB_PASSWORD,
  dbDevEnv: process.env.DB_CONNECTION_DEV,
  dbTestEnv: process.env.DB_CONNECTION_TEST,
  secretKey: process.env.secretKey,
  cloudinaryCloudName: process.env.cloudinary_name,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudinaryApiEnvVar: process.env.CLOUDINARY_API_ENV_VAR,
  jwtExpirationInterval: process.env.jwtExpirationInterval,
};