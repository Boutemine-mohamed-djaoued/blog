// JWT
//! Exploiting
//* flawd signature verification
// put the alg to none then remove the signature but let the dot
//* weak key
// brute forced with # hashcat -a 0 -m 16500 jwt.txt rockyou.txt
//* jwk
// (JSON Web Key) - Provides an embedded JSON object representing the key.
// 1- create an RSA key
// 2- Attack => Embedded JWK => select generated RSA key
//* jku
// (JSON Web Key Set URL) - Provides a URL from which servers can fetch a set of keys containing the correct key.
// 1- create an RSA keyIJ"I
// 2- copy public key as jwk
// 3- run a server that return json => { "keys" : [ past here ]}
// 4- change the kid of the jwt to the one of the jwk
// 5- add the link to your server => "jku" : "url"
// 6- sign => ok
//* kid
// (Key ID) - Provides an ID that servers can use to identify the correct key in cases where there are multiple keys to choose from. Depending on the format of the key, this may have a matching kid parameter.
// 1- create a semetric key with k="AA==" (base64 to null byte)
// 2- change the kid="../../../../../../dev/null" (or any path)
// 3= sign => ok
//* Algorithm confusion attack
// 1- get public jwk
// 2- create a new RSA key using it
// 3- copy as PEM then convert to base64 (dont forget the new line)
// 4- create a symetric key with the result
// 5- change alg to HS256
// 6- sign => ok
//* Deriving public keys from existing tokens
// docker run --rm -it portswigger/sig2n <token1> <token2>
// you will receive multile choices of public keys try them all starting from step 4 in the previous attack

