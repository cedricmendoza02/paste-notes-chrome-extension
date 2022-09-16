const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, '/src'),
        historyApiFallback: true
    },
    entry: {
        options: path.resolve(__dirname, 'src/index-options.js'),
        popup: path.resolve(__dirname, 'src/index-popup.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env', 
                            '@babel/preset-react'
                            // {
                            //     'plugins': ['@babel/plugin-proposal-class-properties']
                            // }
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Options Page',
            filename: 'options.html',
            template: 'src/options.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Popup Page',
            filename: 'popup.html',
            template: 'src/popup.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/manifest.json', to: '[name][ext]' },
                { from: 'src/background.js', to: '[name][ext]' }
            ]
        })
    ]
}