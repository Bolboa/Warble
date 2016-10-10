import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { joinRoom, toggleP2pConnection, addP2pConnection, getPeerMessage } from '../actions'

import ChatBox from './chatbox'

class Chat extends Component {
	constructor(props){
		super(props);
		this.localStream = '';
		this.remoteStream = '';
		this.local2dContext ='';
		this.remote2dContext = '';
	}

	componentWillMount(){
		if(this.props.username == null)
			browserHistory.push('/')
	}

	componentDidMount() {
		var self = this;
		this.local2dContext = this.refs.localCanvas.getContext('2d');
		this.remote2dContext = this.refs.remoteCanvas.getContext('2d');

		var streamVideoToCanvas = (vid,ctx)=>{
			ctx.drawImage(vid,0,0,vid.width,vid.height);
		}

		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

		navigator.getUserMedia({video: true, audio: true}, function(stream) {
			this.localStream = stream;
			this.refs.localStream.src = window.URL.createObjectURL(this.localStream);
		}.bind(this),function(err){
			console.log("Error",err)
		});



		//VIDEO -> CANVAS
		this.refs.localStream.addEventListener('play',function(){
			if(!this.paused && !this.ended){
				window.setInterval(streamVideoToCanvas,10,this,self.local2dContext);
			}
		});

		this.refs.remoteStream.addEventListener('play',function(){
			if(!this.paused && !this.ended){
				window.setInterval(streamVideoToCanvas,10,this,self.remote2dContext);
			}
		});

		var peer = new Peer({
			key:'p73vkga2525fusor',
			config:{'iceServers': [
				{url:'stun:stun01.sipphone.com'},
				{url:'stun:stun.ekiga.net'},
				{url:'stun:stun.fwdnet.net'},
				{url:'stun:stun.ideasip.com'},
				{url:'stun:stun.iptel.org'},
				{url:'stun:stun.rixtelecom.se'},
				{url:'stun:stun.schlund.de'},
				{url:'stun:stun.l.google.com:19302'},
				{url:'stun:stun1.l.google.com:19302'},
				{url:'stun:stun2.l.google.com:19302'},
				{url:'stun:stun3.l.google.com:19302'},
				{url:'stun:stun4.l.google.com:19302'},
				{url:'stun:stunserver.org'},
				{url:'stun:stun.softjoys.com'},
				{url:'stun:stun.voiparound.com'},
				{url:'stun:stun.voipbuster.com'},
				{url:'stun:stun.voipstunt.com'},
				{url:'stun:stun.voxgratia.org'},
				{url:'stun:stun.xten.com'},
			]}
		});

		//PEER2PEER EVENT HANDLERS
		peer.on('connection',function(conn){
			console.log('Connected to other user in p2p connection');
			this.props.toggleP2pConnection();
			this.props.addP2pConnection(conn);
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
							var conn = peer.connect(user);

							//CONNECTION EVENT HANDLERS
							conn.on('data',function(data){
								console.log("Got some data of type:",data.type)
								switch(data.type){
									case 'peerMessage':
										self.props.getPeerMessage(data);
								}
							});
						}
					});
				}
			});


		}.bind(this));



	}


	render(){
    	return(
	      <div className='chat-wrapper'>
			  <div className='video-section'>
				  <canvas ref ='localCanvas' className = 'localCanvas' width="320" height="240"></canvas>
				  <canvas ref ='remoteCanvas' className = 'localCanvas' width="320" height="240"></canvas>
			  </div>
			<ChatBox />

	 		<video style={{display:'none'}} ref="localStream" width="320" height="240" autoPlay muted></video>
	 		<video  style={{display:'none'}} ref="remoteStream" width="320" height="240" autoPlay>
			</video>

	      </div>
    	)
  	}


}


function matchDispatchToProps(dispatch){
	return bindActionCreators({joinRoom, toggleP2pConnection, addP2pConnection, getPeerMessage},dispatch);
}

function mapStateToProps(state){
	return { username:state.username, socket:state.socket, currentRoom:state.currentRoom, chatMessages:state.chatMessages}
}

export default connect(mapStateToProps,matchDispatchToProps)(Chat)
