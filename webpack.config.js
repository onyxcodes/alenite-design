const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    entry: './src/index.ts',
    experiments: {
        outputModule: true,
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        library: {
            type: "module",
        },
    },
    externals: {
        react: 'react',
        reactDOM: 'react-dom'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['css-loader'],
            },
            {
                test: /\.(ts|tsx)$/i,
                loader: "ts-loader",
                exclude: ['/node_modules/'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {modules: true}},
                    'sass-loader'],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
      ],
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.tsx',
            '.ts'
        ],
        alias: {
            'styles': path.resolve(__dirname, "src/styles"),
            'components': path.resolve(__dirname, "src/components"),
            'hooks': path.resolve(__dirname, "src/hooks"),
            'utils': path.resolve(__dirname, "src/utils"),
        }
    },
};

module.exports = () => {
    return config;
}