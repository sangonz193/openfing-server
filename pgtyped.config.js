require("dotenv").config()
require("./cli/_utils/registerBabel")
const { pgtypedConfig } = require("./src/database/pgtyped.config")

module.exports = pgtypedConfig
