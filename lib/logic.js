'use strict';

const front = require('hexo-front-matter');
const fs = require('hexo-fs');
const gpt3 = require("./gpt3");
const distance = require('compute-cosine-distance');

let have_embedded_for_preset_tags = false;
let preset_tags_embeddings = new Object();


let logic = function(data) {
    // Only process posts
    if (!this.config.auto_tag.enable)
        return data;
    if (data.layout != 'post')
        return data;
    if (!this.config.render_drafts && data.source.startsWith("_drafts/"))
        return data;

    var log = this.log;
    let apiKey = this.config.auto_tag.apiKey
    let threshold = this.config.auto_tag.threshold;

    // 0. Get embeddings for preset tags if haven't already
    let preset_tags = this.config.auto_tag.tags;
    if (!have_embedded_for_preset_tags) {
        preset_tags.forEach(function(tag) {
            preset_tags_embeddings[tag] = gpt3(apiKey, tag);
        });
        have_embedded_for_preset_tags = true;
    }

    // For every post
    // 1. Sanitize post content
    let frontmatter = front.parse(data.raw);
    let text = data.content.replace(/!\[.*\]\((.*?)\)/g, ""); // Remove images markdown
    text = text.replace("<!--more-->", ""); // Remove read more
    text = text.replace(/<\/?[^>]+>/g, ""); // Remove HTML tags
    text = text.replace(/^\s*[\r\n]/gm, ""); // Remove empty lines
    text = frontmatter.title + ": " + text;  // Add title
    text = text.toLowerCase(); // Lowercase

    // 2. Get embedding for post content
    let text_embedding = gpt3(apiKey, text);

    // 3. Determine tags for the post based on embedding distance
    let tags = [];
    preset_tags.forEach(function(tag) {
        let dis = distance(text_embedding, preset_tags_embeddings[tag]);
        if (dis < threshold) {
            tags.push(tag);
            log.i(`[${data.title}] with new tag: [${tag}], distance: [${dis}]`);
        }
    });

    // 4. Add new tags to front matter
    frontmatter.tags = tags;
    let new_frontmatter = front.stringify(frontmatter);
    new_frontmatter = '---\n' + new_frontmatter;

    // 5. Write file
    fs.writeFile(data.full_source, new_frontmatter, 'utf-8');
    // log.i("[%s] with new tags [%s, %s, %s]", data.title, tags[0], tags[1], tags[2]);

    return data
}


module.exports = logic;
