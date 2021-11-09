const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.tsx',
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
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.html',
      filename: 'index.html',
    }),
    new ESLintPlugin({
      files: './src/**',
      fix: true,
    }),
  ],
  devServer: {
    client: {
      overlay: false,
    },
  },
};
