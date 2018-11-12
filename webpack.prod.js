const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CriticalPlugin = require("critical-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    zindex: false,
                },
            }),
        ],
    },
    module: {
        rules: [
            /* SCSS */
            {
                test: /\.s?[ac]ss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader', options: { sourceMap: true } },
                    "postcss-loader",
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ],
            },
            /* IMAGES */
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    { loader: 'file-loader', options: { name: "assets/[name].[ext]" } },
                    { loader: 'image-webpack-loader' },
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist/'),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].css"
        }),
        new CriticalPlugin(),
    ],
});