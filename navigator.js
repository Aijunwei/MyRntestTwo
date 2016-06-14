import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ListView,
	TouchableHighlight,
	AppRegistry
} from 'react-native';

import ImageExample from './ImageExample';
import MapViewExample from './MapViewExample';
import UIListViewExample from './UIListViewExample';
import ModalExample from './ModalExample';
import UIPicker from './UIPicker';
import ImportNews from './test';
import UIProgressBar from './UIProgressBar';
import RefreshControlExample from './UIRefreshControl';
import ScrollViewExample from './ScrollViewExample';
import SliderList from './SliderExample'; 
import TextExample from './TextExample';
import ToolbarAndroidExample from './ToolbarAndroidExample';
import Background from './background';
import ViewPagerExample from './ViewPagerExample';
import WebViewExample from './WebViewExample';
import TextInputExample from './TextInputExample';
import Alipay from './src/components/android/Entry';
import Animations from './src/demoCompo/animation';
import DragDemo from './src/demoCompo/DragDemo';
import EmitterExample from './src/demoCompo/Emitter';
import NativeModuleDemo from './src/demoCompo/NativeModuleDemo';
import NativeStorage from './src/demoCompo/NativeStorage';
import { SimpleTabView,ScrollTabBar,Test,OverlayTabView
 } from './src/demoCompo/TabScrollView';
import TestListPopover from './src/demoCompo/TestListPopover'; 
import TestIt from './src/demoCompo/TestIt'; 
import Table from './src/demoCompo/Table';

var router=[
	{
		name: 'ImageExamples',
		component: ImageExample
	},{
		name: 'UIListViewExample',
		component: UIListViewExample
	},{
		name:'ModalExample',
		component:ModalExample
	},{
		name:'UIPicker',
		component:UIPicker
	},{
		name:'test',
		component:ImportNews
	},{
		name:'ProgressBar',
		component:UIProgressBar
	},{
		name:'RefreshControlExample',
		component:RefreshControlExample
	},{
		name:'ScrollViewExample',
		component:ScrollViewExample
	},
	{
		name:'Slider',
		component:SliderList
	},
	{
		name:'Text',
		component: TextExample
	},{
		name: 'ToolbarAndroid',
		component: ToolbarAndroidExample
	},{
		name:'background',
		component:Background
	},
	{
		name: 'ViewPagerAndroid',
		component:ViewPagerExample
	},{
		name:'WebView',
		component:WebViewExample
	},{
		name:'TextInput',
		component: TextInputExample
	},{
		name: 'Animated',
		component: Animations	
	},{
		name: 'dragDemo',
		component: DragDemo	
	},{
		name: 'Emitter',
		component: EmitterExample	
	},
	{
		name: 'nativeDemo',
		component: NativeModuleDemo	
	},{
		name: 'NativeStorage',
		component:NativeStorage	
	},
	{
		name:'SimpleTabView',
		component: SimpleTabView	
	},
	{
		name: 'ScrollTabBar',
		component: ScrollTabBar	
	},
	{
		name:'OverlayTabView',
		component:OverlayTabView
	},{
		name:'TestListPopover',
		component:TestListPopover
	},{
		name:'TestIt',
		component:TestIt
	},
	{
		name:'充值',
		component:Table
	},
	{
		name: 'Alipay',
		component: Alipay
	}
];
var ds= new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2 });
var menuDataSource=ds.cloneWithRows(router);
class Main extends Component{
	constructor(props){
		super(props);
		this.renderRow=this.renderRow.bind(this);
	}
	render(){
		return (
			<View>
				<ListView dataSource={menuDataSource} renderRow={this.renderRow}/>
				<TouchableHighlight onPress={()=>{
					//AppRegistry.unmountApplicationComponentAtRootTag();
				}}>
					<Text>Exit</Text>
				</TouchableHighlight>
			</View>
			);
	}
	renderRow(route){
		return(
		<View>
			<TouchableHighlight onPress={()=>{this._onPress(route)}} underlayColor="#a9d9d4">
				<Text style={styles.text}>
					{route.name}
				</Text>
			</TouchableHighlight>
		</View>
		);

	}
	_onPress(route){
		const { navigator } = this.props;
		if(navigator){
		
			navigator.push({
				name:route.name,
				component:route.component
			})
		}
	}
}
var styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#F5FCFF'
	},
	text:{
		fontSize:19,
		textAlign:'center',
		flex: 1
	}
});


module.exports=Main;

