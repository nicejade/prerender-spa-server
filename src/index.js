const prerender = require('prerender')
// const RedisCache = require('./cache')

const server = prerender({
	chromeFlags: [
		'--no-sandbox',
		'--headless',
		'--disable-gpu',
		'--remote-debugging-port=9222',
		'--hide-scrollbars',
	],
})

server.use(prerender.sendPrerenderHeader())
server.use(prerender.browserForceRestart())
server.use(prerender.blockResources())
server.use(prerender.removeScriptTags())
server.use(prerender.httpHeaders())
server.use(RedisCache)
// server.use(require('prerender-memory-cache'))

server.start()
