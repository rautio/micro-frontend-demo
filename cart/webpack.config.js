const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");
const { dependencies } = require("./package.json");

module.exports = (env) => {
  const PRODUCTS_HOST = env.PRODUCTS_HOST || "http://localhost:9002";
  return {
    mode: "development",
    devServer: {
      port: 9003,
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
      ],
    },
    plugins: [
      new Dotenv(),
      new ModuleFederationPlugin({
        name: "CART",
        filename: "remoteEntry.js",
        exposes: {
          "./Cart": "./src/components/CartButton",
          "./CheckoutPage": "./src/features/checkout",
        },
        remotes: {
          PRODUCTS: `PRODUCTS@${PRODUCTS_HOST}/remoteEntry.js`,
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
    target: "web",
  };
};
