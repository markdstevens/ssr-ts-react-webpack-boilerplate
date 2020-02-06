declare module '@loadable/webpack-plugin' {
  import { Compiler } from 'webpack';

  class LoadablePlugin {
    constructor();
    apply(compiler: Compiler): void;
  }

  export default LoadablePlugin;
}
