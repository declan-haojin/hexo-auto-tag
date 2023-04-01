'use strict';

var front = require('hexo-front-matter');
var fs = require('hexo-fs');
const gpt3 = require("./gpt3");

let logic = function(data) {
    var log = this.log;
    let newFrontMatter;

    // Only process posts
    if (!this.config.auto_tag.enable)
        return data;
    if (data.layout != 'post')
        return data;
    if (!this.config.render_drafts && data.source.startsWith("_drafts/"))
        return data;

    // Parse front matter
    let frontMatter = front.parse(data.raw);
    // let tags = gpt3(this.config.auto_tag.apiKey, "Please provide 3 keywords separated by commas that best describe this blog post: " + data.content);
    let tags = [];

    // Sanitize post content
    let text = data.content.replace(/!\[.*\]\((.*?)\)/g, ""); // Remove images markdown
    text = text.replace("<!--more-->", ""); // Remove read more
    text = text.replace(/<\/?[^>]+>/g, ""); // Remove HTML tags
    text = text.replace(/^\s*[\r\n]/gm, ""); // Remove empty lines
    text = frontMatter.title + ": " + text;  // Add title
    text = text.toLowerCase(); // Lowercase

    // Find keywords
    let keywords = this.config.auto_tag.tags

    log.i("For post: [%s]", frontMatter.title)

    keywords.forEach(function(keyword) {
        log.e(this.config.enable);

        if (gpt3(this.config.auto_tag.apiKey, `Is this post about ${keyword}?). Reply yes or no. The post is ${text}`).toLowerCase().includes("yes")) {
            tags.push(keyword);
            log.i("Found keyword: [%s]", keyword);
        }


        // if (text.includes(keyword)) {
        //     // log.i("Found keyword: [%s]", keyword)
        //     tags.push(keyword)
        // }
    });

    // Add tags to front matter
    frontMatter.tags = tags;
    newFrontMatter = front.stringify(frontMatter);
    newFrontMatter = '---\n' + newFrontMatter;

    // Write file
    fs.writeFile(data.full_source, newFrontMatter, 'utf-8');
    // log.i("[%s] with new tags [%s, %s, %s]", data.title, tags[0], tags[1], tags[2]);
    log.i("Done!")
    return data;
}


module.exports = logic;
