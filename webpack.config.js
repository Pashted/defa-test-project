const webpack = require('webpack'),
    path = require('path'),
    resizer = require('webpack-images-resizer'),
    copy = require('copy-webpack-plugin'),

    img_list = require('./src/js/images'), // список файлов из папки изображений
    img_options = { width: 2560, quality: 80 };


module.exports = {
    mode:    'development',
    devtool: 'source-map',
    entry:   './src/js/index.js',
    output:  {
        path:     path.resolve('./public'),
        filename: './js/bundle.js',
    },
    plugins: [
        new resizer(img_list, img_options),
        new copy([
            { from: 'src/static', to: './' },
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
