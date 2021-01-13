require("dotenv").config();
const { dbUsername, dbPassword, dbDevEnv, dbTestEnv } = require('../../config/vars');

module.exports = {
  development: {
    username: dbUsername,
    password: dbPassword,
    database: "img-repo-dev",
    use_env_variables: dbDevEnv,
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: dbUsername,
    password: dbPassword,
    database: "img-repo-test",
    use_env_variables: dbTestEnv,
    dialect: "postgres",
    logging: false,
  },
  production: {
    use_env_variable: DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  },
};
