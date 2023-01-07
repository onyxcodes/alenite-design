const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const components = {
    entry: {
        button: ['./src/components/Button/index.scss', './src/styles/theme.scss'],
        alert: ['./src/components/Alert/index.scss', './src/styles/theme.scss'],
        list: ['./src/components/List/index.scss', './src/styles/theme.scss'],
        sidebar: ['./src/components/Sidebar/index.scss', './src/styles/theme.scss'],
        modal: ['./src/components/Modal/index.scss', './src/styles/theme.scss'],
        searchbar: ['./src/components/SearchBar/index.scss', './src/styles/theme.scss'],
        select: ['./src/components/Form/Select/index.scss', './src/styles/theme.scss'],
        textInput: ['./src/components/Form/TextInput/index.scss', './src/styles/theme.scss'],
        actionBar: ['./src/components/ActionBar/index.scss', './src/styles/theme.scss'],
        global: ['./src/styles/global.scss', './src/styles/theme.scss'],
    },
    output: {
        path: path.resolve(__dirname, 'lib/styles'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {modules: false}},
                    'sass-loader'
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
    ],
    resolve: {
        extensions: [
            '.scss'
        ],
    }
}

const config = {
    entry: './src/index.ts',
    experiments: {
        outputModule: true,
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        library: {
            type: 'module',
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
                use: [MiniCssExtractPlugin.loader,'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {modules: false}},
                    'sass-loader'
                ],
            },
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "index.css",
        }),
    ],
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.tsx',
            '.ts',
            '.scss'
        ],
        alias: {
            'styles': path.resolve(__dirname, 'src/styles'),
            'components': path.resolve(__dirname, 'src/components'),
            'hooks': path.resolve(__dirname, 'src/hooks'),
            'utils': path.resolve(__dirname, 'src/utils'),
        }
    },
};

module.exports = () => {
    return [components, config];
}