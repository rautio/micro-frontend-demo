const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");
const { dependencies } = require("./package.json");

module.exports = (env) => {
  const PRODUCTS_HOST = env.PRODUCTS_HOST || "http://localhost:9002";
  const CART_HOST = env.CART_HOST || "http://localhost:9002";
  return {
    mode: "development",
    devServer: {
      port: 9003,
    },
    // output: {
    //   // library: 'cart',
    //   libraryTarget: 'umd',
    //   // filename: 'someLibName.js',
    //   // auxiliaryComment: 'Test Comment',

    //   path: path.join(__dirname, './dist'),
    //   filename: 'myUnflappableComponent.js',
    //   library: libraryName,
    //   libraryTarget: 'umd',
    //   publicPath: '/dist/',
    //   umdNamedDefine: true
    // },
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
          "./cartStore": "./src/store",
          "./CheckoutPage": "./src/features/checkout",
        },
        remotes: {
          CART: `CART@${CART_HOST}/remoteEntry.js`,
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
