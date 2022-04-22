const path = require('path')

const ReloadServerPlugin = require('./webpack/ReloadServerPlugin');

const output = {
  path: path.join(__dirname, 'build'),
  filename: 'server.js'
}

module.exports = {
  target: 'node',
  mode: 'development',
  entry: {
    server: [
      './src/index.ts'
    ]
  },
  output,
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
  },
  plugins: [
    new ReloadServerPlugin({
      script: path.join(output.path, output.filename)
    })
  ]
}