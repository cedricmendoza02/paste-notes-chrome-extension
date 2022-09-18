const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    devServer: { // required by reactJS.
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    entry: {
        options: {
            publicPath: path.resolve(__dirname, '/src/options.js'),
            import: './src/options.js'
        },
        popup: {    
            publicPath: path.resolve(__dirname, '/src/popup.js'),
            import: './src/popup.js'
        }
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
                            '@babel/preset-react',
                            {
                                'plugins': ['@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-dynamic-import']
                            }
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
            chunks: ['options'],
            template: 'src/options.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Popup Page',
            filename: 'popup.html',
            chunks: ['popup'],
            template: 'src/popup.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/manifest.json', to: '[name][ext]' },
                { from: 'src/background.js', to: '[name][ext]' },
                { from: 'src/output.css', to: '[name][ext]'}
            ]
        })
    ]
}