# hexo-auto-tag

[![npm version](https://badge.fury.io/js/hexo-auto-tag.svg)](https://badge.fury.io/js/hexo-auto-tag)

With preset tags, hexo-auto-tag plugin automatically assigns tags to your posts based on the content of the post powered by GPT-3.5 API from OpenAI.

The hexo-auto-tag plugin offers a convenient solution for tagging your posts on your Hexo site. With preset tags, it automatically assigns relevant tags to your posts based on the content of the post. This is made possible by leveraging the power of the GPT-3.5 API from OpenAI, which analyzes the content of your post and suggests appropriate tags.

## Installation

```
npm install hexo-auto-tag
```

## Usage

1. Add the following to your Hexo site's `_config.yml` file:

```
auto_tag:
  enable: true
  apiKey: <YOUR OPENAI API KEY>
  threshold: 0.25
  tags:
    - tag1
    - tag2
    - tag3
```

You can get your API key from [here](https://platform.openai.com/account/api-keys). It may require a paid plan to use the API. However, the cost is extremely low with less than $0.1 to assign 50 tags to 200 posts.

2. Run the following command when ready to generate your site:

```
hexo clean && hexo generate
```

***Make sure to run BOTH `hexo clean` and `hexo generate`.***

## Note

This plugin is still in early development. Please report any issues [here](https://github.com/declan-haojin/hexo-auto-tag/issues/new).

