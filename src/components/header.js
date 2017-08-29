import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';
var moment = require('moment');
var now = moment();

class Header extends Component {

	constructor(){
		super()

		this.state = {
			currentTime: now,
			showCurrencies: true
		}
	}


	checkMarkets() {

		//australia and japan are broken(?)

		var markets = [];
		var printMarkets = [];

		var germany = !this.isItTime('07:00', '15:00');
		var UK = !this.isItTime('08:00', '16:00');
		var USA = !this.isItTime('12:00', '20:00');
		var AUS = this.isItTime('22:00', '06:00');
		var JPN = this.isItTime('23:00', '07:00');

		if(germany === true){
			markets.push("EUR")
		}

		if(UK === true){
			markets.push("GBP")
		}

		if(USA === true){
			markets.push("USD")
		}

		if(AUS === true){
			markets.push("AUD")
		}

		if(JPN === true){
			markets.push("JPY")
		}


		for(var i = 0; i < markets.length; i++){
			printMarkets[i] = " " + markets[i]
		}

		return(
			"Major markets trading now: " + printMarkets
		);

	}

	isItTime(startTimeString, endTimeString) {
	    let now = moment(this.state.currentTime);

	    let start = moment(startTimeString, 'HH:mm', true);
	    let end = moment(endTimeString, 'HH:mm', true);

	    if (end.isBefore(start)) {
	        if (now.isBefore(end)) {
	            start.subtract(1, 'day');
	        } else {
	            end.add(1, 'day');
	        }
	    }

	    return now.isBetween(start, end, null, '[)');
	}

	/*

  	logChange(val) {
  		this.setState({ placeHolder: val.value, currencyQuery: val.value }, () => {
  			this.generateColors();
  			this.props.fetchData(this.state.currencyQuery);
  			this.props.fetchTimeData(this.state.currencyQuery);
  		});
  	}

	*/

	showDateChart(){
		//there were problems here, idk why this fixes it...
		console.log(this.state.showCurrencies);
		var x = this.state.showCurrencies;
		console.log(x);
		var x = !x;
		console.log(x);
		this.setState({showCurrencies: x}, () => {
			console.log(this.state.showCurrencies);
			this.props.renderChart(this.state.showCurrencies);
		});
	}

	renderOff(){
		if(this.state.showCurrencies === true){
			return(
				<MenuItem eventKey={3.1} onClick={this.showDateChart.bind(this)}>Turn off Currency Date Chart</MenuItem>
			)
		}

		else{
			return(
				<MenuItem eventKey={3.1} onClick={this.showDateChart.bind(this)}>Turn on Currency Date Chart</MenuItem>
			)
		}
	}

	render(){
		return(
				<div className="container">
					<Navbar inverse collapseOnSelect>
					    <Navbar.Header>
					      <Navbar.Brand>
					        <a href="http://fixer.io/" target="_blank">Forex API</a>
					      </Navbar.Brand>
					      <Navbar.Toggle />
					    </Navbar.Header>
					    <Navbar.Collapse>
					      <Nav>
					        <NavDropdown eventKey={3} title="Show Currencies Over Time" id="basic-nav-dropdown">
					          {this.renderOff()}
					          <MenuItem divider />
					          

					        </NavDropdown>
					      </Nav>
					      <Nav pullRight>
					      	<NavItem>
						      	{this.checkMarkets()}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					      	</NavItem>
					      	<NavItem>
						      	The current time is: &nbsp;
	        						<Moment>{this.state.currentTime}</Moment>
						      	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					      	</NavItem>
					      </Nav>
					    </Navbar.Collapse>
					  </Navbar>
				</div>
		);
	}
}

export default connect(null, actions)(Header);