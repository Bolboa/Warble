import React, { Component } from 'react'
import { Router, Route, browserHistory, Link} from 'react-router'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'

import Header from '../components/header.component'
import Footer from '../components/footer.component'

import TaskList from './tasklist'

class App extends Component{

  constructor(props){
    super(props);
    //this.handlePress = this.handlePress.bind(this);
  }

  render(){
    return (
      <div>
        <Header title={this.props.message}/>
        <div style={{textAlign:'center',marginBottom:'5px'}}>
          <Link to='/'>Home</Link>
          <Link to='/tasklist'>Task List</Link>
        </div>


        {this.props.children}
        <Footer message ='The bare necessities needed to get started with your react-redux web project'/>
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
