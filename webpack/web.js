const webpack = require('webpack')

const pkg = require('../package.json')

module.exports = {
  entry: ['babel-polyfill', './src/renderer/index.js'],
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      },
      {
      test: /\.(css|scss)$/,
      use: [
        {
          loader: 'style-loader' // creates style nodes from JS strings
        },
        {
          loader: 'css-loader' // translates CSS into CommonJS
        },
        { loader: 'resolve-url-loader' },
        {
          loader: 'sass-loader', // compiles Sass to CSS
          options: {
            sourceMap: true,
            sourceMapContents: false
          }
        }
      ]
    }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __MJML_APP_VERSION__: JSON.stringify(pkg.version),
      __MJML_VERSION__: JSON.stringify(pkg.dependencies.mjml),
    }),
  ],
}
