const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    popup: "./src/popup.ts",
    background: "./src/background.ts",
    "content-script": "./src/content-script.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "inline-source-map",
};
