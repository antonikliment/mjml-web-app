const webpack = require('webpack')
const path = require('path');
const pkg = require('../package.json');

module.exports = {
  entry: ['@babel/polyfill', './src/renderer/index.js'],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    modules: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!(react-icons|module2)\/).*/ 
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
