const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const nodemon = require('nodemon-webpack-plugin');
const fs = require('fs');

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
        test: /\.(ico|jpg|png|gif|webp)$/, use: [
          {
            loader: 'file-loader', 
            options: { 
                name: '[name]-[hash:8].[ext]', 
								outputPath: 'public/assets/images',
								publicPath: 'assets/images'
						}
          }
        ]
      },
			{
        test: /\.(eot|ttf|woff2?)$/, use: [
          {
            loader: 'file-loader', 
            options: { 
                name: '[name]-[hash:8].[ext]', 
								outputPath: 'public/assets/fonts',
								publicPath: 'assets/fonts'
						}
          }
        ]
      },
			{
        test: /\.(pdf)$/, use: [
          {
            loader: 'file-loader', 
            options: { 
                name: '[name]-[hash:8].[ext]', 
								outputPath: 'public/assets/others',
								publicPath: 'assets/others'
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
			...fs.readdirSync(__dirname + '/src/pages/').flatMap(f => {
				const file = `./src/pages/${f}/client.tsx`;
				return fs.existsSync(file) ? file : [];
			})
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
			watch: path.resolve(__dirname, 'build/'),
			env: {
				NODE_ENV: 'development'
			},
			script: 'server.js'
		})
	],
	externals: [nodeExternals(), {express: 'commonjs express'}]
};

module.exports = [client, server]