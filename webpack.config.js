const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const paths = {
    build: path.resolve(__dirname, './www/build'),
    src: path.resolve(__dirname, './assetsSource'),
    www: path.resolve(__dirname, './www'),
};
// вывод информации при сборке в консоль. полезно для отображения ошибок
const stats = {
    colors: true,
    errorDetails: true,
};
const defaultPort = 8000;
const isProd = 'production' === process.env.NODE_ENV;
const cleanOptions = {
    dry: false,
    verbose: true,
};

const plugins = [
    new HtmlWebPackPlugin({
        alwaysWriteToDisk: true, // генерация записи на диск для локального запуска
        inject: true, // все скрипты будут грузиться после body
        hash: true, // добавляет в конце файла хеш чтобы не кешировались стили
        template: path.resolve(paths.src, './index.html'), // путь к шаблону
        filename: path.resolve(paths.www, './index.html'), // путь к файлу
    }),
    new HtmlWebpackHarddiskPlugin(),  // плагин позволяет убрать пути по умолчанию
    new MiniCssExtractPlugin({
        filename: isProd ? '[name].min.css' : '[name].css',
        chunkFilename: isProd ? '[id].min.css' : '[id].css',
    }),
];

if (isProd) {
    plugins.unshift(
        new CleanWebpackPlugin(paths.build, cleanOptions)); //порядок важен, сначала идет отчистка билдов
}

/*минимизация сss и js*/
const minimizer = [
    new UglifyJsPlugin({
        uglifyOptions: {
            compress: {
                typeofs: false,
                comparisons: true,
                conditionals: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                sequences: true,
                unused: true,
                warnings: false,
            },
            output: {
                ascii_only: true,
                comments: true,
            },
        },
        cache: true,
        parallel: true,
        sourceMap: true,
    }),
    new OptimizeCSSAssetsPlugin({}),
];

module.exports = {
    context: paths.src,
    devServer: {
        contentBase: paths.www,
        historyApiFallback: true, // fallBack for API
        inline: true,
        port: defaultPort,
        stats,
    },
    entry: {
        app: './app/index',
        vendors: [
            'babel-polyfill',
            'react',
            'react-dom',
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,              // определяем тип файлов
                exclude: /node_modules/,    // исключаем из обработки папку node_modules
                use: {
                    loader: 'babel-loader'  // определяем загрузчик
                }
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
            {
                test: /.*\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    limit: 5000,
                    name: 'img/[hash:8].[ext]?[hash:4]',
                },
            },
            {
                test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[hash:8].[ext]?[hash:4]',
                },
            },
        ]
    },
    optimization: {
        minimizer: minimizer, // по дефолту включен в прод режиме
        splitChunks: {
            automaticNameDelimiter: '-',
        }
    },
    output: {
        filename: '[name].min.js',
        chunkFilename: '[name].min.js',
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
    stats,
};
