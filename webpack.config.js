const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const mode = 'development';

module.exports = {
  mode,
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: [
          path.resolve(__dirname, '@config'),
          path.resolve(__dirname, 'src'),
        ],
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: mode !== 'development',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: mode !== 'development',
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
      ignoreOrder: true,
    }),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
      template: path.resolve(__dirname, 'views/template.ejs'),
      filename: path.resolve(__dirname, 'views/main.ejs'),
    }),
  ],
  optimization: {
    nodeEnv: mode,
    minimize: mode !== 'development',
    minimizer: [new TerserPlugin({})],
  },
  entry: {
    bundle: path.resolve(__dirname, 'src/index.tsx'),
  },
  output: {
    publicPath: '/static/dist/',
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'public/dist'),
    chunkFilename: '[name].[chunkhash].js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      api: path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@config': path.resolve(__dirname, 'src/@config/'),
      '@hooks': path.resolve(__dirname, 'src/@hooks/'),
      '@libs': path.resolve(__dirname, 'src/@libs/'),
      '@redux': path.resolve(__dirname, 'src/redux/'),
    },
  },
  performance: {
    maxEntrypointSize: 1024 * 1000,
    maxAssetSize: 1024 * 1000,
  },
};
