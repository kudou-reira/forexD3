import React, { Component } from 'react';
import PracticeChart from './practiceChart';

import Select from 'react-select';

import { connect } from 'react-redux';
import * as actions from '../actions';

class App extends Component {

	constructor(){
		super();

		this.state = ({
			currencyQuery: 'USD',
			placeHolder: 'Select a new base currency'
		})

		// this.renderChart = this.renderChart.bind(this);
	}


	componentWillMount(){
	  		//probably move this into the redux store if you want to make multipurpose switching between currencies
	  		//make a list of currencies and pass it in to the action creator with different tags 'USD', 'GBP' etc
			this.props.fetchData(this.state.currencyQuery);
  	}


 //  	componentWillReceiveProps(nextProps) {
	// 	if(this.props !== nextProps) {
	// 		this.setState({fakeData: this.props.fakeData});
	// 	}
	// }

  	logChange(val) {
  		this.setState({ placeHolder: val.value, currencyQuery: val.value }, () => {
  			this.props.fetchData(this.state.currencyQuery);
  		});
  	}

  	renderSelect(){

  		var options = [];

  		options = this.props.data.map((data) => {
  			return { value: data.title, label: data.title };
  		})

  		console.log("options", options);

  		return(
  			<div className="bind">
  				<Select
  					name="form-field-name"
  					placeholder={this.state.placeHolder}
				  	options={options}
				  	onChange={this.logChange.bind(this)}
				/>
  			</div>
  		)
  	}

	render() {
		console.log('app', this.props.data)
		return(
			<div className="container">
				{ this.props.data === undefined
		            ? <div>
		                Still loading
		              </div>
		            : <div>
			              <PracticeChart
							fakeData={this.props.data}
						  />
						  <h1 className="space">
						  	Current Base Currency
						  </h1>
						  <h3 className="space">
						  	{this.state.currencyQuery}
						  </h3>
						  {this.renderSelect()}
					  </div>
		        }
				
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		data: state.data.currency
	};
}

export default connect(mapStateToProps, actions)(App);