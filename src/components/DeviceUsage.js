import React, { Component } from 'react'

import Chart from './Chart'
import {token} from '../common/token'

class DeviceUsage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data:[],
            title:'Device Usage',
            equipment_id:'194',
            timePart:'day'
        }
    }

    getUtilization() {
        let { equipment_id, timePart } = this.state
        let url= `https://bubvn4vsm7.execute-api.eu-west-1.amazonaws.com/dev/utilization?startDatetime=2018-04-16T00:00:00.000000Z&endDatetime=2018-04-29T00:00:00.000000Z&groupBy=timePart,equipment_id&timePart=${timePart}&metric=utilization&equipment_id=${equipment_id}`
   
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
        jsonData.map(device => data.push(device.utilization))
        this.setState({data});
    }

    componentWillMount() {
        this.getUtilization()
    }

    render () {
        let { data,title } = this.state;

        let options = {
                title: {
                  text: title
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