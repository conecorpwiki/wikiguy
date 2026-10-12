const { BOT_NAME } = require("../config.js");

let discordBotName;

function getBotName() {
    return BOT_NAME || discordBotName || "Discord bot";
}

function setDiscordBotName(name) {
    if (!BOT_NAME && name) discordBotName = name;
}

module.exports = { getBotName, setDiscordBotName };
