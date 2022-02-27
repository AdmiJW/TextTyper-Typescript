const path = require('path');


module.exports = {
    mode: 'production',
    entry: './src/keysound/inject.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '..', '..', 'dist', 'styling'),
        library: {
            name: "TextTyperStyling",
            type: "umd",
            export: 'default'
        },
        scriptType: 'module'
    },
};