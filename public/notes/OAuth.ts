// OAuth
//! working mechanism
//* client  application
// the web application that wants to access the user's data
//* Resource owner
// the one whose data the client application wants to access
//* OAuth service provider
// The website or application that controls the user's data and access to it.
// They support OAuth by providing an API for interacting with both an authorization server and a resource server.
//! OAuth grant types
//* Definition
// The OAuth grant type determines the exact sequence of steps that are involved in the OAuth process.
// the common OAuth grant types are: authorization code and implicit
//* OAuth scopes
// scopes represent the data that the client application wants to access on behalf of the user.
// its an arbitrary string that the OAuth service provider defines.
//! Authorization code grant type
//* 1. Authorization request
// - client ID : client application id
// - redirect URI : The URI to which the user's browser should be redirected when sending the authorization code to the client application.
// - response type : "code"
// - requested scopes
// - state parameter : Stores a unique, unguessable value that is tied to the current session on the client application. The OAuth service should return this exact value in the response, along with the authorization code.
//* 2. User login and consent
// The user is redirected to the OAuth service provider's login page,
//  where they log in and grant the requested scopes to the client application.
//* 3. Authorization code grant
// The OAuth service provider redirects the user's browser back to the client application using the redirect URI provided in the authorization request.
// with authorization code as a qery parameter .
//* 4. Access token request
// The client application sends a POST request to the OAuth service provider's token endpoint with the following parameters:
// - client ID
// - authorization code : The code received in the previous step.
// - client secret : The client application's secret key, used to authenticate the application.
// - grant type : "authorization_code"
//* 5. Access token grant
// The OAuth service provider responds with an access token,
// which the client application can use to access the user's data with a specific scope.
//* 6. Api call
// The client application can now use the access token to make API calls to the OAuth service provider's resource server,
// accessing the user's data with the granted scopes.
//* 7. Resource grant
// The resource server verifies the access token and grants access to the requested resources
// based on the scopes associated with the token.
//! Implicit grant type
//* 1. Authorization request
// same
//* 2. User login and consent
// same
//* 3. Access token grant
// The OAuth service provider redirects the user's browser back to the client application using the redirect URI provided in the authorization request.
// with access token as a query parameter.
//* 4. Api call
// same
//* 5. Resource grant
// same
//? note :
// The implicit grant type is more suited to single-page applications and native desktop applications, which cannot easily store the client_secret on the back-end, and therefore, don't benefit as much from using the authorization code grant type.
//! Exploiting OAuth
//* Recon
// after idenfiying the service provider try
// /.well-known/openid-configuration
// /.well-known/oauth-authorization-server
// /.well-known/jwks.json
//* Improper implementation of the implicit grant type
// To persist sessions, apps send the token and user info to the server via POST, which is trusted without verification.
// If the server doesn’t validate the access token related to user info, attackers can change user info gaining access to other users' accounts.
// so if carlos tries to login then when he gets his access token
// intecepts the post request sending bob username he can gain access to bob's account.
//* Flawed CSRF protection
// the absenc ef the state parameter in the authorization request opens the dor for the attackers
// to use his codes and tokens to potentially take over another user's account
//* Leaking authorization codes and access tokens
// if the redirect_url is not checked you can serve to the victim a malicious page that
// sends a reqeust to /auth with the redirect_url with a link of your own server
// the result is that the victim's access token or authorization code is sent to your server
//? note:
// even if there is a whitelist there is a chance to exploit it using ssrf or parameter pollution
//* Bypassing strict redirect URI validation
// using path traversel
// https://client-app.com/oauth/callback/../../example/path
// combined with an open-redirect you get
// https://client-app.com/oauth/callback/../../?redirect=https://attacker.com
// resolve to : https://client-app.com/?redirect=https://attacker.com
//! OpenId Connect
//* Unprotected dynamic client registration
// Dynamic client registration in OpenID lets applications register themselves by sending a JSON payload to a /register endpoint.
// If not properly secured (e.g. no auth), attackers can register malicious clients with controlled properties like URIs.
// This can lead to serious issues, such as second-order SSRF, if the OpenID provider later accesses attacker-supplied URLs.