const path = require('path'),
    Copy = require('copy-webpack-plugin');


module.exports = {
    mode:    'development',
    devtool: 'source-map',
    entry:   './src/js/index.js',
    output:  {
        path:     path.resolve('./public'),
        filename: './js/bundle.js',
    },
    plugins: [
        new Copy([
            { from: 'src/html', to: './' },
            { from: 'src/icons/favicon.ico', to: './' },
        ])
    ],
    module:  {
        rules: [
            {
                test: /\.less$/,
                use:  [
                    "style-loader",
                    {
                        loader:  "css-loader",
                        options: {
                            sourceMap:      true,
                            modules:        true,
                            localIdentName: "[local]"
                        }
                    },
                    "less-loader"
                ]
            },
            {
                test:    /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader:  "url-loader",
                options: {
                    outputPath: "fonts",
                    name:       "[name].[ext]",
                    mimetype:   "application/font-woff",
                    limit:      10000,
                }
            },
            {
                test:    /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader:  "file-loader",
                options: {
                    outputPath: 'fonts',
                    name:       "[name].[ext]"
                }
            },
            {
                test:    /\.(jpe?g|png)$/i,
                loader:  'file-loader',
                options: {
                    outputPath: 'images'
                }

            }
        ]
    }
};
