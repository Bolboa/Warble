import React, { Component } from 'react'
import {Link,IndexLink} from 'react-router'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import { connectSocket } from '../actions'


class App extends Component{

  componentDidMount() {
    this.props.connectSocket(io());

  }

  render(){
    return (
      <div>

        {this.props.children}
        <div style={{textAlign:'center',marginBottom:'5px'}}>
          <IndexLink activeClassName='link-active' to='/'>Home</IndexLink>

        </div>



      </div>
    )
  }
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({connectSocket},dispatch);
}

function mapStateToProps(state){
  return {
      socket:state.socket
  }
}


export default connect(mapStateToProps, matchDispatchToProps)(App)
