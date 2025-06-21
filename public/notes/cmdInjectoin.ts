// * operators
// & && ; to execture multiple commands at the same time
// | || if the first command fails the second one will be executed
// `cmd` and ${cmd} and cm''d and c\md can be used also
// you can send \n aka %0a because regex is applied on each line
//* detection
// we can use & ping -c 10 127.0.0.1 & to see if the command is executed in 10 seconds
// or & sleep 10 # to comment the res

//* redirection
// if the application does not return the output of the command you can use > to redirect the output to a file
// that we have access to

//* out of band
// you can make the server send you a request to your server to get the result of the command