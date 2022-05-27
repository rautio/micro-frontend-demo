const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");
const { dependencies } = require("./package.json");

module.exports = (env) => {
  const CART_HOST = env.CART_HOST || "http://localhost:9002";
  return {
    mode: "development",
    devServer: {
      port: 9002,
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
          test: /\.(jpe?g|png|svg)$/,
          loader: "file-loader",
          options: {
            name: "[path][name].[hash].[ext]",
          },
        },
      ],
    },
    plugins: [
      new Dotenv(),
      new ModuleFederationPlugin({
        name: "PRODUCTS",
        filename: "remoteEntry.js",
        remotes: {
          CART: `CART@${CART_HOST}/remoteEntry.js`,
        },
        exposes: {
          "./ProductsList": "./src/components/ProductsList",
          "./ProductCard": "./src/components/ProductCard",
          "./products": "./src/products",
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
    ],
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
  };
};
