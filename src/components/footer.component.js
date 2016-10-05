import React, { Component } from 'react'

export default class Header extends Component{
  render(){
    return (
      <div className = 'footer-container'>
        <h3 className ='footer'>{this.props.message}</h3>
      </div>
    )
  }
}
