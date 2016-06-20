'use strict';

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Animated
} from 'react-native';
// 字体
const Icon = require('react-native-vector-icons/FontAwesome');
const AnimatedIcon= Animated.createAnimatedComponent(Icon);
 class FilterBar extends Component{
    render(){
        return (
            <View style={styles.container}>
                <FilterItem text="全部美食" />
                <FilterItem text="全城" />
                <FilterItem text="智能排序" />
                <FilterItem text="筛选" noborder={true}/>
            </View>
        );
    }
}
class FilterItem extends Component{
    constructor(props){
        super(props);
        this.expanded=false;  
    }
    _onPress(){
        let toValue=0.5;
        if(this.expanded){
            toValue=1
        }
       Animated.spring(this.anim, {
              toValue: toValue,   // Returns to the start
              velocity: 3,  // Velocity makes it move
            }).start(); 
        this.expanded=!this.expanded;
    }
    componentDidMount(){

    }
    render(){
        this.anim=this.anim||new Animated.Value(0);
        return (
           <View style={[styles.filterItem,styles.filterItem,this.props.noborder ? styles.noborder : {}]}>
                <Text style={styles.filterText} onPress={()=>this._onPress()}>{this.props.text}</Text>
                <Animated.View style={{
                    transform:[
                        {
                            rotate:this.anim.interpolate({
                                inputRange:[0,0.5,1],
                                outputRange:['0deg','180deg','360deg']
                            })
                        }
                    ],
                    height:20,
                    width:20,
                    alignItems:'center',
                    justifyContent:'center',
                  
                }}>
                <Text style={{marginTop:-10}}><Icon name='sort-desc' size={20} /></Text>
                </Animated.View>
           </View> 
        );
    }
}
export default class KoubeiStores extends Component{

    render() {
        return (
            <View style={{ flex: 1,  paddingTop:60,}}>
                <FilterBar />
                <View style={styles.content}>
                    <Animated.View style={{
                        height:200,
                        backgroundColor:'red',
                        marginTop:-200
                    }}></Animated.View>
                </View>
            </View>
        );

    }
}
class SelectComp extends Component{
    render(){
        return (
            <View>
                <Animated.View>
                    
                </Animated.View>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems:'center',
        paddingTop:15,
        paddingBottom:15,
        borderBottomWidth:0.5,
        borderColor:'rgba(0,0,0,0.1)'
    },
    filterItem:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        borderRightWidth:0.5,
        flex:1,
        borderRightColor:'rgba(0,0,0,0.1)'
    },
    filterText:{
        fontSize:22,
        
    },
    noborder:{
        borderRightWidth:0,
        borderRightColor:'#FFFFFF'
    },
    content:{
        flex:1,
        backgroundColor:'gray'
    }
});