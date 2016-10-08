import React, { Component } from 'react'

export default class Footer extends Component{
  render(){
    return (
      <div className = 'footer-container'>
        <h3 className ='footer'>{this.props.message}</h3>
      </div>
    )
  }
}

Footer.propTypes = {
  message: React.PropTypes.string
}
