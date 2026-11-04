const { fetch } = require("./utils.js");
const { EMOJIS } = require("../config.js");
const { getBotName } = require("../bot/name.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

async function getContributionScores(wikiConfig, days = "7") {
    try {
        const params = new URLSearchParams({
            action: "parse",
            format: "json",
            text: `{{Special:ContributionScores/10/${days}}}`,
            prop: "text",
            disablelimitreport: "true"
        });

        const url = `${wikiConfig.apiEndpoint}?${params.toString()}`;
        const res = await fetch(url, { headers: { "User-Agent": `${getBotName()} Discord bot` } });
        const json = await res.json();
        const html = json.parse?.text?.["*"];

        if (!html) return {
            title: "Special:ContributionScores",
            result: "No content available."
        };

        // Basic Regex to pull the username and score from the HTML table
        const rows = html.split('<tr class="">');
        rows.shift(); // Remove header

        // MediaWiki Contribution Scores extension: 0 = all time
        // https://www.mediawiki.org/wiki/Extension:Contribution_Scores
        const periodLabel = days === "0" ? "all time" : `the past ${days} days`;

        let dataSummary = `## Edit leaderboard for [${wikiConfig.name}](${wikiConfig.articlePath}Special:ContributionScores)\n`;
        dataSummary += `-# Top 10 users over ${periodLabel}\n`;
        
        // Extract raw data into an array
        const userData = rows.map((row) => {
            const user = row.match(/<bdi>(.*?)<\/bdi>/)?.[1] || "Unknown";
            const stats = [...row.matchAll(/>([\d,]+)\s*<\/td>/g)];
            
            // grab the score (index 1) and edits (index 3)
            const score = stats[1] ? stats[1][1].replace(/,/g, '') : "0";
            const edits = stats[3] ? stats[3][1] : "0";
            
            return { user, score, edits };
        });
        
        // Find the character length of the highest number (e.g., "100" = 3)
        const maxScoreLength = Math.max(...userData.map(d => d.score.length), 1);
        const maxEditLength = Math.max(...userData.map(d => d.edits.length), 1);
        
        // Loop through the data and build the string with padding
        userData.forEach((data, i) => {
            const paddedScore = data.score.padStart(maxScoreLength, ' ');
            const paddedEdits = data.edits.padStart(maxEditLength, ' ');
            const usernamePath = encodeURIComponent(data.user.trim().replace(/\s+/g, "_"));
        
            const scoreEmoji = EMOJIS?.contribs ? `<:playerpoint:${EMOJIS.contribs}> ` : "";
            dataSummary += `${i + 1}. ${scoreEmoji}\`${paddedScore}\`    ✏️ \`${paddedEdits}\`    **[@${data.user}](${wikiConfig.articlePath}User:${usernamePath})**\n`;
        });

        if (!dataSummary) return {
            title: "Special:ContributionScores",
            result: "No content available."
        };

        return {
            title: "Special:ContributionScores",
            result: dataSummary
        };
    } catch (err) {
        console.error("Error fetching leaderboard:", err);
        return { error: "Failed to fetch leaderboard data." };
    }
}

async function handleContribScoresRequest(request, { toggleContribScore, WIKIS, buildPageEmbed, botToAuthorMap, pruneMap, MessageFlags, wikiConfig: requestedWikiConfig = null, category = "7" }) {
    if (!toggleContribScore) {
        await request.reply({ content: 'Contribution scores are currently disabled.', flags: MessageFlags.Ephemeral });
        return;
    }
    const isInteraction = typeof request.deferReply === 'function';
    const wikiKey = isInteraction
        ? request.options.getString('wiki') || (Object.keys(WIKIS).length === 1 ? Object.keys(WIKIS)[0] : null)
        : null;
    const wikiConfig = requestedWikiConfig || WIKIS[wikiKey];

    if (!wikiConfig) {
       await request.reply({ content: 'Unknown wiki selection.', flags: MessageFlags.Ephemeral });
       return;
    }

    try {
        if (isInteraction) {
            const ephemeral = request.options.getBoolean('ephemeral');
            await request.deferReply(ephemeral ? { flags: MessageFlags.Ephemeral } : {});
        }
        const result = await getContributionScores(wikiConfig, category);
        
        if (result.error) {
            if (isInteraction) return await request.editReply({ content: result.error });
            return await request.reply({ content: result.error });
        } else {
            const container = buildPageEmbed(result.title, result.result, null, wikiConfig);
            container.addActionRowComponents(new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("contribs:help")
                    .setLabel("What does this mean?")
                    .setStyle(ButtonStyle.Secondary)
            ));
            const payload = {
                components: [container],
                flags: MessageFlags.IsComponentsV2
            };
            const response = isInteraction
                ? await request.editReply(payload)
                : await request.reply(payload);
            if (response && response.id) {
                if (request.user?.id) {
                    botToAuthorMap.set(response.id, request.user.id);
                    pruneMap(botToAuthorMap);
                }
            }
            return response;
        }
    } catch (err) {
        console.error("Error in handleContribScoresRequest:", err);
        if (err?.code === 10062) {
            console.error("Failed to respond to contribution scores: interaction expired or was already acknowledged.");
            return;
        }
        try {
            if (isInteraction && (request.deferred || request.replied)) {
                await request.editReply({ content: "An error occurred while fetching contribution scores." });
            } else {
                await request.reply({ content: "An error occurred while fetching contribution scores.", flags: MessageFlags.Ephemeral });
            }
        } catch (secondaryErr) {
            console.error("Failed to send error reply:", secondaryErr);
        }
    }
}

module.exports = { getContributionScores, handleContribScoresRequest };

