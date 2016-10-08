import React, { Component } from 'react'
import {Link,IndexLink} from 'react-router'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'



class App extends Component{

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

function mapStateToProps(state){
  return {
    message:state.headerTitle,
    saySomething:state.saySomething
  }
}


export default connect(mapStateToProps)(App)
