// webpack.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "http": require.resolve("stream-http"),
      "querystring": require.resolve("querystring-es3"),
      "fs": false, // 'fs' is not easily polyfillable, consider alternative approaches
      "net": false, // 'net' is not easily polyfillable, consider alternative approaches
    }
  },
  // Other webpack configuration options go here
};
