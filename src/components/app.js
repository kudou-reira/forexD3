import React, { Component } from 'react';
import PracticeChart from './practiceChart';
import axios from 'axios';
import _ from 'lodash';

class App extends Component {

	constructor(){
		super();

		this.state = ({
			data: undefined
		})

		// this.renderChart = this.renderChart.bind(this);
	}


	componentWillMount(){
	  		//probably move this into the redux store if you want to make multipurpose switching between currencies
	  		//make a list of currencies and pass it in to the action creator with different tags 'USD', 'GBP' etc
	  		axios.get('http://api.fixer.io/latest?base=USD')
		    	.then((response) => {
			        const temp  = response.data.rates;
			        var arr = Object.keys(temp).map(function (key) { 
			          return (
			              temp[key]
			          ); 
			        });

			        var arr2 = Object.keys(temp).map(function (key) { 
			          return (
			              key
			          ); 
			        });

			        var empty = [];

			        for(var i = 0; i < arr.length; i++){
			          empty[i] = {title: arr2[i], value: arr[i]};
			        }

			        _.remove(empty, {title: 'IDR'});
			        _.remove(empty, {title: 'KRW'});
			        _.remove(empty, {title: 'HUF'});

			        empty.sort((a, b) => {
					    var titleA = a.title.toLowerCase()
					    var titleB = b.title.toLowerCase()
					    if (titleA < titleB) //sort string ascending
					        return -1 
					    if (titleA > titleB)
					        return 1
					    return 0 //default return value (no sorting)
					})

			        this.setState({ data: empty });
			        console.log(this.state.data)
		    })
  	}

  	// renderChart(){

  	// 	if(this.state.data.length === 0){
  	// 		return(
  	// 			<div>
  	// 				Still Loading
  	// 			<div>
  	// 		);
  	// 	}

  	// 	else {
  	// 		return (
  	// 			<div className="container">
			// 		<PracticeChart
			// 			fakeData={this.state.data}
			// 		/>
			// 	</div>
  	// 		);
  	// 	}
  	// }


	render() {
		return(
			<div className="container">
				{ this.state.data === undefined
		            ? <div>
		                Still loading
		              </div>
		            : <PracticeChart
						fakeData={this.state.data}
					  />
		        }
				
			</div>
		);
	}
}

export default App;