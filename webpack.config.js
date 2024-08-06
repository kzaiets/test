const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    //mode: "development",
    entry: {
        'app':"./src/index.js",
        'bar_chart': "./src/bar_chart/bar_chart.js",
        'bar_chart_vertical': "./src/bar_chart/bar_chart_vertical.js",
        'bar_chart_svelte': "./src/bar_chart_svelte/bar_chart_svelte.js",
        'scatter_plot': "./src/scatter_plot/scatter_plot.js",
        'line_chart_svelte':'./src/line_chart_svelte/line_chart_svelte.js',
        'bar_pixi':'./src/bar_pixi/bar_pixi.js'
    }, //entrypoint for webpack
    output: {
        path: __dirname,
        filename: "apps/[name]/build/bundle.js"
    },
    // resolve: {
    //     mainFields: ['browser', 'module', 'main', 'svelte'],
    //   },
    plugins:[new HtmlWebpackPlugin({
        filename: 'index.html',
        template:'./index.html',
        chunks: ['app']
    }),
    new HtmlWebpackPlugin({
        filename: 'bar_chart.html',
        template:'./bar_chart.html',
        chunks: ['bar_chart']
    }),
    new HtmlWebpackPlugin({
        filename: 'bar_chart_vertical.html',
        template:'./bar_chart_vertical.html',
        chunks: ['bar_chart_vertical']
    }),
    new HtmlWebpackPlugin({
        filename: 'bar_chart_svelte.html',
        template:'./bar_chart_svelte.html',
        chunks: ['bar_chart_svelte']
    }),
    new HtmlWebpackPlugin({
        filename: 'scatter_plot.html',
        template:'./scatter_plot.html',
        chunks: ['scatter_plot']
    }),
    new HtmlWebpackPlugin({
        filename: 'line_chart_svelte.html',
        template:'./line_chart_svelte.html',
        chunks: ['line_chart_svelte']
    }),
    new HtmlWebpackPlugin({
        filename: 'pix.html',
        template:'./pix.html',
        chunks: ['bar_pixi']
    })
],
    module: {
        rules: [
            {
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					
			}},
            {
                test: /\.css$/, //if file ends in .css, how we are handling it
                use: ["style-loader", "css-loader"] //anytime you come across .css file, use css-loader

            },
            {
                test: /\.csv$/,
                loader: 'csv-loader',
                options: {
                    dynamicTyping: true,
                    header: true,
                    skipEmptyLines: true
                }
            },
            {
                // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
                test: /node_modules\/svelte\/.*\.mjs$/,
                resolve: {
                  fullySpecified: false
                }
              }
        ]
    }
}