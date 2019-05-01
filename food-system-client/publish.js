var path = require('path');
var client = require('scp2');
// const pkgConfig = require('./package.json'); //版本信息，看情况

// var hostInfo = require('./.publish.json');

var sourcePath = path.resolve(__dirname, './dist');
console.log(sourcePath);

client.scp(
	sourcePath,
	{
		host: '47.107.150.235',
		username: 'root',
		password: 'ZZwo913845.',
		path: '/root',
	},
	function(err) {
		if (err) {
			console.log('打包发布错误：' + err);
			throw err;
		} else {
			console.log('发布成功！');
		}
	}
);
