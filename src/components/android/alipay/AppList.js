'use strict';

import React,{ Component } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class AppList extends Component{
	render(){
		const {
			styles,
			data,
			topBorder,
			onMorePress,
			onAppPress
			} = this.props;
		const appRowList = data.map((row, rowIndex) => {
			let appColList = row.map((col,colIndex)=>{
				if(col.isMore){
					<View key={'appCol-'+colIndex} style={styles.appCol}>
						<TouchableOpacity 
							underlayColor="#B5B5B5"
							onPress={onMorePress}>
							<Text style={styles.appItemTextMore}>...</Text>
						</TouchableOpacity>
					</View>
				}
			});
		});

	}
}
