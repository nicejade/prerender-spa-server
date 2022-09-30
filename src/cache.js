const { createClient } = require('redis')

const { redisConf } = require('./config.js')

let client

module.exports = {
	init: async () => {
		client = createClient(redisConf)
		client.on('error', (err) => console.log('Redis Client Error', err))
		await client.connect()
	},

	requestReceived: async (req, res, next) => {
		const result = await client.get(req.prerender.url)
		if (!!result) {
			req.prerender.cacheHit = true
			return res.send(200, result)
		}
		next()
	},

	beforeSend: async (req, res, next) => {
		const prerender = req.prerender
		if (!prerender.cacheHit && prerender.statusCode == 200) {
			await client.set(prerender.url, prerender.content, {
				EX: redisConf.expire,
			})
		}
		next()
	},
}
