const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: [
        path.resolve(__dirname, 'src/index.js'),
    ],
    output: {
        filename: '[name].[contenthash:8].bundle.js',
        chunkFilename: '[name].[contenthash:8].chunk.js',
        path: path.resolve(__dirname, 'examples'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        moduleIds: 'hashed',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        runtimeChunk: 'single',
    },
    devServer: {
        contentBase: path.join(__dirname, 'examples'),
        compress: true,
        port: 3000
    },
    mode: 'production',
};
