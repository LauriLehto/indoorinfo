import React, { Component } from 'react'

import Chart from './Chart'
import {token} from '../common/token'

// const categories = [
//     { id: 3, text: 'Cardio'}
// ]
   
class CategoryUsage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            devices: [],
            title:'Usage by Category',
            category_id: 3,
            timePart:'week'
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
        result.map(device => this.getUtilization(device))
        
    }

    getUtilization({id, name}) {
        console.log(name)
        this.setState( prevState => ({
            devices: [...prevState.devices, name]
        }))
        let { timePart } = this.state
        let url= `https://bubvn4vsm7.execute-api.eu-west-1.amazonaws.com/dev/utilization?startDatetime=2018-04-30T00:00:00.000000Z&endDatetime=2018-05-07T00:00:00.000000Z&groupBy=timePart,equipment_id&timePart=${timePart}&metric=utilization&equipment_id=${id}`
   
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);

        fetch(url, {method:'GET',
                headers: headers,
            })
        .then(response => response.json())
        .then(responseData => this.utilizationToData(responseData));
    }

    utilizationToData(responseData) {
        let utilization=0;
        if(responseData[0]){
            utilization = responseData[0].utilization
        }
        console.log(utilization)
        this.setState(prevState => ({ 
            data: [...prevState.data, utilization ]
        }))
        
    }

    componentWillMount() {
        this.getAllEquipment();
        
    }

    render () {
        let { data, title, devices } = this.state;
        let options = {
                chart: {
                    type: 'bar'
                },
                title: {
                  text: title + ' / Cardio'
                },
                xAxis: {
                    categories: devices
                },
                yAxis: {
                    labels: {
                        formatter: function() {
                            return Math.round(this.value * 100) + ' %';
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

export default CategoryUsage