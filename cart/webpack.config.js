const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require('./package.json');

module.exports = {
  mode: 'development',
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
    new ModuleFederationPlugin(
      {
        name: 'CART',
        filename:
          'remoteEntry.js',
        exposes: {
          './Cart': './src/Cart'
        },
        shared: {
          ...dependencies,
          'react': {eager: true, singleton: true, requiredVersion: dependencies['react']},
          'react-dom': {eager: true, singleton: true, requiredVersion: dependencies['react-dom']},
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
  },
  // shared: {

  // }
  // externals: {
    // 'react': 'react',
    // react: 'React',
    // 'react-dom': 'ReactDOM',
    // react: {
    //   commonjs: 'react',
    //   commonjs2: 'react',
    //   amd: 'react'
    // }
    // Use external version of React
    // "react": {
    //     "commonjs": "react",
    //     "commonjs2": "react",
    //     "amd": "react",
    //     "root": "React"
    // },
    // "react-dom": {
    //     "commonjs": "react-dom",
    //     "commonjs2": "react-dom",
    //     "amd": "react-dom",
    //     "root": "ReactDOM"
    // }
    // 'react': {
    //   root: 'React',
    //   commonjs2: 'react',
    //   commonjs: 'react',
    //   amd: 'react'
    // },
    // 'react-dom': {
    //   root: 'ReactDOM',
    //   commonjs2: 'react-dom',
    //   commonjs: 'react-dom',
    //   amd: 'react-dom'
    // }
  // },
  target: 'web'
};