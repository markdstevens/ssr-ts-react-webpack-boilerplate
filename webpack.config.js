const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = (env) => {
  const isDev = process.env.NODE_ENV === 'development' || env.dev;

  const baseConfig = {
    mode: isDev ? 'development' : 'production',
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
          use: [{
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          }],
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
            chunks: 'all',
          }
        }
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
    baseConfig.optimization.minimizer.push(new TerserPlugin({
      terserOptions: {
        warnings: true
      }
    }));
  }

  const clientConfig = merge.smart(baseConfig, {
    entry: './src/client/Entry.tsx',
    target: 'web',
    output: {
      filename: 'client.js',
      chunkFilename: `[name].client.bundle.[chunkhash].js`,
    },
    plugins: [
      new webpack.DefinePlugin({__BROWSER__: true}),
      new WorkboxPlugin.InjectManifest({
        /**
         * location of service worker file
         */
        swSrc: 'src/public/service-worker.js',
        /**
         * destination file. This has to be specified so that the file can be
         * transpiled from ts --> js
         */
        swDest: 'service-worker.js',
        /**
         * All JS and CSS files in the 'dist' directory will be cached by the
         * service worker in the client's browser on initial page load
         */
        include: [/\.js$/, /\.css$/],
        /**
         * why?
         */
        templatedUrls: {
          '/': new Date().toString(),
        },
      }),
      new CopyWebpackPlugin([
        {from: 'src/public/index.ejs'},
        {from: 'src/public/manifest.json'},
        {from: 'src/public/penguin.png'}
      ])
      // new BundleAnalyzerPlugin()
    ]
  });

  if (isDev) {
    clientConfig.devtool = 'cheap-module-eval-source-map';
  }

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
