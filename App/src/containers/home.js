import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory , Link } from 'react-router'
import { login , connectSocket } from '../actions'

class Home extends Component {
	constructor(props) {
        super(props);
        this.state = { dumbuser:'' };


    }

	componentDidMount(){
		if(!this.props.socket){
			console.log("No Socket connection...attempting to connect socket");
			this.props.connectSocket(io());
		}
	}


	handleDumbLogin(){
		if(this.state.dumbuser && this.state.dumbuser !== ''  ){
			this.props.login(this.state.dumbuser);
			browserHistory.push('/chat')
		}
	}

	render(){

    	return(
			<div>

				{
					(this.props.username) ? <Link to='/chat'>Find a chat!</Link> :  (
						<div>
							<input type='text' ref='dumblogin' onChange={ (evt)=>{this.setState({ dumbuser: evt.target.value })} } ></input>
							<button onClick={this.handleDumbLogin.bind(this)}>Dumb Login</button>
						</div>

					)

				}
				<h1>{(this.props.username == null || this.props.username == '') ? 'No user' : this.props.username }</h1>
			</div>

    	)
  }
}

function matchDispatchToProps(dispatch){
	return bindActionCreators({login , connectSocket},dispatch);
}

function mapStateToProps(state){
	return { username:state.username, socket:state.socket }
}

export default connect(mapStateToProps,matchDispatchToProps)(Home)
