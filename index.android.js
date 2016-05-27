/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

 //require('./jsCode/Main');


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  Image,
  View,
  Navigator
} from 'react-native';
//import ImageExamples from './ImageExample';
import MapViewExample from './MapViewExample';
import UIListViewExample from './UIListViewExample';
import ModalExample from './ModalExample';
import Main from './navigator'
class MyRntestTwo extends Component {
  render() {
    return this.renderNav();
  }
  renderNav(){
    return <Navigator
        initialRoute={{name:'index', component: Main}}
        configureScene={(route)=> Navigator.SceneConfigs.HorizontalSwipeJumpFromRight}
        renderScene={(route, navigator) =>{
          let Compo = route.component;
          return <Compo {...route.params} navigator={navigator} />
        }}
    />;
  }
  renderModal(){
    return ModalExample.examples[0].render();
  }
  renderMapViews(){
    var ds = new ListView.DataSource({rowHasChanged: (r1,r2)=> r1!== r2});
    var datasource = ds.cloneWithRows(MapViewExample.examples);
    return <ListView dataSource={datasource} renderRow={this.renderMapRow} style={styles.listView} />
  }
  renderMapRow(map){
    return (
      <View>
        <Text>{map.title}</Text>
        {map.render()}
      </View>
    );
  }
  renderListViewExample(){
    return <UIListViewExample />;
  }
  renderImageExample(image){
    return (
      <View style={{flex: 1}}>
        <Text>{image.title}</Text>
        {image.render()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    listView:{
      paddingTop: 20,
      backgroundColor: '#F5FCFF'
  }
});

AppRegistry.registerComponent('MyRntestTwo', () => MyRntestTwo);
