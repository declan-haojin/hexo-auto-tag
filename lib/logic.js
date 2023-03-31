'use strict';

var front = require('hexo-front-matter');
var fs = require('hexo-fs');

let logic = function(data) {
    var log = this.log;
    var newFrontMatter

    // Filter out non-post files
    if (data.layout != 'post')
        return data;

    
    // if (!data.source.startsWith("_posts/"))
    //     return data;

    log.i("Current file is " + data.source);

    // Get the front matter
    var frontMatter = front.parse(data.raw);
    log.i("The old tags are: " + frontMatter.tags.join("_"));

    // Process post
    newFrontMatter = front.stringify(frontMatter);
    newFrontMatter = '---\n' + newFrontMatter;
    // fs.writeFile(data.full_source, newFrontMatter, 'utf-8');
    log.i("Generated: categories [%s] for post [%s]", newFrontMatter.tags, categories[categories.length-1]);



    return data
}



module.exports = logic;
