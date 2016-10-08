import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { login } from '../actions'

class Chat extends Component {

	componentWillMount(){
		if(this.props.username == null || undefined)
			browserHistory.push('/')
	}


	render(){
    	return(
      <div>
 		<h1>Chat Page</h1>
 		<div>Welcome, {this.props.username}</div>

      
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