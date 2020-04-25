declare module 'html-webpack-plugin' {
  import { Compiler } from 'webpack';

  interface ConstructorArgs {
    title?: string;
    filename?: string;
    template?: string;
  }

  class HtmlWebpackPlugin {
    constructor(options: ConstructorArgs);
    apply(compiler: Compiler): void;
  }

  export default HtmlWebpackPlugin;
}
