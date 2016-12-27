const express = require('express');
const path = require('path');
const webpack = require('webpack');
const http = require('http');
const socketIO = require('socket.io');
var _ = require('lodash');

//initialize node.js express
var app = express();

//create server using express
var server = http.createServer(app);

//initialize socket IO
const io = socketIO(server);

//set the path to public folder
app.use(express.static(path.resolve('public')));

//initialize webpack
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config.js');
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
	noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

//load up the initial HTML file for the react application
app.get('*', function(req, res){
    res.sendFile(path.resolve('public/index.html'));
});


/*
User Object will have:
	pID...peer id
	sID..socket id
	availabe.. if they are available
	userCache...cache containing spoken to users, location info etc
*/
var SearchPool = function(){
	this.searching = {};
	this.timeouts = {};
}

SearchPool.prototype = {
	constructor: SearchPool,
	isEmpty: function(){
		if( _.isEmpty(this.searching) ) return true;
		else return false;
	},
	activeSearch:function(user){
		console.log("Trying active search for pID:",user.pID);
		if(!this.isEmpty()){
			_.forEachRight(this.searching , (value,key) =>{
				//No cache implementation yet
				if(value.available){
					value.available = false;
					io.to(user.sID).emit("pID",value.pID);
					io.to(value.sID).emit("pID",user.pID);

					delete this.searching[key];
					clearTimeout(this.timeouts[key]);
					return ;
				}

			});
		}
		else{
			this.passiveSearch(user);
		}
	},
	passiveSearch:function(user){
		console.log("Trying passive search for pID:",user.pID);
		this.searching[user.pID] = user;
		this.timeouts[user.pID] = setTimeout( ()=>{
			delete this.searching[user.pID];
			this.activeSearch(user);
		} , 5000)
	},
	removeUser(userPID){
		clearTimeout(this.timeouts[userPID]);
		delete this.searching[userPID];
	}

}

var globalPool = new SearchPool();
console.log(globalPool);

io.on('connection', function(socket) {
	console.log("Socket connected, id:", socket.id);
	console.log("All sockets:", Object.keys(io.sockets.connected) );

	socket.on('pID', function(data){
		console.log("Received pID", data.pID);
		globalPool.activeSearch(data);
		console.log('Global Pool:\n',globalPool.searching);
		socket.pID = data.pID;
	});

	socket.on('disconnect',function(){
		console.log('Socket ID:',socket.id,'DISCONNECTED');
		console.log("All sockets:", Object.keys(io.sockets.connected) );
		if(socket.pID){
			globalPool.removeUser(socket.pID);
		}
	});

	socket.on('leaveSearch',function(){
		if(socket.pID){
			globalPool.removeUser(socket.pID);
		}
	})



});


var PORT = process.env.PORT || 3000;

server.listen(PORT, function(){
	console.log("listening on port " + PORT);
});
