import React, { Component } from 'react'

export default class ChatMessage extends Component{
    render(){
        return(
            <li>
                {`${this.props.sender}: ${this.props.message}`}
            </li>
        )

    }
}

ChatMessage.propTypes = {
    sender: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired
}
