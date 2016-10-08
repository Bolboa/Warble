import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { login } from '../actions'

class Home extends Component {

	handleLogin(){
		var value = document.getElementById("username").value;
		this.props.login(value);
		if(value)
			browserHistory.push('/chat')
	}

	render(){
		console.log(this.props.username);
    	return(
      <div>
        <h1 style={{textAlign:'center'}}> Warble</h1>
        <input id="username" type="text" placeholder="enter name"/>
        <button onClick={this.handleLogin.bind(this)}>Enter</button>

        <h1>{(this.props.username == null || this.props.username == '') ? 'No user' : this.props.username }</h1>
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

export default connect(mapStateToProps,matchDispatchToProps)(Home)



