'use strict';

import React, { Component } from 'react';
import {
	ProgressBarAndroid,
	TouchableHighlight,
	Text
} from 'react-native';

import UIExplorerBlock from './UIExplorerBlock';
import UIExplorerPage from './UIExplorerPage';

class MovingBar extends Component{
	constructor(props){
		super(props);
		this.state={
			progress: 0
		};
	}
	componentDidMount(){
		this.tag=setInterval(()=>{
			var progress = (this.state.progress + 0.02) % 1;
			this.setState({progress : progress});
		},50);
	}
	componentWillUnmount(){
		clearInterval(this.tag);
	}
	render(){
		return <ProgressBarAndroid  progress={this.state.progress} {...this.props}/>
	}
}

class ProressBarExample extends Component{
	static info={
		title: '<ProgressBarAndroid>',
		description:'Visual indicator of progress of some operation.'
	}
	constructor(props){
		super(props);
	}
	render(){
		return (
			<UIExplorerPage title="ProgressBar examples">
				<UIExplorerBlock title="Default ProgressBar">
					<ProgressBarAndroid />
				</UIExplorerBlock>
				<UIExplorerBlock title="Normal ProgressBar">
					<ProgressBarAndroid styleAttr="Normal"/>
				</UIExplorerBlock>
				<UIExplorerBlock title="small progressBar">
					<ProgressBarAndroid styleAttr="Small"/>
				</UIExplorerBlock>
				<UIExplorerBlock title="Large progressBar">
					<ProgressBarAndroid styleAttr="Large"/>
				</UIExplorerBlock>
				<UIExplorerBlock title="Inverse progressBar">
					<ProgressBarAndroid styleAttr="Inverse"/>
				</UIExplorerBlock>
				<UIExplorerBlock title="LargeInverse progressBar">
					<ProgressBarAndroid styleAttr="LargeInverse"/>
				</UIExplorerBlock>
			    <UIExplorerBlock title="Large Red ProgressBar">
                    <ProgressBarAndroid styleAttr="Large" color="red" />
                </UIExplorerBlock>
                <UIExplorerBlock title="Horizontal ProgressBar">
         			 <MovingBar styleAttr="Horizontal" indeterminate={false} />
       			 </UIExplorerBlock>
       			 <UIExplorerBlock title="Horizontal Black Indeterminate ProgressBar">
          			<ProgressBarAndroid styleAttr="Horizontal" color="black" />
       			 </UIExplorerBlock>
       			 <UIExplorerBlock title="Horizontal Blue ProgressBar">
         			 <MovingBar styleAttr="Horizontal" indeterminate={false} color="blue" />
       			 </UIExplorerBlock>
       			 <UIExplorerBlock title="Home">
         			 <TouchableHighlight onPress={()=>{
         			 	const {navigator} =this.props;
         			 	if(navigator){
         			 		navigator.pop();
         			 	}
         			 }}>
         			 	<Text style={{fontSize:19}}>Home</Text>
         			 </TouchableHighlight>
       			 </UIExplorerBlock>
			</UIExplorerPage>
		);
	}
}

module.exports=ProressBarExample;
