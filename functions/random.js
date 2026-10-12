const { fetch } = require("./utils.js");
const { getBotName } = require("../bot/name.js");

async function getRandomPage(wikiConfig) {
    const params = new URLSearchParams({ action: "query", format: "json", list: "random", rnnamespace: "0", rnlimit: "1" });
    try {
        const res = await fetch(`${wikiConfig.apiEndpoint}?${params.toString()}`, { headers: { "User-Agent": `${getBotName()} Discord bot` } });
        if (!res.ok) return null;
        return (await res.json()).query?.random?.[0]?.title || null;
    } catch (err) {
        console.warn("getRandomPage failed:", err.message);
        return null;
    }
}

module.exports = { getRandomPage };
