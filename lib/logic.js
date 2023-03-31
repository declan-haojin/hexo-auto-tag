'use strict';

var front = require('hexo-front-matter');
var fs = require('hexo-fs');
const gpt3 = require("./gpt3");

let cnt = 0;

let logic = function(data) {
    var log = this.log;

    log.i("Current file: " + data.source);

    // Only process posts
    if (data.layout != 'post')
        return data;

    // If there is no tags, return
    // let frontMatter = front.parse(data.raw);
    // if (frontMatter.tags == null)
    //     return data;

    // Make tags empty
    // frontMatter.tags = null;
    // let newFrontMatter = front.stringify(frontMatter);
    // newFrontMatter = '---\n' + newFrontMatter;

    // Get the post content
    // log.i(gpt3(this.config.auto_tag.apiKey, data.content));

    // log.i(cnt);
    // if (cnt != 0)
    //     return data;
    // cnt += 1;
    let response = gpt3(this.config.auto_tag.apiKey, "Hello!");

    response.then(function(result) {
        log.i(result);
    })


    // fs.writeFile(data.full_source, newFrontMatter, 'utf-8');
    return data;

}



module.exports = logic;
