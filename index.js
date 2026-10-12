require('dotenv').config();
require("./initialise");

const { WEB_SERVER } = require("./config.js");

if (WEB_SERVER) require("./bot/server");
