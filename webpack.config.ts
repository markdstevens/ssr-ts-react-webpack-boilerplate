import * as path from 'path';
import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals';
import * as merge from 'webpack-merge';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import * as LoadablePlugin from '@loadable/webpack-plugin';
import * as TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';

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
      // isDev ? new BundleAnalyzerPlugin() : null
    ].filter(plugin => plugin)
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
