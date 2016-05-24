'use strict';
import React, { Component } from 'react';
import {
	Image,
	StyleSheet,
	Text,
	View,
	TouchableHighlight
} from 'react-native';

import UIExplorerBlock from './UIExplorerBlock';
import UIExplorerPage from './UIExplorerPage';

class Entity extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<Text style={{fontWeight: 'bold', color: '#527fe4'}}>
				{this.props.children}
			</Text>
		);
	}
}

class AttributeToggler extends Component{
	constructor(props){
		super(props);
		this.state={
			fontWeight: 'bold',
			fontSize: 15
		};
		this.increaseSize=this.increaseSize.bind(this);
		this.toggleWeight=this.toggleWeight.bind(this);
	}
	toggleWeight(){
		this.setState({
			fontWeight: this.state.fontWeight === 'bold' ? 'normal' :'bold'
		});
	}
	increaseSize(){
		this.setState({
			fontSize: this.state.fontSize +1
		});
	}
	render(){
		let curStyle={
			fontWeight: this.state.fontWeight, fontSize: this.state.fontSize
		};

		return (
			<View>
				<Text style={curStyle}>
					Tap the Controls below to change attributes
				</Text>
				<Text>See how it will even work on <Text style={curStyle}>this nested text</Text></Text>
				<Text onPress={this.increaseSize} suppressHighlighting={true}>
					Increase size
				</Text>
			</View>
		);
	}
}

class TextExample extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<UIExplorerPage title="<Text>">
				<UIExplorerBlock title="wrap">
					<Text>
				     The text should wrap if it goes on multiple lines.
           			 See, this is going to the next line.
					</Text>
				</UIExplorerBlock>
				<UIExplorerBlock title="padding">
					<Text style={{padding: 10,width:400,height:30,borderColor:'red', borderStyle:'solid', borderWidth:2,backgroundColor: 'grey'}}>
						 This text is indented by 10px padding on all sides.
					</Text>
				</UIExplorerBlock>
				<UIExplorerBlock title="font family">
					<View style={{padding:20}}>
					<Text style={{fontFamily: 'sans-serif'}}> Sans-Serif</Text></View>
					<Text style={{fontFamily:'serif',padding:10}}>
						serif
					</Text>
				</UIExplorerBlock>
				<UIExplorerBlock title="Android Material Design fonts">
					<View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
						<View style={{flex: 1}}>
							<Text style={{fontFamily:'sans-serif'}}>
								Roboto Regular
							</Text>
							<Text style={{fontFamily:'sans-serif',fontStyle:'italic'}}>
								Roboto Regular
							</Text>
							<Text style={{fontFamily:'sans-serif',fontStyle:'italic',fontWeight:'bold'}}>
								Roboto Regular
							</Text>
							<Text style={{fontFamily:'sans-serif-light'}}>
								Roboto Regular
							</Text>
							<Text style={{fontFamily:'sans-serif-thin'}}>
								Roboto Regular
							</Text>
							<Text style={{fontFamily:'sans-serif-condensed'}}>
								Roboto Regular
							</Text>
						</View>
					</View>
				</UIExplorerBlock>
				<UIExplorerBlock title="font size">
					<Text style={{color: 'red'}}>
						Red color
					</Text>
				</UIExplorerBlock>
				<UIExplorerBlock title ="Text Decoration">
					<Text style={{textDecorationLine:'underline'}}>
						Solid underline
					</Text>
					<Text style={{textDecorationLine:'line-through'}}>line-through</Text>
					<Text style={{textDecorationLine:'line-through',textDecorationStyle:'solid'}}>line-through solid</Text>
				</UIExplorerBlock>
				<UIExplorerBlock title="nested">
					<Text onPress={()=>{console.log('list')}}>
						(Normal text,
							<Text style={{fontWeight:'bold'}}>
								(and bold
									<Text style={{fontStyle:'italic', fontSize: 11,color:'#527fe4'}}>
										(and tiny bold italic blue)
										<Text style={{fontWeight:'normal',fontStyle:'normal'}}>
											(and tiny normal blue)
										</Text>
									</Text>
							</Text>
					</Text>
					<Text style={{fontSize:12}}>
						<Entity>Entity Name</Entity>
					</Text>
				</UIExplorerBlock>
				<UIExplorerBlock title="Text Align">
					<Text>
						auto (default) -english LTR
					</Text>
					 <Text>
            			أحب اللغة العربية auto (default) - arabic RTL
         			 </Text>
         			 <Text style={{textAlign: 'left'}}>
         			 		left left left left
         			 </Text>
         			 <Text style={{textAlign: 'center'}}>
         			 	center
         			 </Text>
				</UIExplorerBlock>
				<UIExplorerBlock title="Unicode">
					<View style={{flex: 1}}>
						<View style={{flexDirection:'row'}}>
							<Text style={{backgroundColor:'red'}}>
								 星际争霸是世界上最好的游戏。
							</Text>
						</View>
						<View style={{flex: 1}}>
							<Text style={{backgroundColor: 'red'}}>
								星际争霸是世界上最好的游戏。
							</Text>
						</View>
						<View style={{flex:1, alignItems: 'center'}}>
							<Text style={{backgroundColor:'red'}}>
								 星际争霸是世界上最好的游戏。
							</Text>
						</View>
						<View style={{flex: 1}}>
							<Text style={{backgroundColor: 'red'}}>
								星际争霸是世界上最好的游戏。星际争霸是世界上最好的游戏。星际争霸是世界上最好的游戏。星际争霸是世界上最好的游戏。
							</Text>
						</View>
					</View>
				</UIExplorerBlock>
				<UIExplorerBlock title="text shadow">
					<Text style={{fontSize: 20, textShadowOffset:{width: 2, height: 2},textShadowRadius: 1, textShadowColor:'#00cccc'}}>
						Demo Text Shadow
					</Text>
				</UIExplorerBlock>
				<UIExplorerBlock title="return">
					<Text style={{fontSize:19,textAlign:'center'}} onPress={()=>{
						const {navigator}=this.props;
						if(navigator){
							navigator.pop();
						}
					}}>Home</Text>
				</UIExplorerBlock>
			</UIExplorerPage>
		);
	}
}
module.exports= TextExample;