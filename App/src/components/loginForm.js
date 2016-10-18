import React, { Component } from 'react'

export default class Login extends Component{
	render(){
        return(
            <div className="loginForm">
			    <div>
			        <label>Username:</label>
			        <input type="text" name="username"  onChange={this.props.username}/>
			    </div>
			    <div>
			        <label>Password:</label>
			        <input type="password" name="password" onChange={this.props.password}/>
			    </div>
			    <div>
			        <button onClick={this.props.submit}>Login</button>
			    </div>
			</div>
        )

    }
}