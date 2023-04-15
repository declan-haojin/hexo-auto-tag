# hexo-auto-tag

[![npm version](https://badge.fury.io/js/hexo-auto-tag.svg)](https://badge.fury.io/js/hexo-auto-tag)

Automatically assigns relevant predefined tags to your posts based on their content with the power of GPT-3.

使用 GPT-3 的强大功能，根据文章内容自动为您的文章分配相关的预定义标签。 [中文文档](/README-CN.md)

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
  threshold: 0.23 # range: 0-1, 0.23 has been tested to be a good value. Lower values tend to result in fewer tags being assigned to a post.
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

