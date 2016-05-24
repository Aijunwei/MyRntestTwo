'use strict';

import React, {Component} from 'react';
import {
	Slider,
	Text,
	StyleSheet,
	ListView,
	View
} from 'react-native';

import UIExplorerBlock from './UIExplorerBlock';
import UIExplorerPage from './UIExplorerPage';
class SliderExample extends Component{
	static defaultProps={
		value:0
	}
	constructor(props){
		super(props);
		this.state={
			value: this.props.value
		}
	}
	render(){
		return (
			<View>
				<Text style={styles.text}>
					{this.state.value&& +this.state.value.toFixed(3)}
				</Text>
				<Slider 
					{...this.props}
					onValueChange={(value)=> this.setState({value: value})}/>
			</View>
		);
	}
}

class SlidingCompleteExample extends Component{
	constructor(props){
		super(props);
		this.state={
			slideCompletionValue: 0,
			slideCompletionCount: 0
		};
	}
	render(){
		return (
			<View>
				<SliderExample
					{...this.props}
					onSlidingComplete={(value)=>{
						this.setState({
							slideCompletionValue: value,
							slideCompletionCount:this.state.slideCompletionCount+1
						});
					}}
				/>
				<Text>
					Completions: {this.state.slideCompletionCount} Value:{this.state.slideCompletionValue}
				</Text>
			</View>
		);
	}
} 

class SliderList extends Component{
	constructor(props){
		super(props);
		let ds=new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
		this.state={
			sliders: ds.cloneWithRows(examples)
		};
	}
	_renderRow(slider){
		return (
			<UIExplorerBlock title={slider.title}>
				{slider.render()}
			</UIExplorerBlock>
		);
	}
	render(){

		return (
			<UIExplorerPage
				title="Silders">
				<ListView dataSource={this.state.sliders} renderRow={this._renderRow}/>
			</UIExplorerPage>
		);
	}
}
var examples=[
	{
		title:'Default setting',
		render:()=>{
			return <SliderExample />
		}
	},{
		title:'initialValue 0.5',
		render:()=> <SliderExample value={0.5}/>
	},{
		title:'minimumValue:-1, maximumValue:2',
		render: ()=> <SliderExample minimumValue={-1} maximumValue={2}/>
	},{
		title: 'step: 0.25',
		render: ()=> <SliderExample step={0.25}/>
	}
];


var styles=StyleSheet.create({
	slider: {
		height: 10,
		margin: 10
	}
	,
	text: {
		fontSize: 14,
		textAlign: 'center',
		fontWeight: '500',
		margin: 10
	}
});

module.exports=SliderList;