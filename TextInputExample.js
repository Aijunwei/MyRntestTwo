'use strict';

import React,{ Component } from 'react';
import {
	Text,
	TextInput,
	View,
	StyleSheet
} from 'react-native';

class TextEventsExample extends Component{
	constructor(props){
		super(props);
		this.state={
			curText: '<No Event>',
			prevText: '<No Event>',
			prev2Text: '<No Event>'
		};
	}
	updateText(text){
		this.setState((state)=>{
			return {
				curText: text,
				prevText: state.curText
				prev2Text: state.prevText
			}
		});
	}
	render(){
		return (
			<View>
				<TextInput
					autoCapitalize="none"
					placeholder="Enter text to see events"
					autoCorrect={false}
					onFocus={()=>{this.updateText('onFpcus')}}
					onBlur={()=>{this.updateText('onBlur')}}
					onChange={(event)=> this.updateText('onChange text:'+event.nativeEvent.text)}
					onEndEditing={(event) => this.updateText('onEndEditing text:'+event.nativeEvent.text)}
					onSubmitEditing={(event)=> this.updateText('onSubmitEditing text:'+event.nativeEvent.text)}
					style={styles.singleLine}
				/>
				<Text style={styes.eventLabel}>
					{this.state.curText}{'\n'}
					(prev: {this.state.prevText}){'\n'}
					(prev2: {this.state.prev2Text}){'\n'}
				</Text>
			</View>
		);
	}
}

const styles=StyleSheet.create({
 multiline: {
    height: 60,
    fontSize: 16,
    padding: 4,
    marginBottom: 10,
  },
  eventLabel: {
    margin: 3,
    fontSize: 12,
  },
  singleLine: {
    fontSize: 16,
    padding: 4,
  },
  singleLineWithHeightTextInput: {
    height: 30,
  },
  hashtag: {
    color: 'blue',
    fontWeight: 'bold',
  }
});