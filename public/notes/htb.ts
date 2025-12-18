//* Prying Eyes
// we exploite an ImageMagick LFI
// Attackers craft a malicious PNG using CVE-2022-44268,
// upload it while intercepting the request  to inject a
// parameter containing ImageMagick commands (-write uploads/hi.png),
// which causes the server to write sensitive file contents (like /etc/passwd) into the output image's metadata
// The flag is then extracted by downloading the generated image and using exiftool to read the embedded hex data from the EXIF metadata.

//* Dusty Alleys
// there was a secret host
// we needed to send no Host header to the backend server so it autofills the secret host
// then give it back to us , n but in http1/1 host header is mandatory
// so we used http1/0 to send no host header then the application replied with the secret host in the response body

//* Interstellar
// in php 7.0 using url filter + parse_url and whitelistng the hostnames is bypassable
// using : 0://localhost:80;motherland.com:80/

//* Stylish
// we can extract data from a web page using only css
// https://sekurak.pl/wykradanie-danych-w-swietnym-stylu-czyli-jak-wykorzystac-css-y-do-atakow-na-webaplikacje/
// https://x-c3ll.github.io/posts/CSS-Injection-Primitives/

//* Mutation Lab
// we exploited convert-svg-core LFI to read env vars and forge a valid admin cookie

//* ExpressionalRebel
// we exploited an ssrf to use and internal endpoint that allows regex matching with the flag
// using a redos we can make the server take too much time
// when hitting the wright character so we could find the flag char par char

//* WAFfle-y Order
// bypass regex based waf using some php variance to leverage a magic method on an object that evaluates xml
// then bypasses another regex using utf-16 encoding tp perform xxe and get the flag
// https://github.com/MegadodoPublications/exploits/blob/master/composr.md#the-moderately-cool-way-that-works

//* Red Island
// first we could send requests using libcurl with any protocol so we could read src code of the app using file://
// then we found in the src code that redis is used
// since we can send requests from the server we can coomunicate with  redis
// but not via http so we use gopher protocol to communicate with redis and get info
// we found that its v5.0.7  then we used  CVE-2022-0543 to get rce and execute code (then quit)
// ex : gopher://127.0.0.1:6379/_%0D%0AINFO%0D%0Aquit%0D%0A

//* EncoDecept
// first we exploite self xss using a special character encoding to bypass the filter
// because there was no charset set in the content-type header
// https://www.sonarsource.com/blog/encoding-differentials-why-charset-matters/
// next we use cache deception to deliver the cached xss to the bot
// we can know act as the box and access a filter endpoint to get the admin passowrd from another model
// via :  owner__password__startswith (django orm)
// finally we access as an admin and we exploit the deserialization vulnerability to get rce
// https://github.blog/security/vulnerability-research/execute-commands-by-sending-json-learn-how-unsafe-deserialization-vulnerabilities-work-in-ruby-projects/

//* pcalc
// the user input was passed into an eval but first filtered using a regex that catched letter and quotes
// to bypass that we used heredoc syntax with octals to represent the letters getting RCE
// https://gist.github.com/ChrisPritchard/50ef7a6c79a2386037a77ccc4709d1ff

//* 