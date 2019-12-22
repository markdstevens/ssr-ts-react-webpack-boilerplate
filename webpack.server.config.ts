import * as nodeExternals from 'webpack-node-externals';
import * as merge from 'webpack-merge';
import * as config from './webpack.common.config';

export default merge.smart(config.commonWebpackConfig, {
  entry: `./src/server/app.tsx`,
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: `server.js`,
  }
});
