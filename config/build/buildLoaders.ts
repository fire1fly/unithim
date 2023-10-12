import { RuleSetRule } from 'webpack';
import { BuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default function buildLoaders({ isDev }: BuildOptions): RuleSetRule[] {

  const htmlLoader = {
    test: /\.html$/i,
    loader: "html-loader",
  }

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const imagesLoader = {
    test: /\.(png|jpe?g|svg|gif|ico)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'assets/images/[name].[hash:8][ext][query]'
    },
  };
  const fontsLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'assets/fonts/[name].[hash:8][ext][query]'
    },
  };

  const cssLoader = {
    test: /\.(sa|sc|c)ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
  };

  const pugLoader = {
      test: /\.pug$/,
      loader: 'pug-loader',
      exclude: /(node_modules|bower_components)/,
  };

  const babelLoader = {
    test: /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  };

  return [
    htmlLoader,
    pugLoader,
    imagesLoader,
    fontsLoader,
    babelLoader,
    typescriptLoader,
    cssLoader,
  ];
}
