const path = require('path'),
    Copy = require('copy-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');


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
        ]),
        new ExtractTextPlugin('template.css')
    ],
    module:  {
        rules: [
            {
                test: /\.less$/,
                use:  ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:      ['css-loader', 'less-loader']
                })
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
