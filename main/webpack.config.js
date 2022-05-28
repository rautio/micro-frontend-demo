const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
const { dependencies } = require("./package.json");

module.exports = (env) => {
  const PRODUCTS_HOST = env.PRODUCTS_HOST || "http://localhost:9002";
  const CART_HOST = env.CART_HOST || "http://localhost:9002";
  return {
    mode: "development",
    devServer: {
      port: 9001,
      historyApiFallback: { index: "/", disableDotRule: true },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
              },
            },
          ],
        },
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new Dotenv(),
      new ModuleFederationPlugin({
        name: "MAIN",
        // filename:
        //   'remoteEntry.js',
        remotes: {
          PRODUCTS: `PRODUCTS@${PRODUCTS_HOST}/remoteEntry.js`,
          CART: `CART@${CART_HOST}/remoteEntry.js`,
        },
        shared: {
          ...dependencies,
          react: {
            eager: true,
            singleton: true,
            requiredVersion: dependencies["react"],
          },
          "react-dom": {
            eager: true,
            singleton: true,
            requiredVersion: dependencies["react-dom"],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new webpack.DefinePlugin({
        "process.env.PRODUCTS_HOST": JSON.stringify(PRODUCTS_HOST),
        "process.env.CART_HOST": JSON.stringify(CART_HOST),
      }),
    ],
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
  };
};
