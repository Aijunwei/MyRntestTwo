import React from 'react';
import {
	View,
	Text,
	StatusBar,
} from 'react-native';
const data=['A','B','C','D']
class ImportNews extends React.Component{
	constructor(props){
		super(props);
		this.state={
			news:['1.新闻news-1','2.新闻news-2']
		}
	}
	show(item){
		alert(item);
	}
	render(){
		var List=[];

	/*	for(var i=0;i<this.state.news.length;i++){
			List.push(<Text key={i} >{this.state.news[i]}</Text>);
		}*/
		for(let i in data){
			let text=(<Text key={i} onPress={this.show.bind(this,data[i])}>{data[i]}</Text>);
			List.push(text);
		}
		return (
			<View>
			<Text>news</Text>
			<Text>今日要闻1</Text>
				{List}
			</View>
		);
	}
}

module.exports=ImportNews;