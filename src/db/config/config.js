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
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
