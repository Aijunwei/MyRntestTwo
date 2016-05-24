'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

class UIExplorerBlock extends Component{
	constructor(props){
		super(props);
		this.state={
			description:null
		};
	}
	render(){
		var description;
		if(this.props.description){
			description = 
			<Text>
				{this.props.description}
			</Text>;
		}

		return (
			<View style={styles.container}>
				<View style={styles.titleContianer}>
					<Text style={styles.titleText}>
						{this.props.title}
					</Text>
					{description}
				</View>
				<View style={styles.children}>
					{this.props.children}
				</View>
			</View>
		);
	}
};

UIExplorerBlock.propTypes={
	title:React.PropTypes.string,
	description: React.PropTypes.string
};

var styles= StyleSheet.create({
	container:{
		borderRadius: 3,
		borderWidth: 0.5,
		borderColor: '#dad7da',
		backgroundColor: '#ffffff',
		margin: 10,
		marginVertical: 5,
		overflow: 'hidden' 
	},
	titleContianer:{
		borderBottomWidth: 0.5,
		borderTopLeftRadius: 3,
		borderTopRightRadius: 2.5,
		borderBottomColor: '#d6d7da',
		backgroundColor:'#f6f7f8',
		paddingHorizontal: 10,
		paddingVertical: 5
	},
	titleText:{
		fontSize: 14,
		fontWeight: '500'
	},
	descriptionText:{
		fontSize: 14
	},
	children:{
		margin: 10
	}
	
});

module.exports=UIExplorerBlock;