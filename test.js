const gpt3 = require("./lib/gpt3");

let response = gpt3("",
"Please provide 3 single common word tags that summarize this blog post. The blog is: Zion之后，我们马不停蹄地赶往下一个人间绝美之境。从Zion到Bryce的三个小时车程里，我们遇见了太多大自然鬼斧神工的杰作，或是天气或事地形，变化之快之大无不让我们震撼。犹记得15分钟的车程里，我们经历了大晴天，小雨，冰雹，小冰雹，暴雨，大雪，同时公路两旁的景象也随之不断变化，遇到的麋鹿更是数不胜数。");
console.log(response);
// response.then(function(result) {
//     console.log(result) // "Some User token"
// })
