// Host Header Injection
//! Identifying
//* modify the Host header
//  if you still can reach the app it might be vulnerable
//* if got "invalid host header" try
// Host: vulnerable-website.com:bad-stuff-here
// or duplicate the host header
//* useing absolute path
// GET https://vulnerable-website.com/ HTTP/1.1
// Host: bad-stuff-here
//* Add line wrapping
// GET /example HTTP/1.1
//     Host: bad-stuff-here
// Host: vulnerable-website.com
//* Inject host override headers
// X-Forwarded-Host: bad-stuff-here
// X-Host
// X-Forwarded-Server
// X-HTTP-Host-Override
// Forwarded
//! Exploiting
//* can be used for
// cash poisoning
// ssrf (scan local addresses vai Host header)
//* Connection state attacks
// some systems perform validation only on Host of the first request
// but if you send another one in the same connection it does not get validated
// using Send group (single connection) in burpsuite
//? for more examples
// https://portswigger.net/research/cracking-the-lens-targeting-https-hidden-attack-surface
//! Mitigating
//* what you should do
// don't use Host header on the server
// use ALLOWED_HOSTS
// remove support for host override headers
// host internal services on a different server
