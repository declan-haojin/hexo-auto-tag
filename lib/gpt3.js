let gpt3 = function(apiKey, prompt) {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    const request = new XMLHttpRequest();
    const url = 'https://api.openai.com/v1/embeddings';

    const model = 'text-embedding-ada-002';
    const input = prompt;
    const data = { model, input };

    request.open('POST', url, false);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', `Bearer ${apiKey}`);

    request.send(JSON.stringify(data));

    if (request.readyState === 4 && request.status === 200) {
        return JSON.parse(request.responseText).data[0]['embedding'];
    } else {
        return JSON.parse(request.responseText)['error']['message'];
    }
}

module.exports = gpt3;
