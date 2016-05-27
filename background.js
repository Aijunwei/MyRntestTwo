'use strict';

import React, {Component} from 'react';
import {
	Image,
	View,
	Text
} from 'react-native';

class Background extends Component{
	constructor(props){
		super(props);
		this.state={
			x: 0,
			y:0,
			width:0,
			height:0
		}
	}
	render(){
		return <View style={{flex:1}} onLayout={(event)=>{
			var {x,y,width,height}=event.nativeEvent.layout;
			this.setState({
				x:x,
				y:y,
				width:width,
				height:height
			});

		}}>
			<Image style={{width:this.state.width,height:this.state.height}} source={require('./bunny.png')}/>
		</View>
	}
}

module.exports=Background;