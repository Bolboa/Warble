import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { login } from '../actions'

class Chat extends Component {

	componentWillMount(){
		if(this.props.username == null)
			browserHistory.push('/')
	}
	componentDidMount() {
		var constraints = {
	        video: true,
	        audio: false
    	};
    	if(navigator.getUserMedia) {
	        navigator.getUserMedia(constraints, this.getUserMediaSuccess, this.getUserMediaError);
	        
	    } else {
	        alert('Your browser does not support getUserMedia API');
	    }



	}
	getUserMediaSuccess(stream) {

		//var localStream = stream;
		var vid = this.refs.localStream;
		vid.src = window.URL.createObjectURL(stream);


	}

	getUserMediaError(err) {
		console.log(err);
	}
 

	render(){
    	return(
      <div>
 		<h1>Chat Page</h1>
 		<div>Welcome, {this.props.username}</div>
 		<video ref="localStream" width="320" height="240" controls></video>

      
      </div>
    )
  }

}

function matchDispatchToProps(dispatch){
	return bindActionCreators({login},dispatch);
}

function mapStateToProps(state){
	return { username:state.username }
}

export default connect(mapStateToProps,matchDispatchToProps)(Chat)