//? username : password

//* bruteforce types
// enumeration via different response
// enumeration via response time
//* blocking types
// blocking by IP :
// 1 => x-forwarded-for : diffrenet IP for each request
// 2 => some application reset the counter if you log in successfully so one brute force try then log in with your credentials and repeat
// blocking by locking user account
// some time you can sent multiple password on the same request password : ["", "", ""]

//? 2FA

// 1 => can be bypassed if the logic is flawedlike login you in the if the code you prorode is wrong they log you out
// in between you can prevliege be loged in

// 2 => the code can be brute forced if there is no securtiy mechanism

//? stay loged in cookie

// 1 => it's format can be easily noticed they brute forced even that the login is well protected
// if no brute force way is found they usualy use a kind of hash than can be reversed by dictionary searching

//? reset password token poisoning
// using the X-Forwarded-Host header you can change the link that's sent to the user to a server you control so you can receive their token if they clicked on it
