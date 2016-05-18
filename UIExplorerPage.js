'use strict';

import React, { Component } from 'react';
import {
	ScrollView,
	StyleSheet,
	View
} from 'react-native';

import UIExplorerTitle from './UIExplorerTitle';

class UIExplorerPage extends Component{
	render(){
		var ContentWrapper;
		var wrapperProps={};
		if(this.props.noScroll){
			ContentWrapper = (View: ReactClass<any>);
		}else{
			 ContentWrapper = (ScrollView: ReactClass<any>);
     		 wrapperProps.automaticallyAdjustContentInsets = !this.props.title;
     		 wrapperProps.keyboardShouldPersistTaps = true;
    		 wrapperProps.keyboardDismissMode = 'interactive';
		}
		var title = this.props.title ?
      <UIExplorerTitle title={this.props.title} /> :
      null;
		var spacer = this.props.noSpacer ? null : <View style={styles.spacer}></View>
		return (
			<View style={styles.container}>
				{title}
				<ContentWrapper
					style={styles.wrapper}
					{...wrapperProps}
				>
				{this.props.children}
				{spacer}
				</ContentWrapper>
			</View>
		);
	}
}

var styles=StyleSheet.create({
	spacer:{
		height: 270
	},
	container:{
		flex:1,
		backgroundColor: '#e9eaed'
	},
	wrapper:{
		flex: 1,
		paddingTop: 10
	}
});

module.exports=UIExplorerPage;