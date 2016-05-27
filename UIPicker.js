'use strict';

import React, {Component} from 'react';
import {
	Picker,
	Text,
	View,
	StyleSheet,
	TouchableHighlight,
	TouchableNativeFeedback
} from 'react-native';
import UIExplorerPage from './UIExplorerPage';
import UIExplorerBlock from './UIExplorerBlock';
const Item = Picker.Item;
class PickerExample extends Component{
	constructor(props){
		super(props);
		this.state={
			selected1: 'key1',
			selected2: 'key1',
			selected3: 'key1',
			color: 'red',
			mode: Picker.MODE_DIALOG
		};
	}
	render(){
		return (
			<UIExplorerPage title="<Picker>">
				<UIExplorerBlock title="Basic Picker">
					<Picker 
						style={styles.picker}
						selectedValue={this.state.selected1}
						onValueChange={this._onValueChange.bind(this,'selected1')}>
						<Item label="hello" value="key0"/>
						<Item label="world" value="key1"/>
					</Picker>
				</UIExplorerBlock>
				<UIExplorerBlock title="Dropdown Picker">
					<Picker
						style={styles.picker}
						selectedValue={this.state.selected2}
						onValueChange={this._onValueChange.bind(this,'selected2')}
						mode="dropdown">
							<Item label="hello" value="key0"/>
							<Item label="world" value="key1"/>
						</Picker>
				</UIExplorerBlock>
				<UIExplorerBlock title="Picker with prompt message">
					<Picker
						style={styles.picker}
						selectedValue={this.state.selected3}
						onValueChange={this._onValueChange.bind(this,'selected3')}
						prompt="Pick one, just one">
						<Item label="hello" value="key0"/>
						<Item label="world" value="key1"/>
					</Picker>
				</UIExplorerBlock>
				<UIExplorerBlock title="Colorful pickers">
					<Picker 
						style={[styles.picker,{color:'white',backgroundColor: '#333'}]}
						selectedValue={this.state.color}
						onValueChange={this._onValueChange.bind(this,'color')}
						mode="dialog"
					>
						<Item label="red" color="red" value="red"/>
						<Item label="green" color="green" value="green"/>
						<Item label="blue" color="blue" value="blue"/>
					</Picker>
				</UIExplorerBlock>
				<TouchableNativeFeedback
					onPress={()=>{alert('press')}}
					background={TouchableNativeFeedback.SelectableBackground()}
				>
					<View style={{width: 150, height: 100, backgroundColor: 'red'}}>
						<Text style={{margin: 30}}>Button</Text>
					</View>
				</TouchableNativeFeedback>
				<TouchableHighlight onPress={()=>{
					const {navigator}=this.props;
					if(navigator){
						navigator.pop();
					}
				}}>
					<Text>Home</Text>
				</TouchableHighlight>
			</UIExplorerPage>
		);
	}
	_onValueChange(key:string,value:string){
		const newState={};
		newState[key]=value;
		this.setState(newState);
	}
}
PickerExample.titles='<Picker>';
PickerExample.description='Provides multiple options to choose from, using either a dropdown menu or a dialog.';

const styles = StyleSheet.create({
	picker:{
		width: 100
	}
});
module.exports=PickerExample;



