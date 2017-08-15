import React, { Component } from 'react';
import * as d3 from "d3";
import { scaleBand, scaleLinear } from 'd3-scale';

import Axes from './axes';
import Bars from './bars';

import ChartComponent from './ui/responsiveChart';


class PracticeChart extends Component {

	constructor(){
		super()

		this.xScale = scaleBand();
		this.yScale = scaleLinear();
	}

	render(){

		const margins = { top: 50, right: 20, bottom: 100, left: 60 };
		const svgDimensions = { width: 1200, height: 800 };

		const maxValueReduce = this.props.fakeData.reduce(function(prev, current) {
		    return (prev.value > current.value) ? prev : current
		}) 

		const maxValue = maxValueReduce.value;
		//range is pixel values
		console.log(this.props.fakeData);
		console.log("maxValue", maxValue);

		const xScale = this.xScale
							.padding(0.5)
							.domain(this.props.fakeData.map(d => d.title))
							.range([margins.left, svgDimensions.width - margins.right]);

		const yScale = this.yScale
							.domain([0, maxValue])
							.range([svgDimensions.height - margins.bottom, margins.top])

		return(
			<div>
				PracticeChart
				<svg 
					width={svgDimensions.width} 
					height={svgDimensions.height}
				>
					<Axes
						scales={{ xScale, yScale}}
						margins={margins}
						svgDimensions={svgDimensions}
					/>

					<Bars
						scales={{xScale, yScale}}
						margins={margins}
						data={this.props.fakeData}
						maxValue={maxValue}
						svgDimensions={svgDimensions}
					/>

				</svg>

			</div>
		);
	}
}

export default ChartComponent(PracticeChart);