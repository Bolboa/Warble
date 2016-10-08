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




io.on('connection', function(socket) {
    console.log("hi");

    socket.on('ice',function(data){
    	console.log(">>>>Server received ice");
		console.log(data);
		socket.broadcast.emit('message',data);
	})

	socket.on('desc',function(data){
		console.log(">>>>Server received desc");
		console.log(data)
		socket.broadcast.emit('message',data);
	})
});




var PORT = process.env.PORT || 3000;

server.listen(PORT, function(){
	console.log("listening on port " + PORT);
});

