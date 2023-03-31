const gpt3 = require("./lib/gpt3");

let response = gpt3("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", "Hello!");
// console.log(response)
response.then(function(result) {
    console.log(result) // "Some User token"
})
