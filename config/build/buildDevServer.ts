import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';
import path from 'path';

export default function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    open: true,
    historyApiFallback: true,
    hot: true,
    liveReload: true,
    static: {
      watch: true,
      directory: path.join(__dirname, "src")
    }
  };
}