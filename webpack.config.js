const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const nodemon = require('nodemon-webpack-plugin');

const base = {
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'build'),
	},
	devtool: process.env.NODE_ENV !== 'production' && 'source-map',
	node: {
		__dirname: false
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
		extensions: ['.ts', '.tsx', '.js', '.json', '.scss', '.css'],
	},
	mode: process.env.NODE_ENV || 'development',
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: "ts-loader" },
			{
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
					{
						loader: 'css-loader',
						options: {
							url: false
						}
					},
          'sass-loader',
        ],
      },
			{
        test: /\.(jpg|png|gif|pdf|ico|eot|ttf|woff2?)$/, use: [
          {
            loader: 'file-loader', 
            options: { 
                name: '[path][name]-[hash:8].[ext]', 
                outputPath: url => url.replace(/^src\/client\//,'public/'),
                publicPath: url => url.replace(/^src\/client\//,'/'),
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgo: false
            }
          }
        ]
      }
		]
	},
};
const client = {
	...base,
	entry: {
		'public/clients/dashboard': [
			// Any extra css should be inside base.scss, not here.
			'./src/assets/styles/base.scss',
			// Put each client here
			'./src/pages/dashboard/client.tsx',
		]
	},
	optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: false,
        default: false,
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          filename: "public/vendor.js",
        }
      }
    },
  },
	plugins: [
		new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'public/styles.css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
	],
};

const server = {
	...base,
	entry: {
		server: './src/server/index.ts',
	},
	target: 'node',
	plugins: [
		new nodemon({
			cwd: path.resolve(__dirname, 'build/'),
			nodeArgs: ['--inspect'],
			watch: path.resolve(__dirname, 'src/'),
			env: {
				NODE_ENV: 'development'
			},
			script: 'server.js'
		})
	],
	externals: [nodeExternals(), {express: 'commonjs express'}]
};

module.exports = [client, server]