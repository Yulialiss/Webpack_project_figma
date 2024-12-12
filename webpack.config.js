import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';
import fastGlob from 'fast-glob';
import process from 'node:process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';

// РЁСѓРєР°С”РјРѕ РІСЃС– Pug-С€Р°Р±Р»РѕРЅРё Сѓ РїР°РїС†С– src/pug/pages/
const pages = fastGlob.sync('./src/pug/pages/*.pug');

const config = {
  entry: './src/index.js', // РЇРєС‰Рѕ РІР°Рј РїРѕС‚СЂС–Р±РµРЅ JS РґР»СЏ РѕСЃРЅРѕРІРЅРѕРіРѕ entry
  output: {
    path: path.resolve(__dirname, 'dist'), // РљСѓРґРё Р·Р±РµСЂС–РіР°С‚Рё СЂРµР·СѓР»СЊС‚Р°С‚
    filename: '[name].js', // Р¦Рµ РґР»СЏ JS, СЏРєС‰Рѕ РІС–РЅ РїРѕС‚СЂС–Р±РµРЅ
  },
  mode: isProduction ? 'production' : 'development',
  devtool: 'source-map',
  devServer: {
    open: true,
    host: 'localhost',
    hot: true,
    port: 8080,
    watchFiles: ['./src/**/*'],
  },
  plugins: [
    // РџРµСЂРµРІС–СЂСЏС”РјРѕ, С‡Рё РїСЂР°РІРёР»СЊРЅРѕ РїС–РґРєР»СЋС‡Р°С”РјРѕ HtmlWebpackPlugin РґР»СЏ РєРѕР¶РЅРѕРіРѕ С€Р°Р±Р»РѕРЅСѓ
    ...pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, page),  // РЁР»СЏС… РґРѕ Pug-С€Р°Р±Р»РѕРЅСѓ
          filename: path.basename(page, '.pug') + '.html',  // Р“РµРЅРµСЂР°С†С–СЏ HTML Р· С–Рј'СЏРј СЃС‚РѕСЂС–РЅРєРё
          // inject: false,  // РЇРєС‰Рѕ РїРѕС‚СЂС–Р±РЅРѕ РІСЂСѓС‡РЅСѓ РІСЃС‚Р°РІРёС‚Рё СЃРєСЂРёРїС‚Рё С‚Р° СЃС‚РёР»С–
        })
    ),
    new MiniCssExtractPlugin({
      filename: 'styles.css', // Р—Р±РёСЂР°С”РјРѕ CSS РІ РѕРєСЂРµРјРёР№ С„Р°Р№Р»
    }),
    isProduction && new GenerateSW(), // Р”Р»СЏ РїСЂРѕРіСЂРµСЃРёРІРЅРѕРіРѕ РєРµС€СѓРІР°РЅРЅСЏ
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.pug$/, 
        loader: 'pug-loader', 
      },
    ],
  },
};

export default () => config;