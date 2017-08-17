import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
var moment = require('moment');
var now = moment();

class Header extends Component {

	constructor(){
		super()

		this.state = {
			currentTime: now
		}
	}

	checkMarkets() {

		var markets = [];
		var printMarkets = [];

		var germany = !this.isItTime('06:00', '14:00');
		console.log("ger", germany);

		var UK = !this.isItTime('07:00', '15:00');
		console.log("uk", UK);

		var USA = !this.isItTime('12:00', '20:00');
		console.log("usa", USA);

		var AUS = !this.isItTime('22:00', '06:00');
		console.log("aus", AUS);

		var JPN = !this.isItTime('23:00', '07:00');
		console.log("jpn", JPN);

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

		console.log(markets);

		for(var i = 0; i < markets.length; i++){
			printMarkets[i] = " " + markets[i]
		}

		return(
			"Markets trading now: " + printMarkets
		);

	}

	isItTime(startTimeString, endTimeString) {
	    let now = moment.utc(this.state.currentTime);

	    let start = moment(startTimeString, 'HH:mm', true);
	    let end = moment(endTimeString, 'HH:mm', true);

	    console.log("now", now);
	    console.log(start);

	    if (end.isBefore(start)) {
	        if (now.isBefore(end)) {
	            start.subtract(1, 'day');
	        } else {
	            end.add(1, 'day');
	        }
	    }

	    return now.isBetween(start, end, null, '[)');
	}

	render(){
		return(
				<div className="container">
					<Navbar inverse collapseOnSelect>
					    <Navbar.Header>
					      <Navbar.Brand>
					        <a href="#">Forex</a>
					      </Navbar.Brand>
					      <Navbar.Toggle />
					    </Navbar.Header>
					    <Navbar.Collapse>
					      <Nav>
					        <NavItem className="navbar-item" href="#">Link</NavItem>
					        <NavItem href="#">Link</NavItem>
					        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
					          <MenuItem eventKey={3.1}>Action</MenuItem>
					          <MenuItem eventKey={3.2}>Another action</MenuItem>
					          <MenuItem eventKey={3.3}>Something else here</MenuItem>
					          <MenuItem divider />
					          <MenuItem eventKey={3.3}>Separated link</MenuItem>
					        </NavDropdown>
					      </Nav>
					      <Nav pullRight>
					      	<NavItem>
						      	{this.checkMarkets()}
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

export default Header;