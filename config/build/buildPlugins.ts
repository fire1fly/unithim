import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

import globule from 'globule';

const pagePaths = globule.find(['src/pug/pages/**/*.pug']);

export default function buildPlugins({ paths, isDev }: BuildOptions):
  webpack.WebpackPluginInstance[] {
  const plugins = [
    ...pagePaths.map(path => new HtmlWebpackPlugin({
      template: path,
      favicon: paths.favicon,
      filename: `${path.split(/\/|.pug/).splice(-2, 1)}.html`
    })),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
    }),
  ];

  if (isDev) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
    );
  }

  return plugins;
}
