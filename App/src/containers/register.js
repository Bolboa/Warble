import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Register extends Component {
    render(){
        return (
            <div className = 'auth-container'>
                <Link style={{position:'absolute', top:'5px',left:'5px' }} to='/'>Home</Link>
                <form>
                    <fieldset>
                        <legend> <h1>REGISTER</h1> </legend>
                        <Link to='/login'>login</Link>
                    </fieldset>
                </form>
            </div>
        )
    }
}
