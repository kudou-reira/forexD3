import Moment from 'react-moment';
import 'moment-timezone';
import * as actions from '../actions';
import { enumerateDays, calculateBetween } from './helpers/helperFunctions';
import getTimeData from './helpers/getFunctions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
var moment = require('moment');


var Chart = require('react-d3-core').Chart;
var LineChart = require('react-d3-basic').LineChart;


class DateChart extends Component {

	constructor(){
		super()

		this.state = {
			timeData: [],
			holdTimeData: []
		}
	}

	componentWillMount() {
		this.calculateDays();
	}

	calculateDays() {
		var currentDate = moment();
		var hold = enumerateDays('2017-8-10', currentDate);

		var days = [];
		var firstDay = hold[0];

		// do the transfer of data here
		days = hold.map((date) => {
			
			var inBetween = calculateBetween(firstDay, date);
			this.props.fetchTimeData(this.props.base, date);

			console.log("this is tempData", this.props.saveTime)

			//map over tempData and push the values as an object to an array
			//put the array variable outside of this map

			return(
				{
					currencies: 'test',
					date: date,
					days: inBetween
				}
			)

			// make an array of objects, but need it for every currency
			// ex.
			/*
			
			[
				AUD: {
					value: *value from props here, but need every day's worth*
					date: date,
					days: inBetween
				},
				BGN: {
	
				},
				BRL: {
	
				},
				etc...
			]


			*/

			/*
				use this to get the names of key
				for keys of an object
				Object.keys(array).join(" ")

				can also make an array

				var arr_keys = []
				for(var i in arr){
					arr_keys.push(i)
				}

			*/

			/*
				from the data set up, looks like you can put 

				[
					{
						"AUD": value,
						"index": days or inBetween from above
					},
					etc...
				]

				does it work if you put in an array of objects and just change the currency name...?
			*/

			
		})

		console.log(days);

	}



	flattenData(days) {
		//first make a list of all currencies
	}


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

      //just push all the data in here, but differentiate them with their currency value key "AUD", etc

      //for color, pass the array of colors to the redux store then pop off from the beginning into chartSeries

      // https://github.com/react-d3/react-d3-basic

      // http://www.reactd3.org/docs/basic/#line_multiple

      // https://github.com/react-d3/react-d3-basic

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
    	]

        //iterate over a list of years and calculate days from using moment
        //the data will have years, but the function down here will change it
        //set the very first index date as the "from" date in moment.js
        var x = function(d) {
          return d.index;
        }

		return(
			<div>
				<LineChart
					margins={margins}
			        width={svgDimensions.width}
			        height={svgDimensions.height}
			        data={data} 
			        chartSeries= {chartSeries} 
			        x= {x}
			    />
			    {console.log(this.props.saveTime)}
			    {console.log(this.props.allTime)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		saveTime: state.data.currencyTime,
		allTime: state.data
	};
}

export default connect(mapStateToProps, actions)(DateChart);