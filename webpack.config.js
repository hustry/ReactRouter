
module.exports = {

  entry: './12-navigation/index.js',

  resolve:{
    extentions:["","js"]
  },

  output:{
    filename: './12-navigation/bundle.js',
    publicPath: './12-navigation/'
  },

  module: {
    loaders: [
      { 
      	test: /\.js$/, 
      	exclude: /node_modules/,
      	loader: 'babel-loader?presets[]=es2015&presets[]=react'
      }
    ]
  }
}