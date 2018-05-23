import React, { Component } from 'react'

import Chart from './Chart'
import {token} from '../common/token'

class CategoryUsage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [1, 2, 3],
            title:'Usage by Category',
            category_id:3,
            timePart:'day'
        }
    }

    getAllEquipment() {
        let url = 'https://bubvn4vsm7.execute-api.eu-west-1.amazonaws.com/dev/equipment';
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);

        fetch(url, {method:'GET',
                headers: headers,
            })
        .then(response => response.json())
        .then(responseData => this.getEquipmentIds(responseData));
    }

    getEquipmentIds(jsonData) {
        let result= jsonData.filter(device => device.equipment_category_id_parent===3)
        console.log(result)
        result.map(device => this.getUtilization(device))
        
    }

    getUtilization({id}) {
        console.log(id)
        let { timePart } = this.state
        let url= `https://bubvn4vsm7.execute-api.eu-west-1.amazonaws.com/dev/utilization?startDatetime=2018-04-30T00:00:00.000000Z&endDatetime=2018-05-06T00:00:00.000000Z&groupBy=timePart,equipment_id&timePart=${timePart}&metric=utilization&equipment_id=${id}`
   
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);

        fetch(url, {method:'GET',
                headers: headers,
            })
        .then(response => response.json())
        .then(responseData => console.log(responseData));
    }

    utilizationToData(jsonData) {
        let data = []
        jsonData.map(device => data.push(device.utilization))
        this.setState({data});
    }

    componentWillMount() {
        this.getAllEquipment();
        
    }

    render () {
        let { data, title } = this.state;

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

export default CategoryUsage