<h1 align="center">Prerender SPA Server</h1>

**Prerender SPA Server**：For serving your prerendered HTML to crawlers for SEO, through Prerender & Redis & Nginx.
## How to Use

The quickest way to run your own prerender server:

### **Clone & Install dependencies**

```bash
# clone prerender-spa-server
git clone https://github.com/nicejade/prerender-spa-server.git
cd prerender-spa-server

# install dependencies
pnpm i
# OR yarn / npm
```

### **Deploy Server**

```bash
# deploy server
yarn deploy 
```

### **Configure Nginx**

```
location / {
  set $prerender 0;
  if ($http_user_agent ~* "Googlebot|googlebot|bingbot|baiduspider|twitterbot|facebookexternalhit|rogerbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator") {
    set $prerender 1;
  }
  if ($args ~ "_escaped_fragment_") {
    set $prerender 1;
  }
  if ($prerender = 1) {
    set $prerender "127.0.0.1:3000";
	  rewrite .* /$scheme://$host$request_uri? break;
    proxy_pass http://$prerender;
  }
}
```

### How Test It

```bash
curl http://localhost:3000/render?url=https://www.example.com/
```

## How to dev

```
git clone https://github.com/nicejade/prerender-spa-server.git
cd prerender-spa-server
code ./
```

## Inspiration Source

### [Prerender](https://nicelinks.site/post/62e60030bd6b821eb12244e2)

>Prerender is a node server that uses Headless Chrome to render HTML, screenshots, PDFs, and HAR files out of any web page. The Prerender server listens for an http request, takes the URL and loads it in Headless Chrome, waits for the page to finish loading by waiting for the network to be idle, and then returns your content.

### [Redis](https://nicelinks.site/post/603e39560c8e4b046a182003)

>Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker. Redis provides data structures …

### [Nginx](https://nicelinks.site/post/6339a6aa35a9c117dacf2363)

>nginx [engine x] is an HTTP and reverse proxy server, a mail proxy server, and a generic TCP/UDP proxy server, originally written by Igor Sysoev. For a long time, it has been running on many heavily loaded Russian sites including Yandex, Mail.Ru, VK, and Rambler. According to Netcraft, nginx served or proxied 21.62% busiest sites in August 2022.

### [Prerender In-Memory Cache plugin](https://github.com/prerender/prerender-memory-cache)

>In memory cache for use with Prerender server.

## License

The MIT License ( [MIT](http://opensource.org/licenses/MIT) ) .

Copyright (c) 2022-present, [nicejade](https://nicelinks.site/member/admin) .