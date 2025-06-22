// Command Injection
//! Identifying
//* using time delay
// we can use " & ping -c 10 127.0.0.1 & " to see if the command is executed in 10 seconds
// or " & sleep 10 "
// with # to comment the rest
//! Exploiting
//* operators
// & && ; to execture multiple commands at the same time
// | || if the first command fails the second one will be executed
// `cmd` and ${cmd} and cm''d and c\md can be used also to replace cmd
//* redirection
// if the application does not return the output of the command you can use > to redirect the output to a file
// that we have access to
//* out of band
// you can make the server send you a request to your server to get the result of the command
//* facing regex
// if you face "ls --${op1} ${op2}"
// and both inputs are regex restricted
// you can add a new line to op1 with %0a because regex in applied to each line separately
// you will end up with
// "ls --${op1}"
// "${op2}"
// if this is not properly protected you can add any command on op2
// because usely regex protect against special characters and normal commands does not contains special characters
// for example "cat flag"