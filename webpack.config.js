const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlgin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.ts',
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
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				],
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
					from: './src/assets',
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
