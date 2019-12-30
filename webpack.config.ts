import * as path from 'path';
import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals';
import * as merge from 'webpack-merge';
import * as TerserPlugin from 'terser-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';
import * as OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import * as LoadablePlugin from '@loadable/webpack-plugin';

interface WebpackEnv {
  dev?: boolean;
  prod?: boolean;
}

module.exports = (env: WebpackEnv): webpack.Configuration[] => {
  const isDev = process.env.NODE_ENV === 'development' || env.dev;

  const baseConfig: webpack.Configuration = {
    mode: isDev ? 'development' : 'production',
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss'],

      /* This makes webpack use the path aliases defined in .tsconfig.json */
      plugins: [new TsconfigPathsPlugin()]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          /* see .babelrc for reason that babel-loader must be used */
          use: ['babel-loader', 'ts-loader'],
        },
        {
          test: /\.s?css$/,
          exclude: /node_modules/,
          oneOf: [
            {
              test: /\.module\.s?css$/,

              /**
               * ! Remember: loaders are processed from right to left
               */
              use: [
                MiniCssExtractPlugin.loader,
                'css-modules-typescript-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: true
                  }
                },
                'sass-loader'
              ]
            },
            {
              use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    plugins: [
      new LoadablePlugin(),
      new webpack.DefinePlugin({
        __DEV__: isDev
      }),
      new MiniCssExtractPlugin({
        filename: '[name]-[contenthash].css'
      })
    ]
  };

  if (!isDev) {
    baseConfig.optimization.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin()
    ];
  }

  const clientConfig = merge.smart(baseConfig, {
    entry: './src/client/Entry.tsx',
    devtool: 'cheap-module-eval-source-map',
    target: 'web',
    output: {
      filename: 'client.js',
      chunkFilename: `[name].client.bundle.[chunkhash].js`,
    },
    plugins: [
      new webpack.DefinePlugin({__BROWSER__: true})
    ]
  });

  const serverConfig = merge.smart(baseConfig, {
    entry: './src/server/app.tsx',
    target: 'node',
    externals: [nodeExternals()],
    output: {
      filename: 'server.js',
      chunkFilename: `[name].server.bundle.[chunkhash].js`,
    },
    plugins: [
      new webpack.DefinePlugin({__BROWSER__: false})
    ]
  });

  return [clientConfig, serverConfig];
};
