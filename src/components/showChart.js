import React, { Component } from 'react';
import * as d3 from "d3";

class ShowChart extends Component {

	constructor(props){
		super(props);
		this.state = {
			data: [132,71,337,93,78,43,20,16,30,8,17,21]
		}
	}

	componentDidMount(){
		var w = 1000;
		var h = 700;
		var x = d3.scaleLinear()
					.domain([0,d3.max(this.state.data)])
					.range([0,w]);
		var y  = d3.scaleLinear()
					.domain([0,this.state.data.length])
					.range([0,h]);

		var context = this.setContext(w, h);
		var context2 = this.setBackground(context, x, y);
		this.setText(context2, x, y);

	}

	setContext(w, h){
		var svg = d3.select(this.refs.chart).append('svg')
				.attr("id", "chartGraph")
				.attr("text-align", "center")
				.attr("width", w)
				.attr("height", h);
		var chart = svg.append("g")
						.classed("display", true);
		return svg;
	}

	setBackground(context, x, y) {
		var temp = context.selectAll(".bar")
			.data(this.state.data)
			.enter()
				.append("rect")
				.classed("bar", true)
				.attr("x", 0)
				.attr("y", (d, i) => { 
					return y(i);
				})
				.attr("width", (d, i) => {
					return x(d);
				})
				.attr("height", (d, i) => {
					return y(1)-1;
				})

		return temp;
	}

	setText(temp, x, y){
		temp.selectAll(".bar-label")
			.data(this.state.data)
			.enter()
				.append("text")
				.classed("bar-label", true)
				.attr("x", 0)
				.attr("y", (d, i) => {
					return y(i);
				})
				.text(function(d, i){
					console.log(d)
					return d;
				})
				.attr("dy", function(d, i){
					return y(1)/1.5
				})
	}

	render(){
		return(
			<div className="chart">
				<div ref="chart">
				</div>
			</div>
		);
	}
}

export default ShowChart;