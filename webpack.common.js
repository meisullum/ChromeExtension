const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// will go into my test tsx file and webpack will start looking for dependencies

// plugins are not related to editing files themselves / handling dependencies.
// anything not handled by module can be handled by plugin

//chunk is single html file populated by webpack
module.exports = {
    // mode: 'development',
    // devtool: 'cheap-module-source-map',
    entry: {
        popup: path.resolve('src/popup/popup.tsx'),
        options: path.resolve('src/options/options.tsx'),
        background: path.resolve('src/background/background.ts'),
        contentScript: path.resolve('src/contentScript/contentScript.ts'),
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/,
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/i,
            },
            {
                type: 'asset/resource',
                test: /\.(jpg|jpeg|png|woff|woff2|eot|tt|svg)$/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve('src/static'),
                    to: path.resolve('dist')
                }
            ]
        }),
        ...getHtmlPlugins(
            [
                'popup',
                'options'
            ]  
        ),
        // new HtmlPlugin(
        //     {
        //         title: 'React Extension',
        //         filename: 'popup.html',
        //         chunks: ['popup']
        //     },
            // {
            //     title: 'Options Extension',
            //     filename: 'options.html',
            //     chunks: ['options']
            // },
        // )
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        // name processed by webpack
        // each file will have dependency graph w/diff dependencies
        filename: '[name].js',
        path: path.resolve('dist')
    },    
    optimization: {
        // allows chunks to share modules
        splitChunks: {
            chunks: 'all',
        },
    }

}

function getHtmlPlugins(chunks) {
    return chunks.map(chunk => new HtmlPlugin({
        title: 'React Extension',
        filename: `${chunk}.html`,
        chunks: [chunk]
    }));
}