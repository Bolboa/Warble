import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import {Provider} from 'react-redux'
import { createStore } from 'redux'

import allReducers from './reducers'
import App from './containers/app'


require('./styles.scss');

const store = createStore(allReducers);

render(
  <Provider store={store}>
    <Router history = {browserHistory}>
      <Route path='/' component= {App}>

      </Route>
    </Router>
  </Provider>
, document.getElementById('app'));
