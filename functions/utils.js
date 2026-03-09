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

module.exports = { fetch };
