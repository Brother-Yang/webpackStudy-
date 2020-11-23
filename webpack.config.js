let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let MiniLessExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true, // 是否有缓存
                parallel: true, // 并发打包
                sourceMap: true, // 源码映射
            }),
            new OptimizeCss() // 压缩 css
        ]
    },
    mode: 'production', // production development
    entry: './src/index.js', // 入口
    output: {
        filename: 'bundle.[hash:8].js', // 打包后的文件名
        path: path.resolve(__dirname, 'build'), // 路径必须是一个绝对路径
    },
    plugins: [ // 数组
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            hash: true,
            // minify: { // 最小化操作
            //     removeAttributeQuotes: true, // 删除双引号
            //     collapseWhitespace: true, // 空号
            // }
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new MiniLessExtractPlugin({
            filename: 'main.less'
        })
    ],
    module: { // 模块
        rules: [
            // loader的特点 希望单一
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // 生成 css 文件
                    'css-loader',
                    'postcss-loader', // 自动加前缀
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniLessExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader', // 从下到上执行，先执行 lloadess-er
                ]
            }
        ]
    }
}