var path = require('path')

module.exports = {
  entry: './src/App.js',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000' }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    }
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
    library: 'snufkin',
    libraryTarget: "umd"
  },
  devServer: {
    contentBase: './dist'
  }
};