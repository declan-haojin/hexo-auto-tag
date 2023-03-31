let gpt3 = function(apiKey, prompt) {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    const request = new XMLHttpRequest();
    const url = 'https://api.openai.com/v1/chat/completions';

    const model = 'gpt-3.5-turbo';
    const messages = [{"role": "user", "content": prompt}];
    const data = { model, messages };

    request.open('POST', url, false);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', `Bearer ${apiKey}`);

    request.send(JSON.stringify(data));

    responseWords = JSON.parse(request.responseText).choices[0].message.content;
    responseWords = responseWords.toString().split(", ");
    return responseWords;
}

module.exports = gpt3;
