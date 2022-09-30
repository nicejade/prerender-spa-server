const prerender = require('prerender')
const cache = require('./cache')

const server = prerender()

server.use(cache)
server.use(prerender.sendPrerenderHeader())
server.use(prerender.browserForceRestart())
// server.use(prerender.blockResources());
server.use(prerender.removeScriptTags())
server.use(prerender.httpHeaders())

server.start()
