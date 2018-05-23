import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

// const options = {
//     title: {
//       text: 'My chart'
//     },
//     series: [{
//       data: [1, 2, 3]
//     }]
//   }

function Charts (props) {
  let {options} = props;
  console.log(options);
  return (<div>
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  </div>)
};

export default Charts