const HtmlWebPackPlugin = require("html-webpack-plugin");

const plugins = [
    new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
    }),
];

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,              // определяем тип файлов
                exclude: /node_modules/,    // исключаем из обработки папку node_modules
                use: {
                    loader: "babel-loader"  // определяем загрузчик
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: plugins,
};
