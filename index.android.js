/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  Image,
  View
} from 'react-native';
import ImageExamples from './ImageExample';
import UIExplorerPage from './UIExplorerPage';
class MyRntestTwo extends Component {
  render() {
    return this.renderImageExmaplesList();
/*  return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
        <Text>
          {this.renderImageExmaplesList()}
        </Text>
      </View>
    );*/
  }
 renderImageExmaplesList(){
    var imageExamples=ImageExamples.examples.filter((element)=> element.platform!='ios');
    //imageExamples=[{"title":"hello"},{"title":"world"}];
   // return imageExamples[0].title;
    var ds = new ListView.DataSource({
        rowHasChanged:(row1,row2) => row1!==row2
      });

    var datadource = ds.cloneWithRows(imageExamples);

    return <ListView dataSource={datadource} renderRow={this.renderImageExample} style={styles.listView} />

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
