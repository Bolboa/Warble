import React, { Component } from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'

import Header from '../components/header.component'
import Footer from '../components/footer.component'

import { saySomething } from '../actions'

class App extends Component{

  constructor(props){
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress(){
    var input = document.getElementById('message');
    this.props.saySomething(input.value);
    alert(input.value);
  }

  render(){
    return (
      <div>
        <Header title={this.props.message}/>
        <input id="message" type="text" value="" />
        <button onClick={this.handlePress} >Say Something</button>
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

function matchDispatchToProps(dispatch){
  return bindActionCreators({saySomething},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(App)
