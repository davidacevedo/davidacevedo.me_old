import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import devConfig from './development.config';
import prodConfig from './production.config';

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const config = {
  entry: `${__dirname}/../src/index.js`,
  
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/../public`,
    publicPath: '/',
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.jsx', '.js', '.json', '.scss'],
    alias: {
      components: `${__dirname}/../src/components`,
      containers: `${__dirname}/../src/containers`,
      styles: `${__dirname}/../src/styles`,
    }
  },

  module: {
    rules: [{
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader?limit=1000&mimetype=application/font-woff',
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader?limit=1000&mimetype=application/font-woff2',
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader?limit=1000&mimetype=application/octet-stream',
    }, {
      test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader?limit=1000&mimetype=application/font-otf',
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        "presets": ["react", ["es2015", { "modules": false }], "stage-2"],
        "plugins": [
          "transform-object-assign",
          "transform-decorators-legacy"
        ],
        "env": {
          "start": {
            "presets": ["react-hmre"]
          }
        }
      }
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'file-loader',
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader?modules&localIdentName=[path][name]--[local]',
        {
          loader: 'postcss-loader',
          options: {
            config: `${__dirname}/postcss.config.js`
          }
        },
        'resolve-url-loader',
        'sass-loader?sourceMap',
      ],
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ]
    }]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      sassLoader: {
        includePaths: [path.resolve(__dirname, '../src')],
      }
    }),
  ],
}

if (process.env.NODE_ENV === 'development') {
  module.exports = merge(config, devConfig);
} else if (process.env.NODE_ENV === 'production') {
  module.exports = merge(config, prodConfig);
}
