// Obfuscating attacks using encodings
//! Bypassing Filters
//* Double URL encoding
// if we have a security layer (WAF) that only decode the input once,
// but the real application decodes the input twice
// you can bypass security by encoding the input twice
//* HTML encoding
// to bypass backend filter you can use &#x61;lert(1)
// the browser will decode it to alert(1)
// if the backend filter is strong try using &#00000000x61;lert(1)
// the browser will still decode it to alert(1)
//* XML encoding
// we have :
// <storeId>
//   1 SELECT * FROM information_schema.tables
// </storeId>;
// but since XML supports character encoding like html we can send :
// <storeId>
//   1  &#x53;ELECT * FROM information_schema.tables
// </storeId>;
// the security layer will not notice the "SELECT" word but the server will decode
// resulting in a valid query
//* Unicode escaping
// if the input to eval in filter
// so eval("alert(1)") will not work
// try using eval("\u0061lert(1)")
// javascript will decode it automatically
// or even  eval("\u000000000061lert(1)")
//* Hex escaping
// eval("\x61lert")
//* Octal escaping
// eval("\141lert")
//* Combining multiple encodings
// we have : &bsol;u0061lert(1)
// &bsol; resolve to /
// result : /u0061lert(1)
// /u0061 resolves to a
// final result : alert(1)
//* SQL CHAR() function
// if select is banned
// you can try : CHAR(83)+CHAR(69)+CHAR(76)+CHAR(69)+CHAR(67)+CHAR(84)



