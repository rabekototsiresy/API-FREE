const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const config = {
  context: __dirname,
  mode: "development",
  watchOptions: {
    ignored: 'node_modules/**'
  },
  stats: 'errors-only',
  entry: "./server.ts",
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()],
  output: {
    filename: "server.js",
    libraryTarget: 'commonjs'

  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        baseUrl: "./src"
      })
    ]
  },
  plugins: [
    new Dotenv(),
    new NodemonPlugin(), // Dong
    new UglifyJsPlugin(
      {
        uglifyOptions: {
          mangle: true,
          output: {
            comments: false
          }
        },
        sourceMap: true,
        exclude: [/\.min\.js$/gi]
      }
    ),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./.env", to: "." },
        { from: "./package.json", to: "." },
      ],
      options: {
        concurrency: 100,
      },
    })
  ],
  module: {
    rules: [
      // all files with a `.ts` or `  .tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/, }
    ]
  }
};

module.exports = config;