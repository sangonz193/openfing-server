require("dotenv").config();
require("./cli/_utils/registerBabel");

module.exports = require("./src/appConfig").appConfig.dbConnectionOptions;
