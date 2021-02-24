const path = require('path');

module.exports = {
    mode: 'production',
    target: 'web',
    entry: './_src/js/index.js',
    output: {
        filename: 'custom.js',
        path: path.resolve(__dirname, './assets')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};