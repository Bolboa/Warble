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

    componentDidMount(){
        var self = this;
        this.refs.messageBox.onkeypress = function(evt){
            evt.preventDefault();

            if(evt.key === 'Enter'){
                console.log("Pressed enter")
                console.log(self.props.p2p);
                if(self.props.p2p.conn){
                    var message = { type:'peerMessage', sender: self.props.username, message:this.value};
                    console.log('Attempting to send message...')
                    self.props.p2p.conn.send(message);
                    self.props.getPeerMessage(message);
                    this.value = '';
                }
            }
            else{
                this.value += evt.key;
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
                <textarea ref='messageBox'></textarea>

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
