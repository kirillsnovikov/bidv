const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const paths = {
  src: path.resolve(__dirname, "src"),
  dist: path.resolve(__dirname, "dist")
};

console.log(process.env);

const config = {
  context: paths.src, // базовая директория для точек входа и загрузчиков
  entry: {
    bidv:
      process.env.NODE_ENV === "production"
        ? ["@babel/polyfill", "./build"]
        : ["@babel/polyfill", "./main"]
  },
  output: {
    path: paths.dist, // путь для результатов сборки
    filename: "[name].bundle.js" // название итогового бандла, получится dist/obdvc.bundle.js
    // library: "bidv",
    // libraryTarget: "var"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
      // filename: "index.html",
      // title: "maps test"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],
  externals: {
    jquery: "jQuery"
  },
  devServer: {
    contentBase: path.dist,
    compress: true,
    port: 9000
  }
};

if (process.env.NODE_ENV === "production") {
  config.output.library = "bidv";
  config.output.libraryTarget = "var";
}

module.exports = config;
