const path = require('path');
const glob = require('glob');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const devMode = options.mode !== 'production';

  return {
    optimization: {
      minimizer: [
        new TerserPlugin({ cache: true, parallel: true, sourceMap: devMode }),
      ]
    },
    entry: {
      app: './assets/js/app.tsx'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'priv/static/js'),
      publicPath: '/js/'
    },
    devtool: devMode ? 'eval-cheap-module-source-map' : undefined,
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
      ]
    },
    plugins: [
      new CopyWebpackPlugin([{ from: 'assets/static/', to: '../' }])
    ]
    .concat(devMode ? [new HardSourceWebpackPlugin()] : []),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    }
  }
};
