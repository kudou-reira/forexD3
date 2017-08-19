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

	// componentWillReceiveProps(nextProps) {
	// 	if(this.props !== nextProps) {
	// 		this.setState({timeData: this.props.timeData});
	// 	}
	// }

	calculateDays() {
		var currentDate = moment();
		var hold = enumerateDays('2017-8-10', currentDate);

		var days = [];
		var firstDay = hold[0];
		var currencies;
		var globalHold;
		var test;

		function callback(d) {
			globalHold = d;
			console.log("this is globalHold", globalHold);
			return globalHold;
		}

		// do the transfer of data here
		days = hold.map((date) => {
			
			var inBetween = calculateBetween(firstDay, date);
			// this.props.fetchTimeData('USD', "2017-08-05"); 


			var tempData = this.fetchTimeData(this.props.base, date, callback)
			//make this async someHOW
			console.log("this is tempData", globalHold)
	

			return(
				{
					currencies: 'hi',
					date: date,
					days: inBetween
				}
			)
		})



	}

	fetchTimeData (currency, date, callback) {
		var temp;
		var empty = [];
	    axios.get(`http://api.fixer.io/${date}?base=${currency}`)
	    	.then((res) => {
	    		const temp  = res.data.rates;
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

		        return empty;
	    	}).then((res2) => {
	    		console.log(res2)
	    		callback(res2);
	    	})
        
	};


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

function mapStateToProps(state) {
	return {
		currencyTime: state.data
	};
}

export default connect(mapStateToProps, actions)(DateChart);