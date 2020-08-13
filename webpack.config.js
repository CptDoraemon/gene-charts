const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'examples'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'examples'),
        compress: true,
        port: 3000
    },
    mode: 'production',
    devtool: 'source-map'
};
