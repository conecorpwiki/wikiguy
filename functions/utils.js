let fetchInstance;
/**
 * Lazy-loading node-fetch wrapper.
 * Requires Node.js >= 17.3.0 for AbortSignal.timeout support in callers.
 */
const fetch = async (...args) => {
    if (!fetchInstance) {
        const module = await import("node-fetch");
        fetchInstance = module.default;
    }

    let [urlOrRequest, options = {}] = args;
    const newOptions = { ...options };

    // Add a default 10s timeout if no signal is explicitly provided in options.
    // This prevents hanging requests from leaking resources.
    if (AbortSignal.timeout && !newOptions.signal) {
        newOptions.signal = AbortSignal.timeout(10000);
    }

    return fetchInstance(urlOrRequest, newOptions);
};

/**
 * Truncates a markdown string to a certain number of paragraphs.
 * Paragraphs are assumed to be separated by double newlines (\n\n).
 * @param {string} text - The markdown text to truncate.
 * @param {number} maxParagraphs - Maximum number of paragraphs to keep.
 * @returns {string} - The truncated text.
 */
function truncateToParagraphs(text, maxParagraphs = 2) {
    if (!text) return "";
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
    if (paragraphs.length <= maxParagraphs) return text;
    return paragraphs.slice(0, maxParagraphs).join('\n\n') + ' ...';
}

module.exports = { fetch, truncateToParagraphs };
