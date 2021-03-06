const path = require('path');

const SRC_DIR = path.join(__dirname, 'client', 'src');
const OUT_DIR = path.join(__dirname, 'client', 'dist');

module.exports = {
  entry: path.join(SRC_DIR, 'index.js'),
  output: {
    path: OUT_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test:/\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      }
    ]
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc'
    }
  }
};

