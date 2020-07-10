const path = require('path');
const webpack = require('webpack');
const ts = require('typescript');


const addSwagger = (config) => {
  const rule = config.module.rules.find((rule) => rule.loader === 'ts-loader');
  if (!rule) {
    throw new Error('no ts-loader rule found');
  }
  rule.options = {
    ...rule.options,
    getCustomTransformers: () => {
      const program = ts.createProgram([
        path.join(__dirname, 'main.ts'),
      ], {});
      return {
        before: [require('@nestjs/swagger/plugin').before({}, program)],
      };
    },
    transpileOnly: false,
  };
};


module.exports = (config, context) => {
  addSwagger(config);

  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      'openapi': '@nestjs/swagger',
    }),
  ];

  return config;
};

