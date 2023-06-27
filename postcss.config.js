module.exports = {
	plugins: {
		'postcss-pxtorem': {
			// rootValue: 37.5,
			rootValue({ file }) {
				return file.indexOf('vant') !== -1 ? 37.5 : 75 //如果是vant的文件资源，则设置为37.5；如果不是vant的文件资源，则设置为75
			},
			propList: ['*'],
		},
	},
}
