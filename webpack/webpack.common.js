import { fileURLToPath } from "url";
import CopyPlugin from "copy-webpack-plugin";
import webpack from "webpack";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __project_dirname = path.resolve(__dirname, "../");

export default {
  entry: {
    background: path.join(__project_dirname, "src", "js", "background.ts"),
    content_script: path.join(
      __project_dirname,
      "src",
      "js",
      "content_script.ts",
    ),
  },
  output: {
    path: path.join(__project_dirname, "dist", "js"),
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial",
    },
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
  devServer: {
    contentBase: "./dist",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    // exclude locale files in moment
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyPlugin([{ from: ".", to: "../" }], { context: "public" }),
  ],
};
