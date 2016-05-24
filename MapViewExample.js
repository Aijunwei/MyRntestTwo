'use strict';

import React, {Component} from 'react';
import {
	Image,
	MapView,
	StyleSheet,
	Text,
	TextInput,
	TouchabelHighlight,
	View
} from 'react-native';

var regionText = {
	latitude: '0',
	longitude: '0',
	latitudeDelta: '0',
	longitudeDelta: '0',
};

type MapRegion={
	latitude: number,
	longitude: number,
	latitudeDelta?: number,
	longitudeDelta?: number
};

type MapRegionInputState = {
	region: MapRegion,
};

class MapRegionInput extends Component{
	constructor(props){
		super(props);
		this.state={
			region:{
				latitude: 0,
				longitude:0,
				longitudeDelta:0,
				latitudeDelta:0
			}
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			region: nextProps.region || this.state.region
		});
	}
	render(){
		var region = this.state.region;
		return (
			<View>
				<View style={styles.row}>
					<Text>{'Latitude'}</Text>
					<TextInput
						value={''+region.latitude}
						style={styles.textinput}
						onChange={this._onChangeLatitude}
						selectTextOnFocus={true}
					/>
				</View>
				<View style={styles.row}>
					<Text>{'Longitude'}</Text>
					<TextInput
						value={''+region.longitude}
						style={styles.textinput}
						onChange={this._onChangeLongitude}
						selectTextOnFocus={true}
					/>
				</View>
				  <View style={styles.row}>
          			<Text>
          				  {'Latitude delta'}
         			 </Text>
         			 <TextInput
          			  value={
            			  region.latitudeDelta == null ? '' : String(region.latitudeDelta)
         			   }
          			  style={styles.textInput}
          			  onChange={this._onChangeLatitudeDelta}
          			  selectTextOnFocus={true}
         			 />
       			 </View>
        		<View style={styles.row}>
       			   <Text>
           			 {'Longitude delta'}
         			 </Text>
         			<TextInput
         			   value={
          				   region.longitudeDelta == null ? '' : String(region.longitudeDelta)
         			   }
        			    style={styles.textInput}
          				  onChange={this._onChangeLongitudeDelta}
         			   selectTextOnFocus={true}
        			  />
      			  </View>
      			  <View style={styles.changeButton}>
      			  		<Text onPress={this._change}>
      			  			{'Change'}
      			  		</Text>
      			  </View>
			</View>
		);
	}
	_onChangeLatitude(e){
		regionText.latitude = e.nativeEvent.text;
	}
	_onChangeLongitude(e){
		regionText.longitude =e.nativeEvent.text;
	}
	_onChangeLatitudeDelta(e){
		regionText.latitudeDelta=e.nativeEvent.text;
	}
	_onChangeLongitudeDelta(e){
		regionText.longitudeDelta = e.nativeEvent.text;
	}
	_change(){
		this.setState({
			region:{
				latitude : parseFloat(regionText.latitude),
				longitude: parseFloat(regionText.longitude),
				latitudeDelta: parseFloat(regionText.latitudeDelta),
				longitudeDelta: parseFloat(regionText.longitudeDelta)
			}
		});
		this.props.onChange(this.state.region);
	}
};

MapRegionInput.propTypes={
	region: React.PropTypes.shape({
		latitude: React.PropTypes.number.isRequired,
		longitude: React.PropTypes.number.isRequired,
		latitudeDelta: React.PropTypes.number,
		longitudeDelta: React.PropTypes.number,
	}),
	onChange: React.PropTypes.func.isRequired
};

type Annotations = Array<{
	animateDrop?: boolean,
	latitude: number,
	longitude: number,
	title?: string,
	subtitle?: string,
	hasLeftCallout?: boolean,
	hasRightCallout?: boolean,
	onLeftCalloutPress?: Function,
	onRightCalloutPress?: Function,
	tintColor?: number | string,
	image?: any,
	id?: string,
	view?: ReactElement,
	leftCalloutView?: ReactElement,
	rightCalloutView?: ReactElement,
	detailCalloutView?: ReactElement,
}>;
type MapViewExampleState = {
  isFirstLoad: boolean,
  mapRegion?: MapRegion,
  mapRegionInput?: MapRegion,
  annotations?: Annotations,
};

class MapViewExample extends Component{
	constructor(props){
		super(props);
		this.state={
			isFirstLoad: true
		};
		this._onRegionChangeComplete=this._onRegionChangeComplete.bind(this);
		this._onRegionInputChange=this._onRegionInputChange.bind(this);
	}
	render(){
		return (
			<View>
				<MapView
					style={styles.map}
					onRegionChange={this._onRegionChange}
					onRegionChangeComplete={this._onRegionChangeComplete}
				>
				</MapView>
				<MapRegionInput
					onChange={this._onRegionInputChange}
					region={this.state.mapRegionInput}
				/>
			</View>
		);
	}
	_onRegionChange(region){
		this.setState({
			mapRegionInput: region
		});
	}
	_onRegionChangeComplete(region){
		if(this.state.isFirstLoad){
			this.setState({
				mapRegionInput: region,
				annotations: this._getAnnotations(region),
				isFirstLoad: false
			});

		}
	}
	_getAnnotations(region):Annotations{
		return [{
			longitude: region.longitude,
			latitude: region.latitude,
			title: 'You Are Here'
		}];
	}
	_onRegionInputChange(region){
		this.setState({
			mapRegion: region,
			mapRegionInput: region,
			annotations: this._getAnnotations(region)
		});
	}
}
var styles=StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	textinput: {
		width: 150,
		height: 20,
		borderWidth: 0.5,
		borderColor: '#aaaaaa',
		fontSize: 13,
		padding: 4,
	},
	changeButton:{
		alignSelf: 'center',
		marginTop: 5,
		padding: 3,
		borderWidth: 0.5,
		borderColor: '#777777'
	},
	map:{
		height: 150,
		margin: 10,
		borderWidth: 1,
		borderColor: '#000000'
	}
});

exports.displayName = (undefined: ?string);
exports.title = '<MapView>';
exports.description='Base component to display maps';

exports.examples = [
	{
		title: 'Map',
		render(){
			return <MapViewExample />;
		}
	},
	{
		title: 'Map shows user location',
		render(){
			return <MapView style={styles.map} showUserLocations={true} />
		}
	}
]