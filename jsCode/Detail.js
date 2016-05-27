
import React from 'react';
import {
	AppRegistry,
	Platform,
	Component,
	TouchableOpacity,
	StyleSheet,
	Navigator,
	View,
	Text
} from 'react-native'

import CallBack from './HomePage';

export default class Details extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	
	_openPage() {
		this.props.Details.push({
			title: 'CallBack',
			component: CallBack
		})
	}
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
				<Text>Details Page</Text>
				<TouchableOpacity onPress={this._openPage.bind(this)}>
					<Text style={{ color: '#55ACEE' }}>Call Back</Text>
				</TouchableOpacity>
			</View>
		);
	}
}