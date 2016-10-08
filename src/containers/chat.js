import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { login } from '../actions'

class Chat extends Component {
	constructor(props){
		super(props);
		this.localStream = "";
		this.peerConnectionConfig = {'iceServers': [{'url': 'stun:stun.services.mozilla.com'}, {'url': 'stun:stun.l.google.com:19302'}]};
		this.peerConnection = "";
		window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
		window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
	}

	componentWillMount(){
		if(this.props.username == null)
			browserHistory.push('/')
	}
	componentDidMount() {
		var constraints = {
	        video: true,
	        audio: false
    	};
    	navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
    	if(navigator.getUserMedia) {
	        navigator.getUserMedia(constraints, this.getUserMediaSuccess.bind(this), this.getUserMediaError.bind(this));

	    } else {
	        alert('Your browser does not support getUserMedia API');
	    }
	    



	}

	getUserMediaSuccess(stream) {

		this.localStream = stream;
		var vid = this.refs.localStream;
		vid.src = window.URL.createObjectURL(this.localStream);
		vid.play();


	}

	getUserMediaError(err) {
		console.log(err);
	}

	start(isCaller) {
		if (this.localStream == null) {
			return false;
		}
		else {
			this.peerConnection = new window.RTCPeerConnection(this.peerConnectionConfig);
    		this.peerConnection.onicecandidate = this.gotIceCandidate.bind(this);
    		this.peerConnection.onaddstream = this.gotRemoteStream.bind(this);
    		this.peerConnection.addStream(this.localStream);
    		if(isCaller) {
        		this.peerConnection.createOffer(this.gotDescription.bind(this), this.createOfferError);
    		}

		}


	}

	gotDescription(description) {
		var self = this;
		console.log('got description');
    	this.peerConnection.setLocalDescription(description, function () {
	        	self.props.socket.emit('desc',JSON.stringify({'sdp': description}));
	    	}, function() {console.log('set description error')});
		}

	

	createOfferError(error) {
		console.log(error);
	}

	gotIceCandidate(event) {
		if(event.candidate != null) {
        	this.props.socket.emit('ice',JSON.stringify({'ice': event.candidate}));
    	}	
	}

	gotRemoteStream(event) {
	    console.log("got remote stream");
	    var remote = this.refs.remoteStream;
	    remote.src = window.URL.createObjectURL(event.stream);
	}

	gotMessageFromServer(message) {
	    if(!this.peerConnection) {
	    	this.start(false);
	    }
	    

	    var signal = JSON.parse(message.data);
	    if(signal.sdp) {
	        this.peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp), function() {
	            this.peerConnection.createAnswer(this.gotDescription, this.errorHandler);
	        }, errorHandler);
	    } else if(signal.ice) {
	        this.peerConnection.addIceCandidate(new RTCIceCandidate(signal.ice));
	    }
	}

	errorHandler() {
		console.log(error);
	}


	render(){
    	return(
      <div>
 		<h1>Chat Lobby!</h1>
 		<div>Welcome Warbler! {this.props.username}</div>
 		<video ref="localStream" width="320" height="240" ></video>
 		<video ref="remoteStream" width="320" height="240" ></video>
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
