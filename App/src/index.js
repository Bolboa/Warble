import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router'
import {Provider} from 'react-redux'
import { createStore } from 'redux'

import allReducers from './reducers'

import Home from './containers/home'
import Chat from './containers/chat'


require('./styles.scss');


const store = createStore(allReducers);

/*-----AUTHENTICATE USER ROUTES-------*/
function authenticateUser(nextState, replace){
    //get redux store
    var state = store.getState();
    //if there is not socket connection or username is null,
    //prevent the user from accessing video chat page
    if(!state.socket || !state.username)
        replace("/");
}

render(
  <Provider store={store}>
    <Router history = {browserHistory}>
      <Route path='/' component= { Home }></Route>
      <Route path='/chat' onEnter={ authenticateUser } component={ Chat } />
    </Router>
  </Provider>
, document.getElementById('app'));
