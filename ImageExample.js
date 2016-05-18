'use strict';

var React = require('react');
var ReactNative=require('react-native');

var {
	Image,
	Platform,
	StyleSheet,
	Text,
	View
} = ReactNative;

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

const IMAGE_PREFETCH_URL = 'http://facebook.github.io/origami/public/images/blog-hero.jpg?r=1&t=' + Date.now();
var prefetchTask= Image.prefetch(IMAGE_PREFETCH_URL);

class NetWorkImageCallbackExample extends React.Component{
	constructor(props){
		super(props);
		this.state={
			events:[],
			startLoadPrefetched: false,
			mountTime: new Date()
		};
	}

	componentWillMount(){
		this.setState({mountTime: new Date()});
	}
	_loadEventFired(event){
		this.setState((state)=>{
			return state.events = [...state.events,event]
		});
	}
	render(){
		var { mountTime } = this.state;

		return (
			<View>
				<Image
				   source={this.props.source}
				   style={[styles.base,{overflow:'visible'}]}
				   onLoadStart={() => {this._loadEventFired(`✔ onLoadStart (+${new Date() - mountTime}ms)`)}}
				   onLoad={() => {this._loadEventFired(`✔ (prefetched) onLoad (+${new Date() - mountTime}ms)`)}}
				   onLoadEnd={() => {
				   		this._loadEventFired(`✔ (prefetched) onLoadEnd (+${new Date() - mountTime}ms)`);
				   		this.setState({startLoadPrefetched: true},() => {
				   			prefetchTask.then(() => {
				   				this._loadEventFired(`✔ Prefetch OK (+${new Date() - mountTime}ms)`);
				   			},error => {
				   				this._loadEventFired(`✘ Prefetch failed (+${new Date() - mountTime}ms)`);
				   			});
				   		});
				   	}}
				/>
				{this.state.startLoadPrefetched ? 
					<Image 
						source={this.props.prefetchedSource}
						style={[styles.base,{overflow:'visible'}]}
						onLoadStart={() => this._loadEventFired(`✔ (prefetched) onLoadStart (+${new Date() - mountTime}ms)`)}
           				onLoad={() => this._loadEventFired(`✔ (prefetched) onLoad (+${new Date() - mountTime}ms)`)}
          				onLoadEnd={() => this._loadEventFired(`✔ (prefetched) onLoadEnd (+${new Date() - mountTime}ms)`)}
					/> : null
				}
				<Text style={{marginTop: 20}}>
					{this.state.events.join('\n')}
				</Text>
			</View>
		);
	}
}

class NetWorkImageExample extends React.Component{
	constructor(props){
		super(props);
		this.state={
			error: false,
			loading: false,
			progress: 0
		};
	}
	render(){
		var loader = this.state.loading ? 
			<View style={styles.progress}>
				<Text>{this.state.progress}%</Text>
			</View> : null;
			return this.state.error ? 
				<Text>{this.state.error}</Text> : 
				<Image 
				   source={this.props.source}
				   style={[styles.base,{overflow: 'visible'}]}
				   onLoadStart={()=> this.setState({loading:true})}
				   onError={(e)=> this.setState({error: e.nativeEvent.error, loading: false})}
				   onProgress={(e) => this.setState({progress: Math.round(100 * e.nativeEvent.loaded / e.nativeEvent.total)})}
				   onLoad={() => this.setState({loading: false, error: false})}
					>
				</Image>
	}
}

class ImageSizeExample extends React.Component{
	constructor(props){
		super(props);
		this.state={
			width: 0,
			height: 0
		};
	}
	componentDidMount(){
		Image.getSize(this.props.source.uri, (width,height) => {
			this.setState({width,height});
		});
	}
	render(){
		return (
			<View style={{flexDirection: 'row'}}>
				<Image
				   style={{
				   	width: 60,
				   	height: 60,
				   	backgroundColor: 'transparent',
				   	marginRight: 10
				   }}
				   source={this.props.source}
				/>
				<Text>
					Actual dimensions:{'\n'}
					Width: {this.state.width}, height: {this.state.height}
				</Text>
			</View>
		);
	}
}

exports.displayName = (undefined :?string);
exports.framework = 'React';
exports.title = '<Image>';
exports.description = 'Base  component for displaying different types of images.';
exports.examples=[
{
	 title: 'Plain Network Image',
    description: 'If the `source` prop `uri` property is prefixed with ' +
    '"http", then it will be downloaded from the network.',
    render: function() {
      return (
        <Image
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          style={styles.base}
        />
      );
    }
},
  {
    title: 'Plain Static Image',
    description: 'Static assets should be placed in the source code tree, and ' +
    'required in the same way as JavaScript modules.',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image source={require('./uie_thumb_normal.png')} style={styles.icon} />
          <Image source={require('./uie_thumb_selected.png')} style={styles.icon} />
          <Image source={require('./uie_comment_normal.png')} style={styles.icon} />
          <Image source={require('./uie_comment_highlighted.png')} style={styles.icon} />
        </View>
      );
    },
  },
  {
    title: 'Image Loading Events',
    render: function() {
      return (
        <NetWorkImageCallbackExample source={{uri: 'http://facebook.github.io/origami/public/images/blog-hero.jpg?r=1&t=' + Date.now()}}
          prefetchedSource={{uri: IMAGE_PREFETCH_URL}}/>
      );
    },
  },
    {
    title: 'Error Handler',
    render: function() {
      return (
        <NetWorkImageExample source={{uri: 'http://TYPO_ERROR_facebook.github.io/react/img/logo_og.png'}} />
      );
    },
    platform: 'ios',
  },
   {
    title: 'Image Download Progress',
    render: function() {
      return (
        <NetWorkImageExample source={{uri: 'http://facebook.github.io/origami/public/images/blog-hero.jpg?r=1'}}/>
      );
    },
    platform: 'ios',
  },
  {
    title: 'defaultSource',
    description: 'Show a placeholder image when a network image is loading',
    render: function() {
      return (
        <Image
          defaultSource={require('./bunny.png')}
          source={{uri: 'http://facebook.github.io/origami/public/images/birds.jpg'}}
          style={styles.base}
        />
      );
    },
    platform: 'ios',
  },
  {
  	 title: 'Border Color',
  	 render: function(){
  	 	return (
  	 		<View style={styles.horizontal}>
  	 			<Image
  	 				source={smallImage}
  	 				style={[
  	 					styles.base,
  	 					styles.background,
  	 					{borderWidth: 3, borderColor: '#f099f0'}
  	 				]}
  	 			/>
  	 		</View>
  	 	);
  	 }
  },
  {
  	title: 'Border Width',
  	render: function(){
  		return (
  			<View style={styles.horizontal}>
  				<Image
  					source={smallImage}
  					style={[
  						styles.base,
  						styles.backgroundColor,
  						{borderWidth: 5, borderColor: '#f099f0'}
  					]}
  				/>
  			</View>
  		);
  	}
  },
  {
  	title:'Border Radius',
  	render:function(){
  		return (
  			<View style={styles.horizontal}>
  				<Image
  					style={[styles.base,{borderRadius: 5}]}
  					source={fullImage}
  				/>
  				<Image
  					style={[styles.base,styles.leftMargin,{borderRadius: 19}]}
  					source={fullImage}
  				/>
  			</View>
  		);
  	}
  },{
  	title:'background color',
  	render:function(){
  		return (
  			<View style={styles.horizontal}>
  				<Image source={smallImage} style={styles.base}></Image>
  				<Image 
  					style={[
  						styles.base,
  						styles.leftMargin,
  						{backgroundColor: 'rgba(0,0,100,.25)'}
  					]}
  					source={smallImage}
  				/>
  				<Image
  					style={[styles.base, styles.leftMargin,{backgroundColor:'red'}]}
  					source={smallImage}
  				/>
  				<Image
  					style={[styles.base, styles.leftMargin,{backgroundColor: 'black'}]}
  					source={smallImage}
  				/>
  			</View>
  		);
  	}
  },
  {
  	title: 'Opacity',
  	render: function(){
  		return (
  			<View style={styles.horizontal}>
  				<Image 
  					style={[styles.base,styles.leftMargin,{opacity: 0.8}]}
  					source={fullImage}
  				/>
  				<Image 
  					style={[styles.base,styles.leftMargin,{opacity: 0.6}]}
  					source={fullImage}
  				/>
  				<Image 
  					style={[styles.base,styles.leftMargin,{opacity: 0.4}]}
  					source={fullImage}
  				/>
  			</View>
  		);
  	}
  },
  {
  	title:'Nesting',
  	render: function(){
  		return (
  			<Image
  				style={{width:60,height: 60,backgroundColor: 'transparent'}}
  				source={fullImage}>
  				<Text style={styles.nestedText}>React</Text>
  			</Image>
  		);
  	}
  },{
  	title:'tintColor',
  	render: function(){
  		return (
  			<View>
  				<View style={styles.horizontal}>
  					<Image 
  						source={require('./uie_thumb_normal.png')}
  						style={[styles.icon, {borderRadius: 5, tintColor: '#4cd963'}]}
  					/>
  					  <Image 
  						source={require('./uie_thumb_normal.png')}
  						style={[styles.icon, {borderRadius: 5, tintColor: '#ff2d55'}]}
  					/>
  				</View>
  		 <View style={styles.horizontal}>
            <Image
              source={smallImage}
              style={[styles.base, {borderRadius: 5, tintColor: '#5ac8fa' }]}
            />
            <Image
              source={smallImage}
              style={[styles.base, styles.leftMargin, {borderRadius: 5, tintColor: '#4cd964' }]}
            />
            <Image
              source={smallImage}
              style={[styles.base, styles.leftMargin, {borderRadius: 5, tintColor: '#ff2d55' }]}
            />
            <Image
              source={smallImage}
              style={[styles.base, styles.leftMargin, {borderRadius: 5, tintColor: '#8e8e93' }]}
            />
          </View>
  			</View>
  		);
  	}
  }
];
var fullImage = {uri: 'http://facebook.github.io/react/img/logo_og.png'};
var smallImage = {uri: 'http://facebook.github.io/react/img/logo_small_2x.png'};
var styles = StyleSheet.create({
  base: {
    width: 50,
    height: 50
  },
  progress: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    width: 100
  },
  leftMargin: {
    marginLeft: 10
  },
  background: {
    backgroundColor: '#222222'
  },
  sectionText: {
    marginVertical: 6
  },
  nestedText: {
    marginLeft: 12,
    marginTop: 20,
    backgroundColor: 'transparent',
    color: 'white'
  },
  resizeMode: {
    width: 90,
    height: 60,
    borderWidth: 0.5,
    borderColor: 'black'
  },
  resizeModeText: {
    fontSize: 11,
    marginBottom: 3
  },
  icon: {
    width: 15,
    height: 15
  },
  horizontal: {
    flexDirection: 'row'
  },
  gif: {
    flex: 1,
    height: 200
  },
  base64: {
    flex: 1,
    height: 50,
    resizeMode: 'contain'
  },
});
