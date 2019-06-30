const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const webpack = require('webpack');
const fs = require('fs');

const localhost = (function getLocalIp () {
    return (
        Object.values(require('os').networkInterfaces())
            .reduce((prev, cur) => prev.concat(cur), [])
            .map(item => item.address)
            .find(address => /192\.168\.(\d{1,2})\./.test(address)) ||
        'localhost'
    );
})();

const plugins = [
    new CleanWebpackPlugin({
        verbose: true
    }),
    new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        chunksSortMode: 'none'
    }),
    new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css'
    }),
    new webpack.DefinePlugin({
        'process.env.VERSION': JSON.stringify(
            JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf8' }))
                .version
        )
    })
];

const isAnalysis = process.argv.indexOf('--analysis') > -1;

if (isAnalysis) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
        .BundleAnalyzerPlugin;
    plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].bundle.js'
    },
    resolve: {
        alias: {
            src: path.join(__dirname, 'src')
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    enforce: true,
                    priority: -20
                }
            }
        },
        runtimeChunk: 'single'
    },
    devtool: 'source-map',
    devServer: {
        port: 8089,
        host: localhost,
        historyApiFallback: {
            rewrites: [{ from: /^\/$/, to: '/index.html' }]
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /favicon\.ico$/,
                loader: 'url-loader',
                options: {
                    limit: 0,
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    plugins
};
