import { fileURLToPath } from "url";
import CopyPlugin from "copy-webpack-plugin";
import webpack from "webpack";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (_env, argv) => {
  const isDev = argv.mode === "development";

  return {
    mode: argv.mode,
    entry: {
      background: path.join(__dirname, "src", "js", "background.ts"),
      content_script: path.join(__dirname, "src", "js", "content_script.ts"),
    },
    output: {
      path: path.join(__dirname, "dist", "js"),
      filename: "[name].js",
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/].*/,
            name: "vendor",
            chunks: "initial",
          },
        },
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
      static: {
        directory: path.join(__dirname, "dist"),
      },
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
      // exclude locale files in moment
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      new CopyPlugin({
        patterns: [
          {
            from: ".",
            to: "../",
            context: "public",
          },
        ],
      }),
    ],
    ...(isDev ? { devtool: "inline-source-map" } : {}),
  };
};
