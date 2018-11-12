const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    module: {
        rules: [
            /* IMAGES */
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    { loader: 'file-loader', options: { name: "assets/[name].[ext]" } },
                ]
            }
        ]
    }
});