module.exports = {
    entry: "./js/app.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};