import React, { Component } from 'react';

import DeviceUsage from './DeviceUsage'
import CategoryUsage from './CategoryUsage'

class AppView extends Component {
    state={}

    render() {
        return (
            <div>
                <DeviceUsage />
                <CategoryUsage />
            </div>
        )
    }
}

export default AppView