const path = require('path'),
    Copy = require('copy-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

let plugins = [
        new Copy([
            { from: 'src/html', to: './' },
            { from: 'src/icons/favicon.ico', to: './' },
        ]),
        new ExtractTextPlugin('template.css')
    ],

    dev = true;

process.argv.forEach(param => {
    // если webpack запущен с командой --mode production
    if (param === 'production')
        dev = false;
});

module.exports = {
    mode:    dev ? 'development' : 'production',
    devtool: dev ? 'source-map' : false,
    entry:   './src/js/index.js',
    output:  {
        path:     path.resolve('./public'),
        filename: './scripts/bundle.js',
    },
    plugins,
    module:  {
        rules: [
            {
                test:    /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use:     {
                    loader:  "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.less$/,
                use:  ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:      [
                        { loader: 'css-loader', options: { sourceMap: true } },
                        {
                            loader:  'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins:   [
                                    require('autoprefixer')({
                                        browsers:['ie >= 10', 'last 2 version']
                                    }),
                                    require('cssnano')
                                ]
                            },
                        },
                        { loader: 'less-loader', options: { sourceMap: true } }
                    ]
                })
            },
            {
                test:    /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
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
