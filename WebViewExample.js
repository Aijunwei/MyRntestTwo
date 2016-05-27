'use strict';

import React,{Component} from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	TouchableOpacity,
	View,
	WebView
} from 'react-native';

const HEADER = '#3b5998';

const BGWASH = 'rgba(255,255,255,0.8)';
const DISABLED_WASH = 'rgba(255,255,255,0.25)';

const TEXT_INPUT_REF = 'urlInput';
const WEBVIEW_REF = 'webview';
const DEFAULT_URL = 'https://m.facebook.com';

export default class WebViewExample extends Component{
	constructor(props){
		super(props);
		this.state={
			url: DEFAULT_URL,
			status: 'No Page Loaded',
			backButtonEnabled: false,
			forwardButtonEnabled: false,
			loading: true,
			scalesPageToFit: true
		};
		this.onNavigationStateChange=this.onNavigationStateChange.bind(this);
		this.handleTextInputChange=this.handleTextInputChange.bind(this);
		this.goBack=this.goBack.bind(this);
		this.goForward=this.goForward.bind(this);
		//this.reload=this.reload.bind(this);
		this.onSubmitEditing=this.onSubmitEditing.bind(this);
		this.pressGoButton=this.pressGoButton.bind(this);
		this.inputText=this.state.url;
	}
	handleTextInputChange(e){

		let url = e.nativeEvent.text;
		if(!/^[a-zA-Z-_]+:/.test(url)){
			url='http://'+url;
		}
		this.inputText=url;
	}
	onNavigationStateChange(navState){
		this.setState({
			backButtonEnabled: navState.canGoBack,
			forwardButtonEnabled: navState.canGoForward,
			url: navState.url,
			status: navState.title,
			loading: navState.loading,
			scalesPageToFit: true
		});
	}
	onShouldStartLoadWithRequest(event){
		return true;
	}
	goBack(){
		this.refs[WEBVIEW_REF].goBack();
	}
	goForward(){
		this.refs[WEBVIEW_REF].goForward();
	}
	reload(){
		this.refs[WEBVIEW_REF].reload();
	}
	onSubmitEditing(){
		this.pressGoButton();
	}
	pressGoButton(){
		let url= this.inputText.toLowerCase();
		if(url===this.state.url){
			this.reload();
		} else{
			this.setState({
				url: url
			});
		}
		 this.refs[TEXT_INPUT_REF].blur();
	}
	render(){
		return (
			<View style={styles.container}>
				<View style={styles.addressBarRow}>
					<TouchableOpacity 
						onPress={this.goBack}
						style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
						<Text>{'<'}</Text>
					</TouchableOpacity>
					<TouchableOpacity 
						onPress={this.goForward}
						style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}>
						<Text>{'>'}</Text>
					</TouchableOpacity>
					<TextInput
						ref={TEXT_INPUT_REF}
						autoCapitalize="none"
						defaultValue={this.state.url}
						onSubmitEditing={this.onSubmitEditing}
						onChange={this.handleTextInputChange}
						clearButtonMode="while-editing"
						style={styles.addressBarTextInput}
					/>
					<TouchableOpacity onPress={this.pressGoButton}>
						<View style={styles.goButton}>
							<Text>go</Text>
						</View>
					</TouchableOpacity>
				</View>
				<WebView
					ref={WEBVIEW_REF}
					automaticallyAdjustContentInsets={false}
					style={styles.webView}
					source={{uri: this.state.url}}
					javaScriptEnabled={true}
					domStorageEnabled={true}
					onNavigationStateChange={this.onNavigationStateChange}
					onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
					startInloadingState={true}
					scalesPageToFit={this.state.scalesPageToFit}
				>
				</WebView>
				<View style={styles.statusBar}>
					<Text style={styles.statusBarText}>{this.state.status}</Text>
				</View>
			</View>
		);
	}
}	

const styles=StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: HEADER
	},
	addressBarRow:{
		flexDirection: 'row',
		padding: 8
	},
	navButton:{
		width: 20,
		padding: 3,
		marginRight: 3,
		alignItems: 'center',
		justifyContent:'center',
		backgroundColor:BGWASH,
		borderColor: 'transparent',
		borderRadius: 3
	},
	  disabledButton: {
	  	width: 20,
	  	padding: 3,
	  	marginRight: 3,
	  	alignItems: 'center',
	  	justifyContent: 'center',
	  	backgroundColor: DISABLED_WASH,
	  	borderColor: 'transparent',
	  	borderRadius: 3,
  },
  addressBarTextInput:{
  	backgroundColor:BGWASH,
  	borderColor:'transparent',
  	borderRadius: 3,
  	borderWidth: 1,
  	height:24,
  	paddingLeft: 10,
  	paddingTop: 3,
  	paddingBottom: 3,
  	flex:1,
  	fontSize: 14
  },
  goButton:{
  	height: 24,
  	padding:3,
  	marginLeft:8,
  	alignItems: 'center',
  	backgroundColor: BGWASH,
  	borderColor:'transparent',
  	borderRadius:3,
  	alignSelf:'stretch',
  	justifyContent:'center'
  },
  webView:{
  	backgroundColor: BGWASH,
  	height: 350
  },
  statusBar:{
  	flexDirection: 'row',
  	alignItems: 'center',
  	paddingLeft: 5,
  	height: 22
  },
  statusBarText:{
  	color: 'white',
  	fontSize: 13
  }
});