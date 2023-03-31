'use strict';

var hexo = hexo || {};
// hexo.extend.filter.register('before_generate', require('./lib/logic'), 10);
hexo.extend.filter.register('before_post_render', require('./lib/logic'), 10);
