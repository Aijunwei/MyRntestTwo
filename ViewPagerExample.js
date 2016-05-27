'use strict';

import React,{ Component } from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	TouchableOpacity,
	View,
	ViewPagerAndroid
} from 'react-native';

import type { ViewPagerScrollState } from 'ViewPagerAndroid';

const PAGES = 5;
const BGCOLOR = ['#fdc08e', '#fff6b9', '#99d1b7', '#dde5fe', '#f79273'];
const IMAGE_URIS = [
  'http://apod.nasa.gov/apod/image/1410/20141008tleBaldridge001h990.jpg',
  'http://apod.nasa.gov/apod/image/1409/volcanicpillar_vetter_960.jpg',
  'http://apod.nasa.gov/apod/image/1409/m27_snyder_960.jpg',
  'http://apod.nasa.gov/apod/image/1409/PupAmulti_rot0.jpg',
  'http://apod.nasa.gov/apod/image/1510/lunareclipse_27Sep_beletskycrop4.jpg',
];


class LikeCount extends Component{
	constructor(props){
		super(props);
		this.state={
			likes: 0
		};
		this.onClick=this.onClick.bind(this);
	}
	onClick(){
		this.setState({
			likes: this.state.likes + 1
		});
	}
	render(){
		let thumbsUp = '\uD83D\uDC4D';
		return (
			<View style={styles.likeContainer}>
				<TouchableOpacity style={styles.likeButton} onPress={this.onClick}>
					<Text style={styles.likeText}>
						{thumbsUp + 'Like'}
					</Text>
				</TouchableOpacity>
				<Text style={styles.likeText}>
					{this.state.likes + 'likes'}
				</Text>
			</View>
		);
	}
}

class Button extends Component{
	constructor(props){
		super(props);
		this._handlePress=this._handlePress.bind(this);
	}
	_handlePress(){
		if(this.props.enabled && this.props.onPress){
			this.props.onPress();
		}
	}
	render(){
		return (
			<TouchableWithoutFeedback onPress={this._handlePress}>
				<View style={[styles.button,this.props.enabled ? {} : styles.buttonDisabled]}>
					<Text style={styles.buttonText}>{this.props.text}</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

class ProgressBar extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let fractionalPosition = (this.props.progress.position + this.props.progress.offset);
		let progressBarSize= (fractionalPosition / (PAGES-1)) * this.props.size;
		return (
			<View style={[styles.progressBarContainer,{width: this.props.size}]}>
				<View style={[styles.progressBar,{width: progressBarSize}]}></View>
			</View>
		);
	}
}

export default class ViewPagerAndroidExample extends Component{
	constructor(props){
		super(props);
		this.state={
			page: 0,
			animationsAreEnabled: true,
			progress: {
				position: 0,
				offset: 0
			}
		};
		this.onPageSelected = this.onPageSelected.bind(this);
		this.onPageScroll = this.onPageScroll.bind(this);
		this.onPageScrollStateChanged= this.onPageScrollStateChanged.bind(this);
	}
	onPageSelected(e){
		this.setState({
			page: e.nativeEvent.position
		});
	}
	onPageScroll(e){
		this.setState({progress: e.nativeEvent});
	}
	onPageScrollStateChanged(state: ViewPagerScrollState){
		this.setState({scrollState: state});
	}
	move(delta){
		let page = this.state.page + delta;
		this.go(page);
	}
	go(page){
		if(this.state.animationsAreEnabled){
			this.viewPager.setPage(page);
		}else{
			this.viewPager.setPageWithoutAnimation(page);
		}
		this.setState({
			page
		});
	}
	render(){
		let pages = [];
		for(let i=0; i<PAGES; i++){
			let pageStyle={
				backgroundColor: BGCOLOR[i % BGCOLOR.length],
				alignItems: 'center',
				padding: 20
			};
			pages.push(
				<View key={i} style={pageStyle} collapsable={false}>
					<Image 
						style={styles.image}
						source={{uri: IMAGE_URIS[i % BGCOLOR.length]}}
					/>
				</View>
			);
		}
		let {page,animationsAreEnabled}=this.state;
		return (
			<View style={styles.container}>
				<ViewPagerAndroid
					style={styles.viewPager}
					initialPage={0}
					onPageScroll={this.onPageScroll}
					onPageSelected={this.onPageSelected}
					onPageScrollStateChanged={this.onPageScrollStateChanged}
					pageMargin={10}
					ref={viewPager => {this.viewPager = viewPager}}
				>
				{pages}
				</ViewPagerAndroid>
				<View style={styles.buttons}>
					{
						animationsAreEnabled ?
						<Button 
							text="Turn off animations"
							enabled="true"
							onPress={()=> this.setState({animationsAreEnabled: false})}
						/> :
						<Button
							text="Turn animations back on"
							enabled={true}
							onPress={()=> this.setState({animationsAreEnabled:true})}
						/>
					}
					<Text style={styles.scrollStateText}>ScrollState[ {this.state.scrollState} ]</Text>
				</View>
				<View style={styles.buttons}>
					<Button text="Start" enabled={ page>0 } onPress={()=> this.go(0)}/>
					<Button text="Prev" enabled={ page > 0} onPress={()=>this.move(-1)}/>
					<Text style={styles.buttonText}>Page {page + 1} / {PAGES}</Text>
					<ProgressBar size={100} progress={this.state.progress}/>
				    <Button text="Next" enabled={page < PAGES - 1} onPress={() => this.move(1)}/>
                    <Button text="Last" enabled={page < PAGES - 1} onPress={() => this.go(PAGES - 1)}/>
				</View>
			</View>
		);
	}
}
const styles=StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	image: {
		width: 200,
		height: 200,
		padding: 20
	},
	likeContainer: {
		flexDirection: 'row'
	},
	likeButton: {
		backgroundColor: 'rgba(0,0,0,0.1)',
		borderColor: '#333333',
		borderWidth: 1,
		borderRadius: 5,
		flex: 1,
		margin: 8,
		padding: 8
	},
	likeText: {
		flex: 1,
		fontSize: 18,
		alignSelf: 'center'
	},
	button: {
		flex: 1,
		width: 0,
		margin: 5,
		borderColor: 'gray',
		borderWidth: 1,
		backgroundColor: 'gray'
	},
	buttons: {
		flexDirection: 'row',
		height: 30,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	buttonDisabled: {
		backgroundColor: 'black',
		opacity: 0.5
	},
	buttonText:{
		color: 'white'
	},
	progressBar: {
		alignSelf: 'flex-start',
		flex: 1,
		backgroundColor: '#eeeeee'
	},
	progressBarContainer: {
		height: 10,
		margin: 10,
		borderColor: '#eeeeee',
		borderWidth: 2
	},
	viewPager: {
		flex: 1
	},
	scrollStateText:{
		color: '#99d1b7'
	}
});