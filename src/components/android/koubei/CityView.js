'use strict';
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export class CityView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View>
                <Text>{this.props.title}</Text>
            </View>
        );
    }
}

class CityCard extends Component{
    render(){
        return (
            <View>

            </View>
        );
    }
}

const styles=StyleSheet.create({
    cardContainer:{

    },
    cardTitle:{

    }
});