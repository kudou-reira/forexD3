import React, { Component } from 'react';
import { connect } from 'react-redux';
var Chart = require('react-d3-core').Chart;
var LineChart = require('react-d3-basic').LineChart;

class DateChart extends Component {

	constructor(){
		super()

		this.state = {

		}

	}

	// componentWillMount() {
	// 	this.setState({fakeData: this.props.fakeData});
	// 	console.log('state fakeData', this.state.fakeData);
	// }

	// componentWillReceiveProps(nextProps) {
	// 	if(this.props !== nextProps) {
	// 		this.setState({fakeData: this.props.fakeData});
	// 	}
	// }

	render(){

		const margins = { top: 50, right: 20, bottom: 100, left: 60 };
		const svgDimensions = { width: 1400, height: 800 };

		var data = [
          {
              "age": 39,
              "index": 0
          },
          {
              "age": 38,
              "index": 1
          },
          {
              "age": 34,
              "index": 2
          },
          {
              "age": 12,
              "index": 3
          }
      ];

      //for color, pass the array of colors to the redux store then pop off from the beginning into chartSeries

      var chartSeries = [
          {
            field: 'age',
            name: 'USD',
            color: '#ff7f0e',
            style: {
              "stroke-width": 2,
              "stroke-opacity": .2,
              "fill-opacity": .2
            }
          }
        ],
        x = function(d) {
          return d.index;
        }


		return(
			<div>
				<LineChart
					margins= {margins}
			        width={svgDimensions.width}
			        height={svgDimensions.height}
			        data= {data} 
			        chartSeries= {chartSeries} 
			        x= {x}
			    />
			</div>
		);
	}
}

export default DateChart;