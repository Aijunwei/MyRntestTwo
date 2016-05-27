import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import D from './Detail';

export default class HomePage extends React.Component {
    constructor(props) {
      super(props);
    
      this.state = {};
    }
    
    _openPage() {
        this.props.navigator.push({
            title: 'Details',
            component: D
        })
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                <Text>HomePage Page</Text>

                <TouchableOpacity onPress={this._openPage.bind(this)}>
                    <Text style={{ color: '#55ACEE' }}>Open New Page</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default HomePage;