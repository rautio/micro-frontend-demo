const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const Dotenv = require('dotenv-webpack');
const { dependencies } = require('./package.json');

module.exports = (env) => ({
  mode: 'development',
  devServer: {
    port: 9001,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env' ,
              '@babel/preset-react',
            ], 
          },
        }]
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: [{
            loader: 'ts-loader'
        }]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new ModuleFederationPlugin(
      {
        name: 'MAIN',
        // filename:
        //   'remoteEntry.js',
        remotes: {
          PRODUCTS: `PRODUCTS@${env.PRODUCTS_HOST || 'http://localhost:9002'}/remoteEntry.js`,
          CART: `CART@${env.CART_HOST || 'http://localhost:9003'}/remoteEntry.js`,
        },
        shared: {
          ...dependencies,
          'react': { eager: true, singleton: true, requiredVersion: dependencies['react']},
          'react-dom': { eager: true, singleton: true, requiredVersion: dependencies['react-dom']},
        }
      }
    ),
    new HtmlWebpackPlugin({
      template:
        './public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
});