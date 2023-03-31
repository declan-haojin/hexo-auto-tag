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
    log.i("######" + data.title);
    // If there is no tags, return
    let frontMatter = front.parse(data.raw);

    let tags = gpt3(this.config.auto_tag.apiKey, "Please provide 3 single common lowercase word tags separated by commas that summarize this blog post. The blog is: " + data.content);

    frontMatter.tags = tags;
    newFrontMatter = front.stringify(frontMatter);
    newFrontMatter = '---\n' + newFrontMatter;
    fs.writeFile(data.full_source, newFrontMatter, 'utf-8');
    log.i(data.title + " with new tags: [" + tags[0] + ", " + tags[1] + ", " + tags[2] + "]");
    // log.i("Generated new tags: " + tags[0] + ", " + tags[1] + ", " + tags[2] + " for the post: " + data.title);

    return data;
}


module.exports = logic;
