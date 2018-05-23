import React, { Component } from 'react'

import Chart from './Chart'
import {token} from '../common/token'

class DeviceUsage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data:[],
            days:[],
            title:'Device Usage',
            equipment_id:'194',
            timePart:'day',
            startDateTime: '2018-04-16T00:00:00.000000Z',
            endDateTime: '2018-04-29T00:00:00.000000Z'
        }
    }

    getUtilization() {
        let { equipment_id, timePart, startDateTime, endDateTime } = this.state
        let url= `https://bubvn4vsm7.execute-api.eu-west-1.amazonaws.com/dev/utilization?startDatetime=${startDateTime}&endDatetime=${endDateTime}&groupBy=timePart,equipment_id&timePart=${timePart}&metric=utilization&equipment_id=${equipment_id}`
   
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);

        fetch(url, {method:'GET',
                headers: headers,
            })
        .then(response => response.json())
        .then(responseData => this.utilizationToData(responseData));
    }

    utilizationToData(jsonData) {
        let data = []
        let days = []
        jsonData.map(device => data.push(device.utilization))
        this.setState({data});
        jsonData.map(device => days.push(device.timePart))
        this.setState({days})
        
    }

    componentWillMount() {
        this.getUtilization()
    }

    render () {
        let { data, title, days, equipment_id } = this.state;

        let options = {
                chart: {
                    type: 'bar'
                },
                title: {
                  text: title + ' / ' + equipment_id
                },
                xAxis: {
                    categories: days
                },
                yAxis: {
                    labels: {
                        formatter: function() {
                            return Math.round( this.value * 100 ) + ' %';
                        }
                    },
                },
                series: [
                  {data}
                ]
            }

        return (
            <Chart options={options} />
        )
    }
}

export default DeviceUsage