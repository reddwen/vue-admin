'use strict';
const path = require('path');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const packageConfig = require('../package.json');
const fs = require('fs');
//读取less文件并将起转为obj格式，传入generateLoaders函数
function getLessVariables(file) {
  var themeContent = fs.readFileSync(file, 'utf-8');
  var variables = {};
  themeContent.split('\n').forEach(function (item) {
    if (item.indexOf('//') > -1 || item.indexOf('/*') > -1) {
      return;
    }
    var _pair = item.split(':');
    if (_pair.length < 2) return;
    var key = _pair[0].replace('\r', '').replace('@', '');
    if (!key) return;
    var value = _pair[1]
      .replace(';', '')
      .replace('\r', '')
      .replace(/^\s+|\s+$/g, '');
    variables[key] = value;
  });
  return variables;
}

exports.assetsPath = function (_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function (options) {
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      });
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        publicPath: '../../',
        fallback: 'vue-style-loader',
      });
    } else {
      return ['vue-style-loader'].concat(loaders);
    }
  }
  //路径解析
  function resolveResource(name) {
    return path.resolve(__dirname, '../src/assets/css/' + name);
  }
  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    // less: generateSassResourceLoader(),
    less: generateLoaders('less', {
      // globalVars: getLessVariables(resolveResource('varable.less'))
    }),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus'),
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = [];
  const loaders = exports.cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader,
    });
  }

  return output;
};

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier');

  return (severity, errors) => {
    if (severity !== 'error') return;

    const error = errors[0];
    const filename = error.file && error.file.split('!').pop();

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png'),
    });
  };
};
