const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => ({
  mode: 'development',
  devServer: {
    port: 9003,
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
      }
    ],
  },
  plugins: [
    new Dotenv(),
    new ModuleFederationPlugin(
      {
        name: 'MAIN',
        filename:
          'remoteEntry.js',
        remotes: {
          PRODUCTS:
            `PRODUCTS@${env.PRODUCTS_HOST}/remoteEntry.js`,
        },
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