const express = require('express');
const path = require('path');
const webpack = require('webpack');
const http = require('http');
const socketIO = require('socket.io');


var app = express();
var server = http.createServer(app);


const io = socketIO(server);


const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config.js');
const compiler = webpack(webpackConfig);

app.use(express.static(path.resolve('public')));
app.use(webpackDevMiddleware(compiler, {
	noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.get('*', function(req, res){
    res.sendFile(path.resolve('public/index.html'));
});





//User objects to represent current rooms;
var rooms = {};

var Room = function(id){
	this.id = id;
	this.space = [];
}

Room.prototype = {
	constructor: Room,
	isFull: function(){
		if(this.space.length == 2) return true
		else return false;
	},
	addUser: function(id){
		this.space.push(id);
	}
}


io.on('connection', function(socket) {
	console.log("Socket connected, id:", socket.id.slice(8));
	console.log("All sockets:", Object.keys(io.sockets.connected) );

	function leaveRoom(){
		if(socket.currentRoom){
			//When a user disconnects find the room he is in then remove him from that room
			console.log("Socket is leaving current room");
			var room = rooms[socket.currentRoom];
			socket.leave(socket.currentRoom);
			room.space.forEach(function(user,index){
				if(user === socket.pID){
					room.space.splice(index,1);
				}
			});
			socket.pID = null;
			socket.currentRoom = null;
		}

		console.log('Rooms>>>\n','\t',rooms);
	}

    socket.on('pID', function(data){
		socket.pID = data;
		console.log("Socket is joining room....");
		//Loop through the rooms and find one that has a vacant space.
		//If there is no vacant rooms then create a new room.
		//add yourself into the room and then emit to all users that you have joined the room
    	for(var key in rooms){
			var currRoom = rooms[key];
			if(!currRoom.isFull()){
				currRoom.addUser(data);
				socket.join(currRoom.id);
				socket.currentRoom = currRoom.id;

				io.to(currRoom.id).emit('joinRoom',currRoom);
				console.log('Rooms>>>\n','\t',rooms);
				return
			}
		}
		var newRoom = new Room(Math.floor((Math.random() * 10000) + 1));
		newRoom.addUser(data);
		rooms[newRoom.id] = newRoom;
		socket.join(newRoom.id);
		socket.currentRoom = newRoom.id;
		io.to(newRoom.id).emit('joinRoom',newRoom);
		console.log('Rooms>>>\n','\t',rooms);
    });

	socket.on('leaveRoom',function(data){
		console.log('Socket:',socket.id,'left the room');
		leaveRoom();
	});

	socket.on('disconnect',function(){
		console.log('Socket ID:',socket.id,'DISCONNECTED');
		leaveRoom();
		console.log("All sockets:", Object.keys(io.sockets.connected) );
	});



});




var PORT = process.env.PORT || 3000;

server.listen(PORT, function(){
	console.log("listening on port " + PORT);
});
