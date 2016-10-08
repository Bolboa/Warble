var PeerServer = require('peer').PeerServer;
var server = PeerServer({port:5000, path: '/'});

server.on('connection',function(id){
	console.log(id);
	console.log("Connected to Peer Server");
})

