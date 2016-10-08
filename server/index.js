var express = require('express');
var path = require('path');
const webpack = require('webpack');

var http = require('http');

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

var rooms = [];

var Room = function(){
	this.id = Math.random*5;
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
	},
	getRoom:function(){
		return this.space;
	}
}





io.on('connection', function(socket) {
    console.log("hi");
    socket.on('pID', function(data){
    	rooms.forEach(function(room,index){
    		if(!room.isFull()){
    			console.log("room not full");
    			room.addUser(data);
    			socket.emit('joinRoom', room.space);
    			console.log(JSON.stringify(rooms))
    			return	
    		}
    	})
    	console.log("herre");
		var newRoom = new Room();
		newRoom.addUser(data);
		rooms.push(newRoom);
		socket.emit('joinRoom',newRoom.space);
		console.log(JSON.stringify(rooms))
    });
   
});




var PORT = process.env.PORT || 3000;

server.listen(PORT, function(){
	console.log("listening on port " + PORT);
});

