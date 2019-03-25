const path = require('path'),
  CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    compress: true,
    port: 9000
  },
  entry: ['@babel/polyfill', 'react-app-polyfill/ie11', './src/index.jsx'],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      {from: 'src/index.html', to: ''}
    ])
  ]
};
