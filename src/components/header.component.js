import React, { Component } from 'react'

export default class Header extends Component{
  render(){
    return (
      <div >
        <h1 className ="header">{this.props.title}</h1>
      </div>
    )
  }
}

Header.propTypes = {
  title:React.PropTypes.string
}
