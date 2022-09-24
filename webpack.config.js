const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
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
                { from: 'src/background.js', to: '[name][ext].chrome' },
                { from: 'src/content-script.js', to: '[name][ext].chrome' },
                { from: 'src/output.css', to: '[name][ext]'}
            ]
        })
    ],
    module: {
        rules: [
            {   
                test: /.*.js(?!\.chrome$)/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',  
                            '@babel/preset-react',
                            {
                                'plugins': ['@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-dynamic-import'] // dynamic import seems to have allowed map function on react
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
    }
}