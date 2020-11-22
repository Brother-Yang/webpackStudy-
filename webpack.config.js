let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devServer: {
        port: 3000,
        progress: true,
        contentBase: './build',
        compress: true
    },
    mode: 'development', // production development
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
            minify: { // 最小化操作
                removeAttributeQuotes: true, // 删除双引号
                collapseWhitespace: true, // 空号
            }
        })
    ]
}