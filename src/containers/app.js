import React, { Component } from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'

import Header from '../components/header.component'

class App extends Component{
  render(){
    return (
      <div>
        <Header title={this.props.message}/>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    message:state.headerTitle
  }
}
export default connect(mapStateToProps)(App)
