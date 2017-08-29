import React, { Component } from 'react';
import PracticeChart from './practiceChart';
import DateChart2 from './dateChart2';
import Header from './header';

import Select from 'react-select';

import { connect } from 'react-redux';
import * as actions from '../actions';

class App extends Component {

	constructor(){
		super();

		this.state = ({
			currencyQuery: 'USD',
			currencyPlaceHolder: 'Select a new base currency',
			daysPlaceHolder: 'Select a period of time',
			graphPlaceHolder: 'Select a default scale',
			colors: [],
			defaultDays: 30,
			currentGraphScale: 800
		})

		// this.renderChart = this.renderChart.bind(this);
	}


	componentWillMount(){
	  		//probably move this into the redux store if you want to make multipurpose switching between currencies
	  		//make a list of currencies and pass it in to the action creator with different tags 'USD', 'GBP' etc
	  		this.generateColors();
			this.props.fetchData(this.state.currencyQuery);
			this.props.fetchTimeData(this.state.currencyQuery, this.state.defaultDays);
  	}


 //  	componentWillReceiveProps(nextProps) {
	// 	if(this.props !== nextProps) {
	// 		this.setState({fakeData: this.props.fakeData});
	// 	}
	// }

  	logChange(val) {
  		this.setState({ currencyPlaceHolder: val.value, currencyQuery: val.value }, () => {
  			this.generateColors();
  			this.props.fetchData(this.state.currencyQuery);
  			this.props.fetchTimeData(this.state.currencyQuery, this.state.defaultDays);
  		});
  	}

  	daysChange(val) {
  		this.setState({ daysPlaceHolder: val.value + ' days', defaultDays: val.value }, () => {
  			this.props.fetchTimeData(this.state.currencyQuery, this.state.defaultDays);
  		});
  	}

  	scaleChange(val) {
  		this.setState({ currentGraphScale: val.value }, () => {
  		});
  	}

  	generateColors(){
  		var rgb = [];
		for(var j = 0; j < this.props.data.length; j++){
			var letters = '0123456789ABCDEF';
			var color = '#';
			for (var i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			rgb.push(color);
		}
		this.setState({ colors: rgb });
  	}

  	//if you want to change the fetchTimeData moment to determine how much time to look back, make a separate function that takes input

  	renderScale(){

  		var options = [
				{value: 800, label: 'normal'},
				{value: 3000, label: 'medium'},
				{value: 6500, label: 'large'},
				{value: 12000, label: 'largest'}
			  ];

  		return(
  			<div className="bind">
  				<Select
  					name="form-field-name"
  					placeholder={this.state.graphPlaceHolder}
				  	options={options}
				  	onChange={this.scaleChange.bind(this)}
				/>
  			</div>
  		)
  	}

  	renderAmountOfDays(){

  		var options = [
  						{value: 30, label: '1 month'},
  						{value: 90, label: '3 months'},
  						{value: 180, label: '6 months'},
  						{value: 365, label: '1 year'}
  					  ];

  		return(
  			<div className="bind">
  				<Select
  					name="form-field-name"
  					placeholder={this.state.daysPlaceHolder}
				  	options={options}
				  	onChange={this.daysChange.bind(this)}
				/>
  			</div>
  		)
  	}

  	renderSelect(){

  		var options = [{}];

  		options = this.props.data.map((data) => {
  			return { value: data.title, label: data.title };
  		})

  		return(
  			<div className="bind">
  				<Select
  					name="form-field-name"
  					placeholder={this.state.currencyPlaceHolder}
				  	options={options}
				  	onChange={this.logChange.bind(this)}
				/>
  			</div>
  		)
  	}

	render() {
		return(
			<div className="container-fluid">
				<Header />
				{ this.props.data === undefined
		            ? <div>
		                Still loading
		              </div>
		            : <div>
			              <PracticeChart
							fakeData={this.props.data}
							colors={this.state.colors}
						  />
						  <h1 className="space">
						  	Current Base Currency
						  </h1>
						  <h3 className="space">
						  	1&nbsp;{this.state.currencyQuery}
						  </h3>
						  {this.renderSelect()}
					  </div>
		        }

		        { this.props.render === false
		            ? <div className>
		            	<h2>
		                	Date Chart Hidden, turn on in Header
		                </h2>
		              </div>
		            : <div className="recharts-wrapper">
		            	{this.renderAmountOfDays()}
		            	{this.renderScale()}
				        <DateChart2 
				        	currency={this.props.currencyTime}
				        	colors={this.state.colors}
				        	base={this.state.currencyQuery}
				        	scale={this.state.currentGraphScale}
				        />
			          </div>
		        }
		   		
		   		<div className="bottomMargin">
		   		</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		data: state.data.currency,
		currencyTime: state.data.currencyTime,
		render: state.data.render
	};
}

export default connect(mapStateToProps, actions)(App);