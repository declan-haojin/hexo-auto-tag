const { Configuration, OpenAIApi } = require("openai");

const Cache = require('file-system-cache').default
const cache = Cache({basePath: "./.cache"});

const gpt3 = async function(apiKey, text, log) {
    // Check cache
    const value = cache.getSync(text);
    if (value) {
        // log.e("Cache hit!");
        // console.log("Cache hit!");
        return value;
    }

    // If not in cache, call API
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: text,
    });
    // log.e("Cache miss!");
    // console.log("Cache miss!");

    // Add to cache
    cache.setSync(text, response.data.data[0]['embedding']);

    return response.data.data[0]['embedding'];
}

module.exports = gpt3;
