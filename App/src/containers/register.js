import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Register extends Component {
    constructor(){
        super();
        this.state = { username:'', password:''};
    }
    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    handlePasswordChange(e) {
       this.setState({password: e.target.value});
    }

    handleLogin(){
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
             username: this.state.username,
             password: this.state.password
            })
        })
        .then(json => json.json())

        .catch(function(error) {
            console.log("request failed");
        })

    }

    render(){
        return (
            <div className = 'auth-container'>
                <Link style={{position:'absolute', top:'5px',left:'5px' }} to='/'>Home</Link>

                   <div className="loginForm">
                      <div>
                          <label>Username:</label>
                          <input type="text" name="username"  onChange={this.handleUsernameChange.bind(this)}/>
                      </div>
                      <div>
                          <label>Password:</label>
                          <input type="password" name="password" onChange={this.handlePasswordChange.bind(this)}/>
                      </div>
                      <div>
                          <button onClick={this.handleLogin.bind(this)}>Login</button>
                      </div>
                  </div>


            </div>
        )
    }
}
