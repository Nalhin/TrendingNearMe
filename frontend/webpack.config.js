const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const path = require('path');

const staticPath = 'static';

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  const config = {
    mode: isDev ? 'development' : 'production',
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
      publicPath: isDev ? '/' : '',
      filename: `${staticPath}/scripts/bundle.[hash].js`,
      chunkFilename: `${staticPath}/scripts/chunk.[chunkhash].js`,
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: isDev && 'eval-source-map',
    devServer: {
      contentBase: [path.join(__dirname, 'public')],
      open: false,
      hot: true,
      port: 3000,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: [/node_modules/, /test/],
          enforce: 'pre',
          use: [
            {
              loader: 'eslint-loader',
              options: {
                emitWarning: isDev,
                configFile: path.join(__dirname, '.eslintrc.js'),
                cache: isDev,
              },
            },
          ],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: [/node_modules/, /test/],
          use: ['babel-loader', 'ts-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|ttf)$/i,
          use: [
            {
              loader: 'url-loader',
              query: {
                limit: 1000,
                esModule: false,
                fallback: 'file-loader',
                outputPath: `${staticPath}/assets`,
                name: '[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', 'jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
        filename: 'index.html',
      }),
      new CleanWebpackPlugin(),
      new DotEnv(),
      new FriendlyErrorsWebpackPlugin(),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    performance: {
      hints: false,
    },
  };

  if (argv.profile) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
