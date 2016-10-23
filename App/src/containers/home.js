import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory , Link } from 'react-router'
import { login , connectSocket } from '../actions'
import Login from '../components/loginForm'
import Register from '../components/registerForm'

class Home extends Component {
	constructor(props) {
        super(props);
         this.state = { registerState:false, registerForm:false, username_login:'', password_login:'', username_register:'', password_register:'',dumbuser:'' };
    }



	componentDidMount(){

		if(!this.props.socket){
			console.log("No Socket connection...attempting to connect socket");
			this.props.connectSocket(io());
		}

	}
  componentWillReceiveProps() {
    //get user's token and username from local storage
    const received = JSON.parse(localStorage.getItem('token'));
    
    //if user info is stored
    if (received !== null) {
      var token = received.token;
      
      //POST request to authenticate user token
      fetch('http://localhost:8080/api/decode', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token      
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        //if user is authenticated successfully, re-route to chat
        if (responseJson.auth == true) {
          this.props.login(received.username);
          browserHistory.push('/chat');
        }
      })
      .catch(function(error) {
        console.log("request failed");
      })
    }

  }

	handleUsernameChangeRegister(e) {
    this.setState({username_register: e.target.value});
  }
  handlePasswordChangeRegister(e) {
    this.setState({password_register: e.target.value});
  }
  handlePasswordChangeLogin(e) {
    this.setState({password_login: e.target.value});
  }

  handleUsernameChangeLogin(e) {
    this.setState({username_login: e.target.value});
  }

  //POST request to register user credentials
  handleRegister(){
    fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username_register,
 	      password: this.state.password_register
 	    })
  	})
  	.then((response) => response.json())
    .then((responseJson) => {
      console.log('registered successfully');        
    })
  	.catch(function(error) {
 	    console.log("request failed");
 	  })
  }
  
  //POST request to server to check if user is real
  handleLogin(){
    fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username_login,
        password: this.state.password_login
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var userInfo = {
        token:responseJson.token,
        username:responseJson.username
      }
      const serializedState = JSON.stringify(userInfo);
      
      //store token in local storage
      localStorage.setItem('token', serializedState);
      //login successful re-route to video chat
      this.props.login(responseJson.username);
      browserHistory.push('/chat');
    })
    .catch(function(error) {
      console.log("request failed");
    })
  }

  onClick(e){
    e.preventDefault();
    this.setState({registerForm: !this.state.registerForm});
  }

	render(){

    	return(
			<div>
			
 		      

          {this.state.registerForm && <Register switch={this.onClick.bind(this)} submit={this.handleRegister.bind(this)} password={this.handlePasswordChangeRegister.bind(this)} username={this.handleUsernameChangeRegister.bind(this)}/>}
				  {!this.state.registerForm && <Login switch={this.onClick.bind(this)} submit={this.handleLogin.bind(this)} password={this.handlePasswordChangeLogin.bind(this)} username={this.handleUsernameChangeLogin.bind(this)}/>}
          
        
				<h1>{(this.props.username == null || this.props.username == '') ? 'No user' : this.props.username }</h1>
			</div>
    	)
  }
}

function matchDispatchToProps(dispatch){
	return bindActionCreators({login , connectSocket},dispatch);
}

function mapStateToProps(state){
	return { username:state.username, socket:state.socket }
}

export default connect(mapStateToProps,matchDispatchToProps)(Home)


