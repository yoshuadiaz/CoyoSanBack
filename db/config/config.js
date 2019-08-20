require("dotenv").config();
module.exports = {
  development: {
    dialect: process.env.DEV_DATABASE_DIALECT,
    host: process.env.DEV_DATABASE_HOST,
    username: process.env.DEV_DATABASE_USER,
    password: process.env.DEV_DATABASE_PASSWORD,
    database: process.env.DEV_DATABASE_DATABASE,
    logging: process.env.DEV_DATABASE_LOGGING !== "false" ? console.log : false,
    storage: process.env.DEV_DATABASE_STORAGE
  },
  test: {
    dialect: process.env.TEST_DATABASE_DIALECT,
    host: process.env.TEST_DATABASE_HOST,
    username: process.env.TEST_DATABASE_USER,
    password: process.env.TEST_DATABASE_PASSWORD,
    database: process.env.TEST_DATABASE_DATABASE
  },
  production: {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE
  }
};
