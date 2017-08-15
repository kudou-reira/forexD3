import React, { Component }  from 'react';
import { scaleLinear, scaleOrdinal } from 'd3-scale';

import { interpolateLab } from 'd3-interpolate';

//set different colors here

class Bars extends Component {
	constructor(props){
		super(props)

		// ["#572500", "#F68026"]
		// this.colorScale = scaleLinear()
		// 					.domain([0, this.props.maxValue])
		// 					.range(['#F3E5F5', '#7B1FA2'])
        //     				.interpolate(interpolateLab);

  		//create an array of only the currency values
  		//create a range of only colors, then pass both arrays in

  		//make this color generator a function in the future

  		var rgb = [];

		for(var j = 0; j < this.props.data.length; j++){
			var letters = '0123456789ABCDEF';
			var color = '#';
			for (var i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			rgb.push(color);
		}
			
		console.log(rgb);

      	this.colorOrdinalScale = scaleOrdinal()
							.domain([0, this.props.maxValue])
							.range(rgb);

      	//let color = d3.scaleOrdinal()
      // .domain(["New York", "San Francisco", "Austin"])
      // .range(["#FF0000", "#009933" , "#0000FF"]);
	}

	render() {
		const { scales, margins, data, svgDimensions } = this.props;
		const { xScale, yScale } = scales;
		const { height } =  svgDimensions;

		const bars = (
				data.map(datum => {
					return(
							<rect
								key={datum.title}
								x={xScale(datum.title)}
								y={yScale(datum.value)}
								height={height - margins.bottom - scales.yScale(datum.value)}
								width={xScale.bandwidth()}
								fill={this.colorOrdinalScale(datum.value)}
							/>
					)
				})
		);

		return(
				<g>{bars}</g>
		);
	}
}

export default Bars;