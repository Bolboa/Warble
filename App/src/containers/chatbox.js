import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getPeerMessage } from '../actions'
class ChatMessage extends Component{
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


class ChatBox extends Component {

    constructor(){
        super();
        this.state = {message:''}
    }

    componentDidMount(){
        var self = this;
    }

    handleTextAreaChange(evt){
        this.setState({message:evt.target.value})
    }

    handleKeyPress(evt){
        //console.log(`Which: ${evt.which}`,`KeyCode: ${evt.keyCode}`,`CharCode: ${evt.charCode}`,`Key: ${evt.key}`);
        if(evt.which === 13){
            evt.preventDefault();
            console.log("Pressed enter")
            console.log(this.props.p2p);
            if(this.props.p2p.conn){
                var message = { type:'peerMessage', sender: this.props.username, message:this.state.message};
                console.log('Attempting to send message...')
                this.props.p2p.conn.send(message);
                this.props.getPeerMessage(message);
                evt.target.value = '';
            }
        }
    }

	render(){
		return (
			<div>
                <h1>Chat Box</h1>
                <ul>
                    {
                        (this.props.messages && (this.props.messages.length > 0)) ?
                        this.props.messages.map((message,index)=>{
                            return <ChatMessage key = {index} {...message}/>
                        }) : 'No messages'
                    }
                </ul>
                <textarea ref='messageBox' onKeyPress = {this.handleKeyPress.bind(this)} onChange={this.handleTextAreaChange.bind(this)}></textarea>

            </div>
		)
	}
}

function mapStateToProps(state){
    return {
        messages:state.chatMessages,
        username: state.username,
        p2p:state.p2p
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        getPeerMessage
    },dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(ChatBox);
