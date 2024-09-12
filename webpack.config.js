const nodeExternals = require("webpack-node-externals");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

// Determine environment (development by default)
const env = process.env.NODE_ENV || "dev";

const config = {
  context: __dirname,
  mode: env === "prod" ? "production" : "development", // This sets mode to 'development' or 'production'
  watchOptions: {
    ignored: "node_modules/**",
  },
  stats: "errors-only",
  entry: "./server.ts",
  target: "node",
  externals: [nodeExternals()],
  output: {
    filename: "server.js",
    libraryTarget: "commonjs",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        baseUrl: "./src",
      }),
    ],
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, `.env.${env}`), // Load different .env files based on the environment
    }),
    new NodemonPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        mangle: true,
        output: {
          comments: false,
        },
      },
      sourceMap: true,
      exclude: [/\.min\.js$/gi],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: `./.env.${env}`, to: "." }, // Copy the relevant .env file
        { from: "./package.json", to: "." },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ }],
  },
};

module.exports = config;
