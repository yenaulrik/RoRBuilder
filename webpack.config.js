const webpack = require('webpack');
const CONFIG = require('./path.config');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    CONFIG.source + CONFIG.sourcePath + CONFIG.sourcePathName
  ],
  output: {
    path: CONFIG.build + CONFIG.buildPath,
    filename: CONFIG.buildPathName,
    contentBase: CONFIG.build,
    publicPath: '/js/'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: CONFIG.source + CONFIG.sourcePath
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'react-hot', 
          'babel?presets[]=react,presets[]=es2015'
        ],
        exclude: 'node_modules',
        include: CONFIG.source + CONFIG.sourcePath
      },
      { 
        test: /\.scss$/, 
        loader: 'style-loader!css-loader!postcss-loader!sass-loader',
        include: CONFIG.source + CONFIG.sourcePathSCSS
      }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  },
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};