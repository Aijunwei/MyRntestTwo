'use strict';

import React, {Component} from 'react';
import {
	Modal,
	StyleSheet,
	Switch,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
exports.displayName = (undefined: ?string);
exports.framework = 'React';
exports.title = '<Modal>';
exports.description = 'Component for presenting modal views.';

class Button extends Component{
	constructor(props){
		super(props);
		this.state={
			active: false
		};
		this._onHideUnderlay=this._onHideUnderlay.bind(this);
		this._onShowUnderlay=this._onShowUnderlay.bind(this);
	}
	render(){
		var colorStyle={
			color: this.state.active ? '#ffffff' : '#000000'
		};
		return (
			<TouchableHighlight 
				onHideUnderlay={this._onHideUnderlay}
				onPress={this.props.onPress}
				onShowUnderlay={this._onShowUnderlay}
				style={[styles.button,]}
				underlayColor="#a9d9d4"
			>
				<Text style={[styles.buttonText,colorStyle]}>{this.props.children}</Text>
			</TouchableHighlight>
		);
	}
	_onHideUnderlay(){
		this.setState({
			active: false
		});
	}
	_onShowUnderlay(){
		this.setState({
			active: true
		})
	}

}

class ModalExample extends Component{
	constructor(props){
		super(props);
		this.state={
			animated: true,
			modalVisible: false,
			transparent: false
		}
	}
	_setModalVisible(visible){
		this.setState({
			modalVisible: visible
		});
	}
	_toggleAnimated(){
		this.setState({
			animated: !this.state.animated
		});
	}
	_toggleTransparent(){
		this.setState({
			transparent: !this.state.transparent
		})
	}
	render(){
		var modalBackgroundStyle={
			backgroundColor: this.state.transparent ? 'rgba(0,0,0,0.5)' : '#f5fcff'
		};
		var innerContainerTransparentStyle = this.state.transparent ? {backgroundColor:'#ffffff',padding: 20} : null;
		return (
			<View>
				<Modal
					animated={this.state.animated}
					transparent={this.state.transparent}
					visible={this.state.modalVisible}
					onRequestClose={() => {this._setModalVisible(false)}}>
					<View style={[styles.container,modalBackgroundStyle]}>
						<View style={[styles.innerContainer,innerContainerTransparentStyle]}>
							<Text>This modal was presented {this.state.animated ? 'with' : 'without'} animation.</Text>
							<Button
								onPress={this._setModalVisible.bind(this,false)}
								style={styles.modalButton}>
								Close
								</Button>
						</View>
					</View>
				</Modal>
				<View style={styles.row}>
					<Text style={styles.rowTitle}>Animated</Text>
					<Switch value={this.state.animated} onValueChange={this._toggleAnimated.bind(this)} />
				</View>
				<View style={styles.row}>
					<Text style={styles.rowTitle}>Transparent</Text>
					<Switch value={this.state.transparent} onValueChange={this._toggleTransparent.bind(this)} />
				</View>
				<Button onPress={this._setModalVisible.bind(this,true)}>
					Present
				</Button>
				<Button 
					onPress={()=>{
						const {navigator} =this.props;
						if(navigator){
							navigator.pop();
						}
					}}>
					Return 
				</Button>
			</View>
		);
	}
}

/*exports.examples=[
	{
		title: 'Modal Presentation',
		description: 'Modals can be presented with or without animation',
		render:()=> <ModalExample />
	}
];*/
var styles = StyleSheet.create({
	button:{
		borderRadius: 5,
		flex: 1,
		height: 44,
		alignSelf: 'stretch',
		justifyContent:'center',
		overflow: 'hidden'
	},
	container:{
		flex: 1,
		justifyContent: 'center',
		padding: 30
	},
	innerContainer:{
		borderRadius: 10,
		alignItems: 'center'
	},
	modalButton:{
		marginTop: 20
	},
	row:{
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		marginBottom: 20
	},
	rowTitle:{
		flex: 1,
		fontWeight: 'bold'
	},
	buttonText:{
	fontSize: 18,
    margin: 5,
    textAlign: 'center',	
	}
});

module.exports=ModalExample;