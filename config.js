// --- WIKI CONFIGURATION ---
const BOT_NAME = "Derik"; 

const WIKIS = {
    "untitled-tag-game": {
        name: "untitled tag game",
        baseUrl: "https://tagging.wiki",
        apiEndpoint: "https://tagging.wiki/w/api.php",
        articlePath: "https://tagging.wiki/",
        prefix: "utg",
        emoji: "1488793151027155017"
    },
    "untitled-farming-game": {
        name: "untitled farming game",
        baseUrl: "https://farm.miraheze.org",
        apiEndpoint: "https://farm.miraheze.org/w/api.php",
        articlePath: "https://farm.miraheze.org/",
        prefix: "ufg",
        emoji: "1488793250163593226"
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
    { type: 4, text: "use [[utg:Page]] for untitled tag game embedding" },
    { type: 4, text: "use [[ufg:Page]] for untitled farming game embedding" },
    { type: 4, text: "tagging.wiki" },
    { type: 4, text: "farm.miraheze.org" },
    { type: 0, text: "untitled tag game" },
    { type: 0, text: "untitled farming game" },
    { type: 5, text: "untitled tag game" },
    { type: 5, text: "untitled farming game" },
    { type: 4, text: "edit your message and my embed will too!" },
    { type: 4, text: "react with :wastebasket: on my messages & i'll delete!" },

    { type: 4, text: "Yeah heres a \"Fun fact\" for you. shut up." },
    { type: 4, text: "Hi" },
    { type: 4, text: "ashkdjhafhakfh askkj fkfh jka hskfh ka hjkashf kashfjsf kahskjfhajks" },
    { type: 4, text: "Theres an extra .02 to my height, let that sink in" },
    { type: 4, text: "I have a contribution score of 0.01, beat that nerds" },
    { type: 4, text: "Hes optimus lime, LOL" },
    { type: 4, text: "ÒwÓ" },
    { type: 4, text: "Did you know: MARKIPLIER IS IN THIS GAME RIGHT NOW!" },
    { type: 4, text: "Fact: not only did utg copy evade. They also copied gorilla tag" },
    { type: 4, text: "Fact: utg copied evade entirely" },
    { type: 4, text: "The pit is waiting for you" },
    { type: 4, text: "Did you know: There are things called runners. GO FOR THEM!" },
    { type: 4, text: "Yeah I have a #submission. a bomb role at your doorstep" },
];

module.exports = {
    BOT_NAME,
    WIKIS,
    CATEGORY_WIKI_MAP,
    toggleContribScore,
    STATUS_INTERVAL_MS,
    STATUS_OPTIONS
};
