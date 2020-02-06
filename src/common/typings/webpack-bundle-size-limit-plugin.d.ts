declare module 'webpack-bundle-size-limit-plugin' {
  import { Compiler } from 'webpack';

  interface ConstructorArgs {
    config?: string;
    include?: string[];
    enforceForAllBundles?: boolean;
    decimalPlaces?: number;
  }

  class WebpackBundleSizeLimitPlugin {
    constructor(args: ConstructorArgs);
    apply(compiler: Compiler): void;
  }

  export default WebpackBundleSizeLimitPlugin;
}
