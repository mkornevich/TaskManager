const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //mode: 'development',
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.jsx', '.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html')
        })
    ]
}