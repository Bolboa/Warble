import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory , Link } from 'react-router'
import { login , connectSocket, storeLocally, extractStorage } from '../actions'
import Login from '../components/loginForm'
import Register from '../components/registerForm'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            registerForm:false, 
            username_login:'', 
            password_login:'', 
            username_register:'', 
            password_register:'',
            err_username: '',
            err_password:'',
            err_register:'',
            success_register:'',
            register_status:'reg_neutral' 
        };
    }

	componentWillMount(){
        //checks redux to see if a socket is stored
        if(!this.props.socket){
            console.log("No Socket connection...attempting to connect socket");
            //creates a new socket and stores it in redux
			this.props.connectSocket(io());
		}
    }

    componentDidMount() {
        //get user's token and username from local storage, this action is done through redux
        const storage = this.props.extractStorage();
    
        //if user info is already stored in local storage
        if (storage !== null) {
            //token is the encrypted JWT 
            var token = storage.received.token;
            //decode the user's JWT to check if it is valid
            fetch('https://6d43a615.ngrok.io/api/decode', {
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
                //if user is authenticated successfully, re-route to video chat page,
                //this allows the user to skip the login page
                if (responseJson.auth == true) {
                    //redux will store the username
                    this.props.login(storage.received.username);
                    //re-route to video chat page
                    browserHistory.push('/chat');
                }
            })
            //error is thrown if POST request fails
            .catch(function(error) {
                console.log("request failed");
            })
        }
    }

    /*--------STORES REGISTER USERNAME IN STATE----------*/
	handleUsernameChangeRegister(e) {
        this.setState({username_register: e.target.value});
    }

    /*--------STORES REGISTER PASSWORD IN STATE----------*/
    handlePasswordChangeRegister(e) {
        this.setState({password_register: e.target.value});
    }

    /*--------STORES LOGIN PASSWORD IN STATE----------*/
    handlePasswordChangeLogin(e) {
        this.setState({password_login: e.target.value});
    }

    /*--------STORES LOGIN USERNAME IN STATE----------*/
    handleUsernameChangeLogin(e) {
        this.setState({username_login: e.target.value});
    }

    /*-------------HANDLE USER REGISTRATION------------*/
    handleRegister(){
        //pass user credentials for registration
        fetch('https://6d43a615.ngrok.io/api/register', {
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
            //if there is an error, username is already in use
            if (responseJson.error) {
                //save error message in state to pass to child component
                this.setState({err_register: responseJson.error});
            }
            //user credentials are good to use
            else {
                //success message saved in state to pass to child component
                this.setState({success_register: "User registered successfully"});
                //used as a class name to show/hide success message
                this.setState({register_status: "reg_success"});
                //if successful then show the login form
                this.setState({registerForm: !this.state.registerForm});
            }       
        })
        //error is thrown if POST request fails
        .catch(function(error) {
            console.log("request failed");
        })
    }

    /*--------HANDLE USER LOGIN---------*/
    handleLogin(){
        //pass user credentials for login
        fetch('https://6d43a615.ngrok.io/api/login', {
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
            //if there is an error while attempting to login
            if (responseJson.error) {
                //error is with the password
                if (responseJson.error.indexOf("Password") !== -1) {
                    //set error message for password field
                    this.setState({err_password: responseJson.error});
                }
                //error is with the username
                else {
                    //set error message for usename field
                    this.setState({err_username: responseJson.error});
                }
            }
            //login is successful
            else {
                //redux will store the username
                this.props.login(responseJson.username);
                //store the encrypted password and username in local storage, this is done through redux
                this.props.storeLocally(responseJson.token, responseJson.username);
                //redirect the user to video chat page after login
                browserHistory.push('/chat');
            }
        })
        //error is thrown if POST request fails
        .catch(function(error) {
            console.log("request failed");
        })
    }

    /*--------ALTERNATE BETWEEN LOGIN AND REGISTER---------*/
    onClick(e){
        //prevent the default action of onClick
        e.preventDefault();
        //if login fields are shown, onclick will hide it and show register fields (vice versa)
        this.setState({registerForm: !this.state.registerForm});
    }

	render(){
    	return (
            <div>
                <div className={this.state.register_status}>{this.state.success_register}</div>
                {/*REGISTER FORM*/}
                {this.state.registerForm && <Register errUser={this.state.err_register} switch={this.onClick.bind(this)} submit={this.handleRegister.bind(this)} password={this.handlePasswordChangeRegister.bind(this)} username={this.handleUsernameChangeRegister.bind(this)}/>}
				{/*LOGIN FORM*/}
                {!this.state.registerForm && <Login errPass={this.state.err_password} errUser={this.state.err_username} switch={this.onClick.bind(this)} submit={this.handleLogin.bind(this)} password={this.handlePasswordChangeLogin.bind(this)} username={this.handleUsernameChangeLogin.bind(this)}/>}
			</div>
    	)
    }
}

/*------BIND REDUX ACTIONS TO COMPONENT--------*/
function matchDispatchToProps(dispatch){
	return bindActionCreators({login , connectSocket, storeLocally, extractStorage}, dispatch);
}

/*--------BIND REDUX STATES TO COMPONENT------*/
function mapStateToProps(state){
	return { username:state.username, socket:state.socket, storage:state.storage, extract_storage:state.extract_storage }
}

export default connect(mapStateToProps, matchDispatchToProps)(Home)


