import React, { Component } from 'react';

export default class Login extends Component{
	render(){
        return(
        	<div className="bodyLogin">
        	<img className="bg_image" src={require("../../images/background.jpg")}/>
            <div className="loginForm">
            <div className="loginWrap">
            <img className="logo_image" src={require("../../images/logo.png")}/>
            
            <h1>Login</h1>
			    <div>
			        <label>USERNAME</label>
			        <input type="text" name="username"  onChange={this.props.username}/>
			    </div>
			    <div>
			        <label>PASSWORD</label>
			        <input type="password" name="password" onChange={this.props.password}/>
			    </div>
			    <div>
			        <button className="login_btn" onClick={this.props.submit}>Login</button>
			    </div>
			    <div className="registerLinkWrap">
			    	<p className="register_sentence">Don't have an account?</p>
			    	<a className="register_link" onClick={this.props.switch} href='#'>Register</a>
			    </div>
			    </div>
			</div>
			</div>
        )

    }
}