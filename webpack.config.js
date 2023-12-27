const path = require('path');
const webpack = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

(() => {
	console.log('webpack worked')
})()

module.exports = {
	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	target: 'node',
	resolve: {
		fallback: {
			"path": require.resolve("path-browserify"),
			"crypto": require.resolve("crypto-browserify"),
			"stream": require.resolve("stream-browserify"),
			"zlib": require.resolve("browserify-zlib"),
			"http": require.resolve("stream-http"),
			"querystring": require.resolve("querystring-es3"),
			"fs": false,
			"net": false,
		}
	},
	node: {},
	plugins: [
        new NodePolyfillPlugin()
    ]
};
