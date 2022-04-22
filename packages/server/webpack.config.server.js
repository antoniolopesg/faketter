const path = require('path')

module.exports = {
  target: 'node',
  mode: 'development',
  entry: {
    server: [
      './src/index.ts'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
        exclude: /node_modules/,
        include: /src/
      }
    ]
  }
}