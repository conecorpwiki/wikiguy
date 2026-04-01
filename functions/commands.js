const { WIKIS } = require("../config.js");
const {
    UTG_CATEGORIES,
    UFG_CATEGORIES
} = require("./speedrun.js");

const wikiChoices = Object.entries(WIKIS).map(([key, wiki]) => ({
    name: wiki.name,
    value: key
}));

const commands = [
    {
        name: 'lbspeedrun',
        description: 'View speedrun leaderboards',
        integrationTypes: [0, 1],
        contexts: [0, 1, 2],
        options: [
            {
                name: 'utg',
                description: 'untitled tag game\'s speedrun leaderboard',
                type: 1, // SUB_COMMAND
                options: [
                    {
                        name: 'category',
                        description: 'The category to view',
                        type: 3, // STRING
                        required: true,
                        choices: UTG_CATEGORIES
                    }
                ]
            },
            {
                name: 'ufg',
                description: 'untitled farming game\'s speedrun leaderboard',
                type: 1, // SUB_COMMAND
                options: [
                    {
                        name: 'category',
                        description: 'The category to view',
                        type: 3, // STRING
                        required: true,
                        choices: UFG_CATEGORIES
                    }
                ]
            }
        ]
    },
    {
        name: 'lbwiki',
        description: 'View wiki leaderboards',
        integrationTypes: [0, 1],
        contexts: [0, 1, 2],
        options: [
            {
                name: 'contribs',
                description: 'Get contribution scores for a wiki',
                type: 1, // SUB_COMMAND
                options: [
                    {
                        name: 'wiki',
                        description: 'Select a wiki',
                        type: 3, // STRING
                        required: true,
                        choices: wikiChoices
                    }
                ]
            }
        ]
    },
    {
        name: 'wiki',
        description: 'Get a link to a wiki',
        integrationTypes: [0, 1],
        contexts: [0, 1, 2],
        options: [
            {
                name: 'wiki',
                description: 'The wiki to link to',
                type: 3, // STRING
                required: true,
                choices: wikiChoices
            }
        ]
    },
    {
        name: 'parse',
        description: 'Search for a page or file on a wiki',
        integrationTypes: [0, 1],
        contexts: [0, 1, 2],
        options: [
            {
                name: 'page',
                description: 'Search for a wiki page',
                type: 1, // SUB_COMMAND
                options: [
                    {
                        name: 'wiki',
                        description: 'The wiki to search in',
                        type: 3, // STRING
                        required: true,
                        choices: wikiChoices
                    },
                    {
                        name: 'page',
                        description: 'The page to search for',
                        type: 3, // STRING
                        required: true,
                        autocomplete: true
                    }
                ]
            },
            {
                name: 'file',
                description: 'Search for a wiki file',
                type: 1, // SUB_COMMAND
                options: [
                    {
                        name: 'wiki',
                        description: 'The wiki to search in',
                        type: 3, // STRING
                        required: true,
                        choices: wikiChoices
                    },
                    {
                        name: 'file',
                        description: 'The file to search for',
                        type: 3, // STRING
                        required: true,
                        autocomplete: true
                    }
                ]
            }
        ]
    }
];

module.exports = {
    commands
};
