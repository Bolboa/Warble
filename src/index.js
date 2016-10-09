import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router'
import {Provider} from 'react-redux'
import { createStore } from 'redux'

import allReducers from './reducers'

import App from './containers/app'
import Home from './containers/home'
import Chat from './containers/chat'


require('./styles.scss');


const store = createStore(allReducers);

render(
  <Provider store={store}>
    <Router history = {browserHistory}>
      <Route path='/main' component= {App}>
        <IndexRoute component={Home}/>
      	 <Route path='/chat' component={ Chat } />
      
      </Route>
   
    </Router>
  </Provider>
, document.getElementById('app'));
