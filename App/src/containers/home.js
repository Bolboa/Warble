import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { login } from '../actions'

class Home extends Component {
	constructor(props) {
        super(props);
        this.state = { username:'', password:'',dumbuser:'' };
    }

	handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    handlePasswordChange(e) {
       this.setState({password: e.target.value});
    }

	handleLogin(){
		fetch('http://localhost:8080', {
            method: 'post',
           	body: JSON.stringify({
             username: this.state.username,
             password: this.state.password
		 	})
	  	});

	}

	handleDumbLogin(){
		this.props.login(this.state.dumbuser);
		browserHistory.push('/chat')
	}

	render(){
		//console.log(this.state.username);
		//console.log(this.props.username);
    	return(
	      <div>
		     <form onSubmit={this.handleLogin.bind(this)} action="/" method="post">
			    <div>
			        <label>Username:</label>
			        <input type="text" name="username"  onChange={this.handleUsernameChange.bind(this)}/>
			    </div>
			    <div>
			        <label>Password:</label>
			        <input type="password" name="password" onChange={this.handlePasswordChange.bind(this)}/>
			    </div>
			    <div>
			        <input type="submit" value="Log In"/>
			    </div>
			</form>
			<br/>
			<div>
				<input type='text' ref='dumblogin' onChange={ (evt)=>{this.setState({ dumbuser: evt.target.value })} } ></input>
				<button onClick={this.handleDumbLogin.bind(this)}>Dumb Login</button>
			</div>
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
