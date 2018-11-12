const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob_entries = require('webpack-glob-folder-entries')
const path = require('path');

function returnEntries(globPath) {
  let entries = glob_entries(globPath, true);
  let folderList = new Array();
  for (let folder in entries) {
    folderList.push(path.join(__dirname, entries[folder]));
  }
  return folderList;
}

module.exports = {
  entry: "./src/assets/js/index.js",
  module: {
    rules: [
      /* JAVACSRIPT */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      /* HTML */
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: "html-loader",
          options: { minimize: true }
        }
      },
      /* SCSS */
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        // HTML LOADER
        // Super important: We need to test for the html 
        // as well as the nunjucks files
        test: /\.html$|njk|nunjucks/,
        use: ['html-loader', {
          loader: 'nunjucks-html-loader',
          options: {
            // Error: "glob_entries is not defined"
            searchPaths: [...returnEntries('./src/**/*')]
            // searchPaths: ['./src/*/**'],
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `index.html`,
      inject: 'body',
      template: `nunjucks-html-loader!./src/index.njk`,
    }),
    new HtmlWebpackPlugin({
      filename: `foo.html`,
      inject: 'body',
      template: `nunjucks-html-loader!./src/foo.njk`,
    }),
    // new HtmlWebpackPlugin({
    //   template: "./src/index.html",
    //   filename: "./index.html"
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./src/foo.html",
    //   filename: "./foo.html"
    // }),
  ],
  performance: { hints: false }
};
