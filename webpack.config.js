const path = require('path');

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: "build.js",
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader?[name].[ext]&outputPath=images/',
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};