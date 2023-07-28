const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const fs = require("fs-extra");
const babelConfig = require("./babel.config");

module.exports = (env, argv) => {
    try {
        fs.removeSync(path.resolve(__dirname, "dist"));
    } catch {
        // Ignore
    }
    return ([{
        name: "Backend",
        context: path.resolve(`${__dirname}`),
        devtool: argv.mode === "production" ? false : "eval",
        resolve: {
            extensions: [".js", ".json"]
        },
        module: {
            rules: [{
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                    ...babelConfig()
                }
            }]
        },
        target: "async-node",
        externals: [],
        optimization: argv.mode === "production" ? {
            splitChunks: false,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    extractComments: false,
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                    },
                })
            ]
        } : {},
        output: {
            hashFunction: "xxhash64",
            libraryTarget: "commonjs2",
            path: path.resolve(__dirname, "dist"),
            filename: "changelog.js",
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.browser": undefined,
                "process.env.BUNDLE": true,
                "typeof window": "'undefined'",
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),
            new ESLintPlugin({
                failOnError: true,
                failOnWarning: true,
            }),
        ],
        node: {
            __dirname: false,
        }
    }]);
};
