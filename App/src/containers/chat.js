import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { login } from '../actions'

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

		peer.on('open', function(id) {
			var self= this;
			this.props.socket.emit('pID', [id]);
  			console.log('My peer ID is: ' + id);
  			this.props.socket.on('joinRoom', function(data) {
  				//console.log("someone joined");
  				data.forEach(function(user,index) {
  					if (user != id) {
  						console.log(user);
						 var call = peer.call(user, self.localStream);
						 call.on('stream', function(remoteStream) {
						 	console.log("Got Stream " + user);
						 	self.remoteStream=remoteStream;

						    // Show stream in some video/canvas element.
						    self.refs.remoteStream.src = window.URL.createObjectURL(self.remoteStream);
						 });
						peer.on('call', function(call) {
							console.log("Got call " + user);
						    call.answer(self.localStream); // Answer the call with an A/V stream.
					
						});
					}  					
  					//console.log(index);
  				});
  			});
		}.bind(this));


	}

	


	render(){
    	return(
      <div>
 		<h1>Chat Lobby!</h1>
 		<div>Welcome Warbler! {this.props.username}</div>
 		<video ref="localStream" width="320" height="240" autoPlay></video>
 		<video ref="remoteStream" width="320" height="240" autoPlay></video>
 		<button onClick={()=>{this.start(true)}}>CLICK ME</button>

      </div>
    )
  }

}

function matchDispatchToProps(dispatch){
	return bindActionCreators({login},dispatch);
}

function mapStateToProps(state){
	return { username:state.username, socket:state.socket }
}

export default connect(mapStateToProps,matchDispatchToProps)(Chat)
