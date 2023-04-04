const { Configuration, OpenAIApi } = require("openai");

let gpt3 = async function(apiKey, text) {
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: text,
    });
    return response.data.data[0]['embedding'];
}

module.exports = gpt3;
