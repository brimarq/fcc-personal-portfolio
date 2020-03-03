const path = require('path');
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin');
const miniHtmlWebpackPluginTemplate = require('@vxna/mini-html-webpack-template');
const postCssUse = require('postcss-use');
// const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackDashboard = require('webpack-dashboard/plugin');

const codePenPostCssUseModules = ['lost', 'postcss-apply', 'postcss-color-function', 'postcss-conditionals', 'postcss-custom-media', 'postcss-discard-comments', 'postcss-each', 'postcss-extend', 'postcss-flexbox', 'postcss-for', 'postcss-media-minmax', 'postcss-mixins', 'postcss-nested', 'postcss-nested-ancestors', 'postcss-preset-env', 'postcss-reverse-media', 'postcss-simple-vars', 'postcss-triangle'];

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
  },
  devServer: { 
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }]
            ]
          }
        }
      },
      {
        test: /\.pug$/,
        include: path.resolve(__dirname, 'src'),
        use: ['pug-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          { loader: 'css-loader', options: { importLoaders: 1 } }, 
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                postCssUse({ modules: codePenPostCssUseModules }),
                // autoprefixer()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpackDashboard(),
    new CleanWebpackPlugin(),
    new MiniHtmlWebpackPlugin({
      context: {
        lang: 'en',
        title: 'Personal Portfolio | fCC Responsive Web Design Projects',
        container: 'root',
        head: {
          links: [
            { rel: "stylesheet", href: "https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/darkly/bootstrap.min.css", integrity: "sha384-rCA2D+D9QXuP2TomtQwd+uP50EHjpafN+wruul0sXZzX/Da7Txn4tB9aLMZV4DZm", crossorigin: "anonymous"}
          ],
          scripts: [
            { defer: true, src: 'https://use.fontawesome.com/releases/v5.3.1/js/all.js' }
          ]
        },
        body: {
          scripts: [
            { src: "https://code.jquery.com/jquery-3.4.1.slim.min.js", integrity: "sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n", crossorigin: "anonymous" },
            { src: "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js", integrity: "sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo", crossorigin: "anonymous" },
            { src: "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js", integrity: "sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6", crossorigin: "anonymous" },
            { src: 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js' }
          ]
        },
        trimWhitespace: true
      },
      template: miniHtmlWebpackPluginTemplate
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
