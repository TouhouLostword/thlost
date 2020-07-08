import * as webpack from 'webpack';
import * as path from 'path';
import * as MiniCssExtract from 'mini-css-extract-plugin';

const defaultConfig: webpack.Configuration = {
  mode: 'none',
  entry: {
    unit: path.resolve(process.cwd(), 'src/unit.ts')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(process.cwd(), 'src/tsconfig.json')
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.sass$/,
        use: [MiniCssExtract.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtract.loader, 'css-loader']
      }
    ]
  },
  externals: {
    jquery: 'jQuery'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'js/[name].js',
    publicPath: '/',
    path: path.resolve(process.cwd(), 'public')
  },
  plugins: [
    new MiniCssExtract({
      filename: 'css/[name].css'
    })
  ]
};

export const devConfig: webpack.Configuration = {
  ...defaultConfig,
  devtool: 'inline-source-map',
  mode: 'development'
};

export const prodConfig: webpack.Configuration = {
  ...defaultConfig,
  mode: 'production',
  devtool: 'source-map'
};
