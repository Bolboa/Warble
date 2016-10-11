import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Login extends Component {
    render(){
        return (
            <div className = 'auth-container'>
                <Link style={{position:'absolute', top:'5px',left:'5px' }} to='/'>Home</Link>
                <form>
                    <fieldset>
                        <legend> <h1>LOGIN</h1> </legend>
                        <Link to='/register'>register</Link>
                    </fieldset>
                </form>
            </div>
        )
    }
}
