function out(path) {
    return 'deploy/' + path
}

var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './js/app.js',
    output: {
        filename: out('bundle.js')
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'index.html', to: out('') },
            { from: 'css/hollow_print.css', to: out('css') }
        ])
    ]
};