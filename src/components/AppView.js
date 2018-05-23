import React, { Component } from 'react';

import DeviceUsage from './DeviceUsage'

// import { token } from '../common/token';

class AppView extends Component {
    state={}

    // componentWillMount() {
    //     let url = 'https://bubvn4vsm7.execute-api.eu-west-1.amazonaws.com/dev/equipment';
    //     let headers = new Headers();
    //     headers.append('Authorization', 'Bearer ' + token);

    //     fetch(url, {method:'GET',
    //             headers: headers,
    //         })
    //     .then(response => response.json())
    //     .then(json => console.log(json));
    // }

    render() {
        return (
            <DeviceUsage />
        )
    }
}

export default AppView