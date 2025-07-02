// Web Cash Deception
//! How cashing works
//* cash keys
// cashing servers generate a cash key based on url path and query parameters ( or even some headers )
// if the cash key matches an existing cash key, the server returns the cached response
//* cash rules
// determine whether a resource should be cached or not based on :
// - static file extension rules : .js
// - static directory rules : /static
// - file name rules : robots.txt
//! Constructing an attack
//* step 1
// Identify a target endpoint that returns a dynamic response containing sensitive information.
//* step 2
// Identify a discrepancy in how the cache and origin server parse the URL path. This could be a discrepancy in how they:
// - Map URLs to resources.
// - Process delimiter characters.
// - Normalize paths.
//* step 3
// Craft a malicious URL that uses the discrepancy to trick the cache into storing a dynamic response.
// When the victim accesses the URL, their response is stored in the cache.
// you can then send a request to the same URL to fetch the cached response containing the victim's data.
//! Exploiting static extention cash rules
//* Path mapping discrepancies
// looking at : http://example.com/user/123/profile/foo.js
// the server  might see the foo.js an unnecessary parameter
// but the cache might see it as a static file if configured to cache .js files
// the resulte the dynamic response from the server with be cashed
//* Delimiter discrepancies
// looking at : http://example.com/profile{delimiter}foo.js
// the server will consider the delimter return /profile
// but the cache might not do that and consider the whole path as a static file
// the result is the dynamic response from the server with be cashed
//? spring boot
// uses ";" as a delimiter
//? ruby on rails
// uses "." as a delimiter
//? other frameworks
// might use the null character "%00" as a delimiter
//? portswigger delimiter list :
// https://portswigger.net/web-security/web-cache-deception/wcd-lab-delimiter-list
//* Delimiter decoding discrepancies
// looking at : http://example.com/profile%23foo.js
// the server will decode the %23 to # and consider it as a delimiter returning /profile
// but the cache might not decode it and consider the whole path as a static file
//! Exploiting static directory cache rules
//* Normalization discrepancies
// looking at : /static/..%2fprofile
// the server will normalize the path to /profile
// but the cache might not normalize the path and consider it as a static file since
// it is configured to cache /static directory
//* Detecting normalization by the origin server
// if you send /aaa/..%2fprofile and got the response to /profile
// knowing that /profile is not cachable (using POST method for example)
// the origin server is normalizing the path
//? exploite :
// send /assets/..%2fprofile the /profile fo the victim will be cached
//* Detecting normalization by the cache server
// lets say that /assets/hello.js is cached
// if you send /aaa/..%2fassets/hello.js and got a hit it means that it has been normalized
//? exploite :
// /profile{delimiter}%2f%2e%2e%2fassets the /profile fo the victim will be cached
//! Exploiting file name cache rules
//* Exploiting normalization discrepancies
// lets say that index.html is cached
// with cache server normalizing the path
// /profile{delimiter}%2f%2e%2e%2findex.html
//! Mitigation
//* you need to :
// Use Cache-Control to mark dynamic resources with private  or no-store
// Verify that there aren't any discrepancies between how the origin server and the cache interpret URL paths.
// Verity that content-type matches request's url file extentions
