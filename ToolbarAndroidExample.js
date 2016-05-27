'use strict';

import React,{ Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Switch,
	ToolbarAndroid,
	Image
} from 'react-native';

import UIExplorerBlock from './UIExplorerBlock';
import UIExplorerPage from './UIExplorerPage';

class TooolbarAndroidExample extends Component{
	constructor(props){
		super(props);
		this.state={
			actionText: 'Example app with toolbar component',
			toolbarSwitch: false,
			colorProps:{
				titleColor: '#3b5998',
				subtitleColor:'#6a7180'
			}
		};
		this._onActionSelected=this._onActionSelected.bind(this);
	}
	_onActionSelected(position){
		this.setState({
			actionText: 'Selected '+ toolbarActions[position].title
		});
	}
	render(){
		return (
			<UIExplorerPage title="<ToolbarAndroid>">
				<UIExplorerBlock title="Toolar with title/subtitle and actions">
					<ToolbarAndroid 
						actions={toolbarActions}
						navIcon={require('image!ic_menu_black_24dp')}
						onActionSelected={this._onActionSelected}
						onIconClicked={()=>{this.setState({actionText: 'Icon clicked'})}}
						style={styles.toolbar}
					/>
					<Text>{this.state.actionText}</Text>
				</UIExplorerBlock>
				<UIExplorerBlock title="Toolbar with logo & custom title view">
					<ToolbarAndroid
					logo={require('./launcher_icon.png')}
					style={styles.toolbar}>
						<View style={{flexDirection: 'row',height: 56, alignItems: 'center'}}>
							<Switch value={this.state.toolbarSwitch}
								onValueChange={(value)=> this.setState({toolbarSwitch: value})}
							/>
							<Text>switch</Text>
						</View>
					</ToolbarAndroid>
				</UIExplorerBlock>
				<UIExplorerBlock title="Toolbar with navIcon & logo, no title">
					<ToolbarAndroid 
						actions={toolbarActions}
						logo={require('./launcher_icon.png')}
						navIcon={require('./ic_menu_black_24dp.png')}
						style={styles.toolbar}
					/>
				</UIExplorerBlock>
				<UIExplorerBlock title="Toolbar with custom title colors">
					<ToolbarAndroid
						navIcon={require('./ic_menu_black_24dp.png')}
						onIconClicked={() => this.setState({colorProps: {}})}
						title="Wow, such toolbar"
						style={styles.toolbar}
						subtitle="much native"
						{...this.state.colorProps}
					/>
				</UIExplorerBlock>
				<UIExplorerBlock>
					<ToolbarAndroid
						actions={[{title:'Bunny',icon: require('./bunny.png'), show: 'always'}]}
						logo={require('./hawk.png')}
						navIcon={require('./bunny.png')}
						title="Buny and Hawk"
						style={styles.toolbar}
					/>
				</UIExplorerBlock>
				<UIExplorerBlock title="Toolbar with custom overflowIcon">
					<ToolbarAndroid
						actions={toolbarActions}
						overflowIcon={require('./bunny.png')}
						style={styles.toolbar}
					/>
				</UIExplorerBlock>
			</UIExplorerPage>
		);
	}
}
const toolbarActions=[
	{title: 'Create', icon: require('./ic_create_black_48dp.png'),show:'always'},
	{title:'Filter'},
	{title: 'Settings', icon: require('./ic_settings_black_48dp.png'),show:'always'}
];

const styles=StyleSheet.create({
	toolbar: {
		backgroundColor: '#e9eaed',
		height: 56
	},
});

module.exports= TooolbarAndroidExample;