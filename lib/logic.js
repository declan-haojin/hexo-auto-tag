'use strict';

const front = require('hexo-front-matter');
const fs = require('hexo-fs');
const gpt3 = require("./gpt3");
const distance = require('compute-cosine-distance');

let have_embedded_for_preset_tags = false;
let preset_tags_embeddings = new Object();

let process_post = function(apiKey, threshold, log, data) {
    // 1. Sanitize post content
    let frontmatter = front.parse(data.raw);
    let text = data.content.replace(/!\[.*\]\((.*?)\)/g, ""); // Remove images markdown
    text = text.replace("<!--more-->", ""); // Remove read more
    text = text.replace(/<\/?[^>]+>/g, ""); // Remove HTML tags
    text = text.replace(/^\s*[\r\n]/gm, ""); // Remove empty lines
    text = frontmatter.title + ": " + text;  // Add title
    text = text.toLowerCase(); // Lowercase

    // 2. Get embedding for post content
    gpt3(apiKey, text).then(function(text_embedding) {
        // 3. Determine tags for the post based on embedding distance
        let tags = [];
        Object.keys(preset_tags_embeddings).forEach(function(tag) {
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
    });
}


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
        let promises = preset_tags.map(function(tag) {
            return gpt3(apiKey, tag).then(function(res) {
                preset_tags_embeddings[tag] = res;
            });
        });

        Promise.all(promises).then(function() {
            process_post(apiKey, threshold, log, data);
        });
        have_embedded_for_preset_tags = true;

    } else {
        process_post(apiKey, threshold, log, data);
    }

    return data;
}


module.exports = logic;
