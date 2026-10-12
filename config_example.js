// Copy this file to config.js and replace the example values.
// --- WIKI CONFIGURATION ---
const BOT_NAME = "";

const WIKIS = {
    "example-wiki": {
        name: "Example Wiki",
        baseUrl: "https://example.com",
        apiEndpoint: "https://example.com/w/api.php",
        articlePath: "https://example.com/",
        prefix: "example",
        default: true
    }
};

// optional: map channel or category IDs to a wiki.
const WIKI_MAP = undefined;

// Enable or disable slash commands. Disabled commands are not registered with Discord.
const COMMANDS = {
    speedrun: true,
    contribs: true,
    wiki: true,
    parse: true,
    user: true,
    random: true,
};
const EMOJIS = {
    speedrun: "",
    contribs: ""
};
const WEB_SERVER = true;
const STATUS_INTERVAL_MS = 5 * 60 * 1000;
const PAGE_CACHE_MS = 30 * 60 * 1000;

// --- DISCORD STATUSES ---
const STATUS_OPTIONS = [
    { type: 4, text: "your wiki" },
];

module.exports = {
    BOT_NAME,
    WIKIS,
    WIKI_MAP: typeof WIKI_MAP !== "undefined" ? WIKI_MAP : undefined,
    COMMANDS,
    EMOJIS,
    WEB_SERVER,
    STATUS_INTERVAL_MS,
    PAGE_CACHE_MS,
    STATUS_OPTIONS
};
