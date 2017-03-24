module.exports = {
  entry: './frontend/index.js',
  output: {
    filename: './dist/bundle.js'
  },
  devServer: {
    inline: true,
    port: 8080,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.s?css$/,
        loaders: ['style', 'css', 'sass'],
        inlcude: './frontend'
      }
    ]
  }
}
