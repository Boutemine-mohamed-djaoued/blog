// Access Control
//! Exploiting
//* Broken access control resulting from platform misconfiguration
// if server accepts these header they will repace the /  in url
// X-Original-Url: /admin/delete
// X-Rewrite-URL : /admin
//? Note :
//  the params are still written after the url /?username=carlos
//* HTTP methods
// some endpoints will accept other methods if one if forbidden
// so you can try GET instead of POST
//* Broken access control resulting from URL-matching discrepancies
// /ADMIN/DELETEUSER or /admin/deleteUser.anything or /admin/deleteUser/
//  can bypass the security on /admin/deleteUser
//* Referer-based access control
// the website can trust the Referer header to be from an authorized route and not check auth again
