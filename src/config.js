exports.redisConf = {
	host: '127.0.0.1',
	port: 6379,
	db: 0,
	return_buffers: true,
	// redis default expire [seconds] = 10d
	expire: 60 * 60 * 24 * 10,
}

// Prevent villains from using functions to invade servers @2022/12/07
exports.domainNameWhiteList = ['nicelinks.site']
