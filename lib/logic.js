'use strict';

var front = require('hexo-front-matter');
var fs = require('hexo-fs');
const gpt3 = require("./gpt3");

let logic = function(data) {
    var log = this.log;
    let newFrontMatter;

    if (!this.config.auto_tag.enable)
        return data;

    // Only process posts
    if (data.layout != 'post')
        return data;
    if (!this.config.render_drafts && data.source.startsWith("_drafts/"))
        return data;

    let frontMatter = front.parse(data.raw);

    let tags = gpt3(this.config.auto_tag.apiKey, "Output the top 3 tags from above that are related to this blog post: " + data.content);
    // let tags = [];

    frontMatter.tags = tags;
    newFrontMatter = front.stringify(frontMatter);
    newFrontMatter = '---\n' + newFrontMatter;
    fs.writeFile(data.full_source, newFrontMatter, 'utf-8');
    log.i("[%s] with new tags [%s, %s, %s]", data.title, tags[0], tags[1], tags[2]);

    return data;
}


module.exports = logic;
