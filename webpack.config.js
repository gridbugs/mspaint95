const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlgin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: './index.ts',
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	resolve: {
		extensions: ['.js', '.ts'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: './index.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
		}),
		new CopyWebpackPlgin({
			patterns: [
				{
					from: './assets',
					to: 'assets',
				},
			],
		}),
	],
	devServer: {
		client: {
			overlay: false,
		},
	},
};
