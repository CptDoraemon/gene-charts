const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: [
        path.resolve(__dirname, 'src/index.js'),
    ],
    output: {
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: '[name].[contenthash].chunk.js',
        path: path.resolve(__dirname, 'examples'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Gene Charts',
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
