//! Identifying
//* getting cash headers in the response
// Cache-Control: public, max-age=31536000
// X-Cache: HIT
// X-Cache-Hits: 1
// Vary : exposes the keyed headers
//* finding unkeyed inputs (using param miner)
// right click => extentions => param miner => Guess headers
// result found in : installed => param miner => output
//* finding unkeyed query parameters
// right click => extentions => param miner => Guess query parameters
//* Identify a suitable cache oracle
// An HTTP header that explicitly tells you whether you got a cache hit
// Unkeyed port
// Unkeyed query string
// Unkeyed query parameter (specific one like : utm_content )
// Observable changes to dynamic content
// Distinct response times
// Pragma: akamai-x-get-cache-key || x-get-cache-key => if supported it will return the cache key
//! Exploiting
// deliver XSS
// change imports leading to you js files executed
//* cors
// Access-Control-Allow-Origin: *
//* Cache parameter cloaking
// GET /?example=123?excluded_param=bad-stuff-here
// the cach will see : example=123
// and the server will see :example=123?excluded_param=bad-stuff-here
//* ruby on rails
//   is accepted as a delimiter
// GET /?keyed_param=abc&excluded_param=123;keyed_param=bad-stuff-here
// the cach will see : keyed_param=abc&excluded_param=123
// and the server will see : keyed_param=bad-stuff-here&excluded_param=123
//* JSONP
// GET /jsonp?callback=innocentFunction
// innocentFunction will be called
//* Exploiting fat GET support
// if the http method is not keyed
// GET /?keyed_param=abc
// POST /?keyed_param=abc with body : keyed_param=bad-stuff-here
// will be treated as the same thing
//* if the application does key the http method
// you might be able to override the method
// X-HTTP-Method-Override: POST
//* Normalized cache keys
// most brosers url encode the url so <b> will be sent as %3Cb%3E
// but the cash does normalazation for the url so it will be stored as <b>
// which can lead to a stored xss
//* adding cash buster if the query string is keyed
// Accept-Encoding: gzip, deflate, cachebuster
// Accept: */*, text/cachebuster
// Cookie: cachebuster=1
// Origin: https://cachebuster.vulnerable-website.com
//* will resolve to /
// Apache: GET //
// Nginx: GET /%2F
// PHP: GET /index.php/xyz
// .NET GET /(A(xyz)/
//! Mitigating
// know every small thing related to the cach you're using
// because most third party technologies support unnecessary features that might be exploitable in your case
// no unkeyed inputs
// no fat Get request
