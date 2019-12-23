import * as merge from 'webpack-merge';
import * as config from './webpack.common.config';

export default merge.smart(config.commonWebpackConfig, {
  entry: './src/client/ClientEntry.tsx',
  devtool: 'cheap-module-eval-source-map',
  target: 'web',
  output: {
    filename: `client.js`,
    chunkFilename: '[name].client.bundle.js',
  }
});
