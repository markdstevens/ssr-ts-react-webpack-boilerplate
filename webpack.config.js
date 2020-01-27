const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackBundleSizeLimitPlugin = require('webpack-bundle-size-limit-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => {
  const isDev =
    process.env.NODE_ENV === 'development' || (env && env.dev) || false;

  const isProfiling = env.profileClient || env.profileServer;

  const baseConfig = {
    mode: isDev ? 'development' : 'production',
    watch: isDev && !env.nostart && !isProfiling,
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss', '.png'],

      /* This makes webpack use the path aliases defined in .tsconfig.json */
      plugins: [new TsconfigPathsPlugin()]
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif)$/i,
          use: ['url-loader']
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          /* see .babelrc for reason that babel-loader must be used */
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true
              }
            }
          ]
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
      moduleIds: 'hashed',
      minimizer: [new OptimizeCssAssetsPlugin()],
      splitChunks: {
        cacheGroups: {
          styles: {
            test: /\.scss$/,
            enforce: true
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: isDev
      }),
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name]-[contenthash].css'
      })
    ],
    stats: 'errors-warnings'
  };

  if (!isDev) {
    /**
     * by default, the 'minimize' option will be set to 'true' when 'mode'
     * is 'production', otherwise it will be 'false'. When 'minimize' is
     * 'true', the terser plugin will be used to optimize the JS bundles that
     * webpack creates. During minification, a process known as tree-shaking
     * will occur that will "shake off" all of the unused code in libraries
     * and in application code, thus making bundles much smaller.
     *
     * By settings "warnings: true", terser will output all the times it was
     * able to drop unused functions, thus tangibly recording the effects of
     * tree shaking.
     */
    baseConfig.optimization.minimizer.push(new TerserPlugin({}));
  }

  const clientConfig = merge.smart(baseConfig, {
    entry: './src/client/Entry.tsx',
    target: 'web',
    output: {
      filename: 'client.js',
      chunkFilename: isDev
        ? `[name].client.bundle.js`
        : `[name].client.bundle.[chunkhash].js`
    },
    plugins: [
      new webpack.DefinePlugin({ __BROWSER__: true }),
      new LoadablePlugin(),
      new HtmlWebpackPlugin({
        title: 'React App',
        filename: 'index.html',
        template: 'src/public/index.ejs'
      })
    ]
  });

  if (!isDev) {
    clientConfig.plugins.push(
      new WebpackBundleSizeLimitPlugin({
        config: path.join(__dirname, 'bundle-size-client.conf.js'),
        include: ['.css', '.js'],
        enforceForAllBundles: true,
        decimalPlaces: 2
      })
    );
  }

  if (isDev) {
    clientConfig.devtool = 'cheap-module-eval-source-map';
    clientConfig.plugins.push(
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['!server*.js'],
        cleanAfterEveryBuildPatterns: ['!server*.js'],
        cleanStaleWebpackAssets: false
      })
    );
  }

  clientConfig.plugins.push(
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: './src/public/service-worker.js',
      swDest: 'service-worker.js'
    })
  );

  const serverConfig = merge.smart(baseConfig, {
    entry: './src/server/app.tsx',
    target: 'node',
    externals: [nodeExternals()],
    output: {
      filename: 'server.js',
      chunkFilename: isDev
        ? `[name].server.bundle.js`
        : `[name].server.bundle.[chunkhash].js`
    },
    plugins: [
      new webpack.DefinePlugin({ __BROWSER__: false }),
      new CopyWebpackPlugin([
        { from: 'src/public/manifest.json' },
        { from: 'src/public/penguin.png' }
      ])
    ]
  });

  if (env.profileServer) {
    serverConfig.plugins.push(new BundleAnalyzerPlugin());
  }

  if (env.profileClient) {
    clientConfig.plugins.push(new BundleAnalyzerPlugin());
  }

  if (isDev) {
    if (!env.nostart && !isProfiling) {
      serverConfig.plugins.push(new NodemonPlugin());
    }
    serverConfig.plugins.push(
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['!client*.js'],
        cleanAfterEveryBuildPatterns: ['!client*.js'],
        cleanStaleWebpackAssets: false
      })
    );
  } else {
    serverConfig.plugins.push(
      new WebpackBundleSizeLimitPlugin({
        config: path.join(__dirname, 'bundle-size-server.conf.js'),
        include: ['.js', '.json'],
        enforceForAllBundles: true
      })
    );
  }

  return [clientConfig, serverConfig];
};
