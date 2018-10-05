const HtmlWebPackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path');
const paths = {
    build: path.resolve(__dirname, './www/build'),
    src: path.resolve(__dirname, './assetsSource'),
    www: path.resolve(__dirname, './www'),
};
const defaultPort = 8000;
const env = process.env.NODE_ENV || 'development';
const isProd = 'production' === env;

const plugins = [
    new HtmlWebPackPlugin({
        alwaysWriteToDisk: true, // генерация записи на диск для локального запуска
        inject: true, // все скрипты буду грузиться после body
        hash: true, // добавляет в конце файла хеш чтобы не кешировались стили
        template: path.resolve(paths.src, 'index.html'), // путь к шаблону
        filename: path.resolve(paths.www, './index.html'), // путь к файлу
    }),
    new HtmlWebpackHarddiskPlugin(),  // плагин позволяет убрать пути по умолчанию
];

module.exports = {
    context: paths.src,
    devServer: {
        contentBase: paths.www,
        historyApiFallback: true, // fallBack for API
        inline: true,
        port: defaultPort,
    },
    entry: {
        app: './app/index',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,              // определяем тип файлов
                exclude: /node_modules/,    // исключаем из обработки папку node_modules
                use: {
                    loader: "babel-loader"  // определяем загрузчик
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"] // порядок добавление загрузчиков важен
            }
        ]
    },
    output: {
        filename: '[name].min.js',
        path: paths.build,
        publicPath: '/build/',
    },
    resolve: {
        extensions: ['.js', '.jsx'], // определяем расширение файла (значения по умолчанию webpack ['.wasm', '.mjs', '.js', '.json'])
        modules: [
            paths.src,
            'node_modules',
        ],
    },
    plugins: plugins,
};
