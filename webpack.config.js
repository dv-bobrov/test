const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
      main: './src/js/app.js',
      maps: './src/js/maps.js'
  },

  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }]
  },

  devtool: 'inline-source-map',

  output: {
    // path: path.resolve(__dirname, 'build'),
    // filename: 'main.js',
    filename: '[name].js',
    library: 'app',
    // path: __dirname + '/dist'

  },

  plugins: [
    new webpack.ProvidePlugin({
      // $: "jquery",
      // jQuery: "jquery",
      swiper: "swiper",
      noUiSlider: "nouislider",
      tablesort: "tablesort",
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
