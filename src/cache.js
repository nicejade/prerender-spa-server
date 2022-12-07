const Url = require('url')
const { createClient } = require('redis')

const { domainNameWhiteList, redisConf } = require('./config.js')
let client

const isTargetUrl = (path) => {
	const pathname = Url.parse(path, true).hostname
	return domainNameWhiteList.includes(pathname)
}

module.exports = {
	init: async () => {
		client = createClient(redisConf)
		client.on('error', (err) => console.log('Redis Client Error', err))
		await client.connect()
	},

	requestReceived: async (req, res, next) => {
		if (!isTargetUrl(req.prerender.url)) return

		const result = await client.get(req.prerender.url)
		if (!!result) {
			console.log(`⚡️ Return Cache: ${req.prerender.url}`)
			req.prerender.cacheHit = true
			return res.send(200, result)
		}
		next()
	},

	beforeSend: async (req, res, next) => {
		const prerender = req.prerender
		if (!isTargetUrl(prerender.url)) return

		if (!prerender.cacheHit && prerender.statusCode == 200) {
			console.log(`🎉 Cache Hit: ${prerender.url}`)
			await client.set(prerender.url, prerender.content, {
				EX: redisConf.expire,
			})
		}
		next()
	},
}
