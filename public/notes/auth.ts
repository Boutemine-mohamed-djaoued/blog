// Authentication
//! username : password
//* bruteforce types
// enumeration via different response
// enumeration via response time
//* blocking IP
// 1 => x-forwarded-for : diffrenet IP for each request
// 2 => some application reset the counter if you log in successfully so one brute force try then log in with your credentials and repeat
//* blocking by locking user account
// some times you can send multiple passwords on the same request password : ["", "", ""]

//! 2FA
//* flawed logic
// when they  log you in then if the code you privided is wrong they log you out so you can stay loged in and pass the logout phase
//* brute force
// the code can be brute forced if there is no securtiy mechanism
//! cookie
//* obvious format
// when it's format can be easily noticed then brute forced even that the login is well protected
//* weak hash
// there is usualy a kind of hash than can be reversed by dictionary searching