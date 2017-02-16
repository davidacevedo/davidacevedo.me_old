import webpack from 'webpack';

module.exports = {
    devtool: 'cheap-module-source-map',
    output: {
      filename: 'bundle.js',
      path: `${__dirname}/../dist`,
    },

    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
}