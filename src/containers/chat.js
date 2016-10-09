import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { joinRoom } from '../actions'

class Chat extends Component {
	constructor(props){
		super(props);

		this.localStream = '';
		this.remoteStream = '';

	}

	componentWillMount(){
		if(this.props.username == null)
			browserHistory.push('/')
	}
	componentDidMount() {
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

		navigator.getUserMedia({video: true, audio: true}, function(stream) {
			this.localStream = stream;
			this.refs.localStream.src = window.URL.createObjectURL(this.localStream);
		}.bind(this),function(err){
			console.log("Error",err)
		});

		// var peer = new Peer({
		// 	host:'localhost',
		// 	port:5000,
		// 	path:'/',
		// 	config:{'iceServers': [
		// 		{url:'stun:stun01.sipphone.com'},
		// 		{url:'stun:stun.ekiga.net'},
		// 		{url:'stun:stun.fwdnet.net'},
		// 		{url:'stun:stun.ideasip.com'},
		// 		{url:'stun:stun.iptel.org'},
		// 		{url:'stun:stun.rixtelecom.se'},
		// 		{url:'stun:stun.schlund.de'},
		// 		{url:'stun:stun.l.google.com:19302'},
		// 		{url:'stun:stun1.l.google.com:19302'},
		// 		{url:'stun:stun2.l.google.com:19302'},
		// 		{url:'stun:stun3.l.google.com:19302'},
		// 		{url:'stun:stun4.l.google.com:19302'},
		// 		{url:'stun:stunserver.org'},
		// 		{url:'stun:stun.softjoys.com'},
		// 		{url:'stun:stun.voiparound.com'},
		// 		{url:'stun:stun.voipbuster.com'},
		// 		{url:'stun:stun.voipstunt.com'},
		// 		{url:'stun:stun.voxgratia.org'},
		// 		{url:'stun:stun.xten.com'},
		// 	]}
		// });

		var peer = new Peer({key:'p73vkga2525fusor'});

		//PEER2PEER EVENT HANDLERS
		peer.on('connection',function(conn){
			console.log('Connected to other user in p2p connection');
			var call = peer.call(conn.peer,this.localStream);
		}.bind(this));

		peer.on('call',function(call){
			var self = this;
			call.answer(this.localStream);
			call.on('stream',function(remoteStream){
				console.log("Got Stream from peer! ");
				self.remoteStream=remoteStream;

				// Show stream in video/canvas element.
				self.refs.remoteStream.src = window.URL.createObjectURL(self.remoteStream);
			});
		}.bind(this));

		peer.on('open', function(id) {
			console.log("Peer connection open");
			var self= this;
			this.props.socket.emit('pID', id);
  			console.log('My PeerID is:', id);



			//SOCKET EVENT HANDLERS
			this.props.socket.on('joinRoom', function(data) {
				console.log('Someone has joined room:',data.id);
				console.log('Currently in the room:' ,data.space.toString());

				//If not in a room join the room
				if(!self.props.currentRoom)
					self.props.joinRoom(data.id);

				//If there are two people in the room then try to establish a connection with the other person
				if(data.space.length === 2){
					data.space.forEach(function(user, index){
						if(user !== id){
							peer.connect(user);
						}
					});
				}
			});


		}.bind(this));



	}




	render(){
    	return(
      <div>
 		<h1>Chat Lobby!</h1>
 		<h2>Welcome Warbler, {this.props.username} <small>{ (!this.props.currentRoom) ? '...joining room' : `{ Room : ${this.props.currentRoom} }` }</small></h2>
 		<video ref="localStream" width="320" height="240" autoPlay muted></video>
 		<video ref="remoteStream" width="320" height="240" autoPlay></video>
 		<button >CLICK ME</button>

      </div>
    )
  }

}

function matchDispatchToProps(dispatch){
	return bindActionCreators({joinRoom},dispatch);
}

function mapStateToProps(state){
	return { username:state.username, socket:state.socket, currentRoom:state.currentRoom}
}

export default connect(mapStateToProps,matchDispatchToProps)(Chat)
