# hexo-auto-tag

---

[![npm version](https://badge.fury.io/js/hexo-auto-tag.svg)](https://badge.fury.io/js/hexo-auto-tag)

使用 GPT-3 的强大功能，根据文章内容自动为您的文章分配相关的预定义标签。

安装
--

arduino

```bash
npm install hexo-auto-tag
```

使用方法
----

1.  将以下内容添加到您的 Hexo 站点的 `_config.yml` 文件中：

yaml

```yaml
auto_tag:
  enable: true
  apiKey: <YOUR OPENAI API KEY>
  threshold: 0.23 # 范围: 0-1, 数值越低，分配的标签越少
  tags:
    - tag1
    - tag2
    - tag3
```

您可以从[这里](https://platform.openai.com/account/api-keys)获取 API 密钥。使用 API 可能需要付费计划。然而，费用极低，不到 $0.1 就可以为 200 篇文章分配 50 个标签。

2.  当准备生成站点时，运行以下命令：

`hexo clean && hexo generate`

**确保运行`hexo clean` 和 `hexo generate`。**

注意事项
----

此插件仍处于早期开发阶段。请在[这里](https://github.com/declan-haojin/hexo-auto-tag/issues/new)报告任何问题。
