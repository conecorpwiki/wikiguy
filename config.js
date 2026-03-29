// --- WIKI CONFIGURATION ---
const BOT_NAME = "Derik"; 

const WIKIS = {
    "untitled-tag-game": {
        name: "Untitled Tag Game",
        baseUrl: "https://tagging.wiki",
        apiEndpoint: "https://tagging.wiki/w/api.php",
        articlePath: "https://tagging.wiki/",
        prefix: "utg",
        emoji: "1477539484601028662"
    },
    "untitled-farming-game": {
        name: "untitled farming game",
        baseUrl: "https://farm.miraheze.org",
        apiEndpoint: "https://farm.miraheze.org/w/api.php",
        articlePath: "https://farm.miraheze.org/",
        prefix: "ufg",
        emoji: "1477539596509118566"
    }
};

const CATEGORY_WIKI_MAP = {
    "1335895166292332585": "untitled-farming-game"
};

const toggleContribScore = true;
const STATUS_INTERVAL_MS = 5 * 60 * 1000;

// --- DISCORD STATUSES ---
const STATUS_OPTIONS = [
    { type: 4, text: "just send [[a page]] or {{a page}}!" },
    { type: 4, text: "now supporting 2 wikis!" },
    { type: 4, text: "use [[utg:page]] for Untitled Tag Game embedding" },
    { type: 4, text: "use [[ufg:Page]] for Untitled Farming Game embedding" },
    { type: 4, text: "tagging.wiki" },
    { type: 4, text: "farm.miraheze.org" },
    { type: 0, text: "untitled tag game" },
    { type: 0, text: "untitled farming game" },
    { type: 5, text: "untitled tag game" },
    { type: 5, text: "untitled farming game" },
    { type: 4, text: "edit your message and my embed will too!" },
    { type: 4, text: "react with :wastebasket: on my messages & i'll delete!" },
];

module.exports = {
    BOT_NAME,
    WIKIS,
    CATEGORY_WIKI_MAP,
    toggleContribScore,
    STATUS_INTERVAL_MS,
    STATUS_OPTIONS
};
