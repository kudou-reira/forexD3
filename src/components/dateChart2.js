import React, { Component } from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip
} from 'recharts';
import _ from 'lodash';


class DateChart2 extends Component {

  componentWillMount(){
    this.setState({tempColor: this.props.colors})
  }

  renderChartLines() {
    var symbols = ["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HRK", "ILS", "INR", "JPY", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"]

    symbols = symbols.filter((currency) => {
      return currency !== this.props.base;
    })

    // var symbols2 = this.props.currency.map((day) => {
    //   console.log("this is one day", day);
    //   return Object.keys(_.pickBy(day, _.isNumber));
    // })

    // console.log(symbols2[0]);
    // var x = symbols2.pop();
    // console.log(x)

    return symbols.map(symbol => {

      return (
        <Line
          key={symbol}
          type="monotone"
          dataKey={symbol}
          stroke={_.sample(this.props.colors)}
        />
      )
    })
  }

  render() {

    return (

      <LineChart width={1800} height={this.props.scale} data={this.props.currency}>
        <XAxis dataKey="date" />
        <YAxis type="number" />
        <Legend />
        <Tooltip />
        {this.renderChartLines()}
      </LineChart>
    )
  }
}

export default DateChart2;
