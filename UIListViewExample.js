'use strict';

import React, { Component } from 'react';
import {
	View,
	Text,
	ListView,
	ImageView,
	Image,
	StyleSheet,
	TouchableHighlight,
	RecyclerViewBackedScrollView
} from 'react-native';

var UIExplorerPage = require('./UIExplorerPage');

class UIListViewExample extends Component{
	constructor(props){
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
		this.state={
			dataSource: ds.cloneWithRows(this._genRows({}))
		}
		this._renderRow=this._renderRow.bind(this);

	}
	componentWillMount(){
		this._pressData={};
	}
	render(){
	//	return <View></View>
		return (
			<UIExplorerPage 
				title={this.props.naviator ? null : '<ListView>'}
				noSpacer={true}
				noScroll={true}
			>
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this._renderRow}
				renderScrollComponent={ props => <RecyclerViewBackedScrollView {...props} />}
				renderSeparator ={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
			/>
			<TouchableHighlight  style={{height:44,overflow:'hidden',alignSelf:'stretch',justifyContent:'center'}} underlayColor="#a9d9d4" onPress={()=>{
				const {navigator}=this.props;
				navigator&&navigator.pop();
			}}>
				<Text style={{fontSize:19,textAlign:'center',color:'#a9d9d4'}}>Return Menu</Text>
			</TouchableHighlight>
			</UIExplorerPage>
		);
	}
	_renderRow(rowData: string, sectionID: number, rowID: number){
		var rowHash = Math.abs(hashCode(rowData));
		var imgSource = THUMB_URLS[rowHash % THUMB_URLS.length];
/*		return 				<View>
					<View style={styles.row}>
						<Image style={styles.thumb} source={imgSource}/>
						<Text style={styles.text}>
							{rowData + ' - '+LOREM_IPSUM.substr(0,rowHash % 301+10)}
						</Text>
					</View>
				</View>*/
		return (
			<TouchableHighlight
				onPress={() => {this._pressRow(rowID)}}>
				<View>
					<View style={styles.row}>
						<Image style={styles.thumb} source={imgSource}/>
						<Text style={styles.text}>
							{rowData + ' - '+LOREM_IPSUM.substr(0,rowHash % 301+10)}
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		);

	}
	_genRows(pressData: {[key: number]: boolean}):Array<string>{
		var dataBlob=[];
		for(var ii=0;ii<100;ii++){
			var pressedText = pressData[ii] ? '(pressed)' :'';
			dataBlob.push('Row' +ii +pressedText);
		}
		return dataBlob;
	}
	_pressRow(rowID:number){
		this._pressData[rowID] =!this._pressData[rowID];
		this.setState({dataSource: this.state.dataSource.cloneWithRows(this._genRows(this._pressData))})
	}
}

UIListViewExample.title='<ListView>';
UIListViewExample.description='Performant, scrollable list data';

var THUMB_URLS = [
  require('./Thumbnails/like.png'),
  require('./Thumbnails/dislike.png'),
  require('./Thumbnails/call.png'),
  require('./Thumbnails/fist.png'),
  require('./Thumbnails/bandaged.png'),
  require('./Thumbnails/flowers.png'),
  require('./Thumbnails/heart.png'),
  require('./Thumbnails/liking.png'),
  require('./Thumbnails/party.png'),
  require('./Thumbnails/poke.png'),
  require('./Thumbnails/superlike.png'),
  require('./Thumbnails/victory.png'),
  ];

 var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.';

 var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1
  }
});

module.exports=UIListViewExample;