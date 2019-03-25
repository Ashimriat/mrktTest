const path = require('path'),
  CopyPlugin = require('copy-webpack-plugin'),
  JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
  mode: 'production',
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
    ]),
    new JavaScriptObfuscator({
      rotateUnicodeArray: true
    })
  ]
};
