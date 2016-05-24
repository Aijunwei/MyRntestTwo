import React from 'react';
import {
	View,
	Text
} from 'react-native';

class ImportNews extends React.Component{
	constructor(props){
		super(props);
		this.state={
			news:['1.新闻news-1','2.新闻news-2']
		}
	}
	render(){
		var List=[];

		for(var i=0;i<this.state.news.length;i++){
			List.push(<Text key={i} >{this.state.news[i]}</Text>);
		}
		return (
			<View>
			<Text>news</Text>
				{List}
			</View>
		);
	}
}

module.exports=ImportNews;