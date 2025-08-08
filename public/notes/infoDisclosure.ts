// Information Disclosure
//! Identifying
//* Files for web crawlers
// /robots.txt and /sitemap.xml
//* debug files
// /cgi-bin/phpinfo.php
//* Source code disclosure via backup files
// /index.php~ or /index.php.bak
//* web service definition
// /wsdl | /example.wsdl | /wsdl?wsdl
//* Information disclosure due to insecure configuration
// try TRACE /admin might get you more info
//* Version control history
// .git
// wget -r websiteLink/.git
// use vscode git history extension to get data
//* public data
// /.well-known
//! useful commands
//* get data about domain
// whois domainName
//* get IP address of domain
// dig domainName
//* get subdomains
// sudo dnsenum --enum inlanefreight.com -f subdomains-top1million-5000.txt
//* get subdomains by asking for a dns record transfer
// only works is there no authentication
// dig axfr @nsztm1.digi.ninja zonetransfer.me
//* get virtual hosts
// gobuster vhost -u http://<target_IP_address> -w subdomains-top1million-5000.txt --append-domain --domain base.domain.com
//* check if a server if behind a WAF
// wafw00f inlanefreight.com
//! Automating Recon
//* nikto
// at ctf/nikto/program
// ./nikto.pl -h domain.name -Tuning b
//* finalrecon
// at ctf/FinalRecon/
// ./finalrecon.py --headers --whois --url http://inlanefreight.com
//! ffuf
//* directory disclosure
// ffuf -w Directories_All.txt:FUZZ -u https://af9a0f906d36b9c098d421d0.deadsec.quest/FUZZ
//* finding extentions inside a directory
// ffuf -w web-extensions.txt:FUZZ -u http://SERVER_IP:PORT/directory/indexFUZZ
//* scanning for directories and files recursiverly
// ffuf -w DirBuster-2007_directory-list-2.3-small.txt:FUZZ -u http://SERVER_IP:PORT/FUZZ -recursion -recursion-depth 1 -e .php -v
//* scanning subdomains
// ffuf -w subdomains-top1million-5000.txt:FUZZ -u https://FUZZ.inlanefreight.com/
//* scanning for virtual hosts
// you need to add academy.htb to your /etc/hosts file first
// ffuf -w subdomains-top1million-5000.txt:FUZZ -u http://academy.htb:PORT/ -H 'Host: FUZZ.academy.htb'
//? Vhosts vs. Sub-domains
// The key difference between VHosts and sub-domains is that a VHost is basically a 'sub-domain' served on the same server and has the same IP, such that a single IP could be serving two or more different websites.
//* scanning parameters (GET)
//  ffuf -w burp-parameter-names.txt:FUZZ -u http://admin.academy.htb:PORT/admin/admin.php?FUZZ=key -fs xxx
//? note :
// we use -fs xxx to filter out the wrong response size
//* scanning parameters (POST)
// ffuf -w burp-parameter-names.txt:FUZZ -u http://admin.academy.htb:PORT/admin/admin.php -X POST -d 'FUZZ=key' -H 'Content-Type: application/x-www-form-urlencoded' -fs xxx


