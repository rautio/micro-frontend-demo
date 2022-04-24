/**
 * Using babel.config.js, which was introduced since babel 7 and it is recommended
 * by babel (https://babeljs.io/docs/en/configuration).
 * It provides ways to easily create config and be able to compile node_module if needed.
 */

 const babelrc = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      '@babel/env',
      {
        targets: {
          edge: '87',
          firefox: '78',
          chrome: '87',
          safari: '14',
        },
      },
    ],
  ],
  plugins: [
    '@babel/transform-runtime',
  ],
};

module.exports = babelrc;

