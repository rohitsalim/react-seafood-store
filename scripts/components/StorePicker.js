/*
	StorePicker
 */

import React from 'react';  // The ES6 Way of importing things
import { History } from 'react-router';
import h from '../helpers.js';

var StorePicker = React.createClass({
	mixins: [History],
	goToStore: function(event) {
		event.preventDefault();
		// get the data from the input
		var storeId = this.refs.storeId.value;

		// transition from <StorePicker/> to <App/>
		this.history.pushState(null, '/store/' + storeId);
	},
	render: function() {
		return (
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Please Enter a Store</h2>
				<input type="text" ref="storeId" defaultValue={h.getFunName()} required />
				<input type="Submit" />
			</form>
		)
	}

});

export default StorePicker;