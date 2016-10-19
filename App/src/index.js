import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router'
import {Provider} from 'react-redux'
import { createStore } from 'redux'

import allReducers from './reducers'

import Home from './containers/home'
import Chat from './containers/chat'
import Register from './containers/register'
import Login from './containers/login'

require('./styles.scss');


const store = createStore(allReducers);

function authenticateUser(nextState, replace){
    //Authenticate routes
    var state = store.getState();
    if(!state.socket || !state.username)
        replace("/");
}

render(
  <Provider store={store}>
    <Router history = {browserHistory}>
      <Route path='/' component= { Home }></Route>
      <Route path='/chat' onEnter={authenticateUser } component={ Chat } />
      <Route path='/login' component={ Login }/>
      <Route path='/register' component = { Register } />
    </Router>
  </Provider>
, document.getElementById('app'));
