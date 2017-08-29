import React, { Component }  from 'react';
import { scaleOrdinal } from 'd3-scale';


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

      	this.colorOrdinalScale = scaleOrdinal()
							.domain([0, this.props.maxValue])
							.range(this.props.colors);

      	//let color = d3.scaleOrdinal()
      // .domain(["New York", "San Francisco", "Austin"])
      // .range(["#FF0000", "#009933" , "#0000FF"]);
	}

	render() {
		const { scales, margins, data, svgDimensions } = this.props;
		const { xScaleY, yScaleY } = scales;
		const { height } =  svgDimensions;

		const bars = (
				data.map(datum => {
					return(
							<rect
								key={datum.title}
								x={xScaleY(datum.title)}
								y={yScaleY(datum.value)}
								height={height - margins.bottom - scales.yScaleY(datum.value)}
								width={xScaleY.bandwidth()}
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