/*
 App
 */

import React from 'react';

// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://ro-catch-of-the-day2.firebaseio.com/');

// React Catalyst
import Catalyst from 'react-catalyst';
 
import Fish from './Fish.js';
import Header from './Header.js';
import Order from './Order.js';
import Inventory from './Inventory.js';

var App = React.createClass({
	mixins : [Catalyst.LinkedStateMixin],
	getInitialState: function() {
		return {
			fishes: {},
			order: {}
		}
	},
	componentDidMount: function() {
		base.syncState(this.props.params.storeId + '/fishes', {
			context: this,
			state: 'fishes'
		});

		var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);
		if(localStorageRef) {
			this.setState({
				order: JSON.parse(localStorageRef)
			})
		}
	},
	componentWillUpdate: function(nextProps, nextState) {
		localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
	},
	addToOrder: function(key) {
		this.state.order[key] = this.state.order[key] + 1 || 1;
		this.setState({order : this.state.order });
	},
	addFish: function(fish) {
		var timestamp = (new Date()).getTime();
		// update the state object
		this.state.fishes['fish-' + timestamp] = fish;
		// set the state
		this.setState({fishes: this.state.fishes});
	},
	removeFromOrder: function(key) {
		delete this.state.order[key];
		this.setState({
			order: this.state.order
		});

	},
	removeFish: function(key) {
		if (confirm("Are you sure you want to remove this fish?")) {
			this.state.fishes[key] = null;
			this.setState({
				fishes: this.state.fishes
			});
		}
	},
	renderFish: function(key) {
		return (
			<Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
			)
	},
	loadSamples: function() {
		console.log("Button clicked");
		this.setState({
			fishes: require('../sample-fishes')
		});
	},
	render: function() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="list-of-fishes">
						{Object.keys(this.state.fishes).map(this.renderFish)}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
				<Inventory 
					addFish={this.addFish}
					loadSamples={this.loadSamples}
					fishes={this.state.fishes}
					linkState={this.linkState}
					removeFish={this.removeFish}/>
			</div>	
		)
	}

});

export default App;