const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

const EslintWebpackPlugin = require('eslint-webpack-plugin')

new EslintWebpackPlugin({
  extensions: ['js'],
  fix: true
})

const IS_DEV = process.env.NODE_ENV === 'development'
const IS_PROD = !IS_DEV


const optimization = () => {
  return {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserPlugin()]
  }
}
const fileHash = (ext) => (IS_DEV ? `[name].${ext}` : `[name].[fullhash].${ext}`);

const cssLoaders = (extra) => {
  const loaders = [{loader: MiniCssExtractPlugin.loader}, 'css-loader']
  if (extra) {
    loaders.push(extra)
  }
  return loaders;
}
setPlugins = () => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: "../index.html"
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'favicon.png'),
          to: path.resolve(__dirname, 'dist'),
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: fileHash('css')
    })
  ]
  if (IS_PROD) {
    //
  }
  if (IS_DEV) {
    //
  }
  return plugins
}
const jsLoaders = (extra) => {
  const loaders = {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }

  if (extra) loaders.options.presets.push(extra)

  return loaders
}
module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['./index.jsx'],
    stat: './statistics.ts'
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: fileHash('js')
  },
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.ts',
      '.jsx',
      '.tsx',
      '.css',
      '.xml',
      '.csv',
      '.png',
      '.jpg',
      '.jpeg',
      '.gif',
      '.webp'
    ],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@css': path.resolve(__dirname, 'src/css'),
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: false
  },
  devtool: IS_DEV ? 'source-map' : false,
  plugins: setPlugins(),
  module: {
    rules: [
      // {
      //   test: /\.m?js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   }
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: jsLoaders('@babel/preset-typescript')
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: jsLoaders('@babel/preset-react')
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.s[ca]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash][ext]'
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash][ext]'
        }
      },
      {
        test: /\.xml$/,
        use: 'xml-loader'
      },
      // {
      //   test: /\.json$/,
      //   use: 'json-loader'
      // },
      {
        test: /\.csv$/,
        use: ['csv-loader']
      }
    ]
  }
}
