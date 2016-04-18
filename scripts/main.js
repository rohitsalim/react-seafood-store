import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route} from 'react-router';
import {createHistory} from 'history';

/* 
	Import Components
 */

import NotFound from './components/NotFound.js';
import StorePicker from './components/StorePicker.js';
import App from './components/App.js';


var routes = (
	<Router history={createHistory()}>
		<Route path="/" component={StorePicker}/>
		<Router path="/store/:storeId" component={App}/>
		<Route path="*" component={NotFound}/>
	</Router>
)

ReactDom.render(routes, document.querySelector('#main'));
