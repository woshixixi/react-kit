const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: ['webpack-hot-middleware/client?reload=true', './src/index.tsx'],
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            },
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            inject: 'body'
        }),
        new webpack.HotModuleReplacementPlugin()
    ].concat(process.env.ANALYZE_MODE ? [new BundleAnalyzerPlugin()] : [])
};
