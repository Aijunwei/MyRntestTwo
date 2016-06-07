'use strict';

import React,{Component} from 'react';
import {
	ScrollView,
	Text,
	StyleSheet,
	TouchableOpacity,
	View,
	Animated,
	Image
} from 'react-native';

class ScrollViewExample extends Component{
	constructor(props){
		super(props);
	}
	componentWillMount(){
		this._animatedValue=new Animated.Value(0);
	}
	render(){
		var _scrollView: ScrollView;
		var interpolateColor = this._animatedValue.interpolate({
			inputRange:[0,5000],
			outputRange:['rgba(255,255,255,1)','rgba(51,156,177,1)'],
			extropolate:'clamp'
		});
		var scrollEvent=Animated.event([
			{
				nativeEvent:{
					contentOffset:{
						y: this._animatedValue
					}
				}
			}
		]);
		return (
			<View style={{flex: 1}}>
				<ScrollView
					ref={(scrollView)=>{_scrollView = scrollView}}
					onScroll={scrollEvent}
					style={styles.scrollView}>
					<Animated.View style={{height:5000,backgroundColor:interpolateColor}}>
							<Text>scroll</Text>
					</Animated.View>
				</ScrollView>
				<TouchableOpacity
				style={styles.button}
				onPress={()=>{_scrollView.scrollTo({y:0})}}>
				</TouchableOpacity>
			</View>
		);
	}
}

class Thumb extends Component{
	shouldComponentUpdate(nextProps,nextState){
		return false;
	}
	render(){
		return (
			<View style={styles.button}>
				<Image style={styles.img} source={{uri: this.props.uri}}/>
			</View>
		);
	}
}
var THUMBS = ['https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851549_767334479959628_274486868_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851561_767334496626293_1958532586_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851579_767334503292959_179092627_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851589_767334513292958_1747022277_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851563_767334559959620_1193692107_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851593_767334566626286_1953955109_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851591_767334523292957_797560749_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851567_767334529959623_843148472_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851548_767334489959627_794462220_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851575_767334539959622_441598241_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851573_767334549959621_534583464_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851583_767334573292952_1519550680_n.png'];
THUMBS = THUMBS.concat(THUMBS); // double length of THUMBS
var createThumbRow = (uri, i) => <Thumb key={i} uri={uri} />;
var styles=StyleSheet.create({
scrollView: {
  flex: 1
  },
  horizontalScrollView: {
    height: 120,
  },
  containerPage: {
    height: 50,
    width: 50,
    backgroundColor: '#527FE4',
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: '#888888',
    left: 80,
    top: 20,
    height: 40,
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  buttonContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  },
  img: {
    width: 64,
    height: 64,
  }
});

module.exports=ScrollViewExample;