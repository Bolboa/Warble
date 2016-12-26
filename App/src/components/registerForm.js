import React, { Component } from 'react'

export default class Register extends Component{
	
	render(){
        return(
        	<div className="bodyLogin">
        		
        		<img className="bg_image" src={require("../../images/background.jpg")}/>
            	
            	<div className="registerForm">
            		
            		<div className="loginWrap">
            			
            			<img className="logo_image" src={require("../../images/logo.png")}/>
            			
            			<h1>Register</h1>
			    		
			    		<div>
			    			<label>Username:</label>
			    			<input type="text" name="username_reg" onChange={this.props.username}/>
			    			<div className="errRegister">{this.props.errUser}</div>
			    		</div>
			    	
			    		<div>
			        		<label>Password:</label>
			        		<input type="password" name="password_reg" onChange={this.props.password}/>
			    		</div>
			    		
			    		<div>
			        		<button className="register_btn" onClick={this.props.submit}>Register</button>
			    		</div>
			    	
			    		<div className="loginLinkWrap">
			    			<p className="login_sentence">Already have an account?</p>
			    			<a className="login_link" onClick={this.props.switch} href='#'>Login</a>
			    		</div>
					
					</div>
				</div>
			</div>
        )
    }
}