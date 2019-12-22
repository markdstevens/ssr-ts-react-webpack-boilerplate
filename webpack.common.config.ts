import * as path from 'path';
import * as webpack from 'webpack';
import * as TerserPlugin from 'terser-webpack-plugin';
import * as TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export const commonWebpackConfig: webpack.Configuration = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  output: {
    chunkFilename: '[name].bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
    globalObject: 'this'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: [new TsconfigPathsPlugin.TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin()
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
    })
  ]
};
