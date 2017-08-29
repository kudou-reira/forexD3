import React, { Component } from 'react';
import * as d3 from "d3";
import { scaleBand, scaleLinear } from 'd3-scale';


import Axes from './axes';
import Bars from './bars';

import ChartComponent from './ui/responsiveChart';


class PracticeChart extends Component {

	constructor(){
		super()

		this.state = {
			fakeData: []
		}

		this.xScale = scaleBand();
		this.yScale = scaleLinear();

		this.xScaleY = scaleBand();
		this.yScaleY = scaleLinear();
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

		// const maxValueReduce = temp.reduce((prev, current) => {
		//     return (prev.value > current.value) ? prev : current
		// }) 

		// const maxValue = maxValueReduce.value;

		const maxValue = Math.max.apply(Math, this.props.fakeData.map(function(data){return data.value;}))

		//range is pixel values


		const xScale = this.xScale
							.padding(0.5)
							.domain(this.props.fakeData.map((d) => {
								return d.title + '\xa0\xa0\xa0\xa0' + d.value
							}))
							.range([margins.left, svgDimensions.width - margins.right]);

		const xScaleY = this.xScaleY
							.padding(0.5)
							.domain(this.props.fakeData.map((d) => {
								return d.title
							}))
							.range([margins.left, svgDimensions.width - margins.right])

		const yScale = this.yScale
							.domain([0, maxValue])
							.range([svgDimensions.height - margins.bottom, margins.top]);

		const yScaleY = this.yScaleY
							.domain([0, maxValue])
							.range([svgDimensions.height - margins.bottom, margins.top]);

		return(
			<div>
				<svg 
					width={svgDimensions.width} 
					height={svgDimensions.height}
				>
					<Axes
						scales={{ xScale, yScale }}
						margins={margins}
						svgDimensions={svgDimensions}
					/>

					<Bars
						scales={{xScaleY, yScaleY}}
						margins={margins}
						colors={this.props.colors}
						data={this.props.fakeData}
						maxValue={maxValue}
						svgDimensions={svgDimensions}
					/>

				</svg>

			</div>
		);
	}
}

// export default ChartComponent(PracticeChart);
export default ChartComponent(PracticeChart);