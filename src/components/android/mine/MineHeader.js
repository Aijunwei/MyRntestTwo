'use strict';

import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const orangeColor="#FFB44F";
const greenColor='rgb(54,188,153)';
const blueColor='rgb(16,166,226)';
const redColor='#FC6165';

export default class MineHeader extends Component {
    static defaultProps={
        user:{
            name: '杰克船长',
            alias:'Jack',
            mail:'jack@gmail.com'
        }
    }
    constructor(props){
        super(props);
    }
    render(){
        return (
           <TouchableOpacity style={styles.header}>
                <View style={{width:110,height:110,padding:10}}>
                    <Image source={require('../../../images/header.png')} style={styles.photo} />
                    <Icon name='apple' size={30} style={{position:'absolute',left:90,top:85}} color="#FFB44F"/>
                </View>
                <View style={styles.headerInfo}>
                    <Text style={[styles.textItem,{}]}>
                        <Text style={{color:'#333333',fontSize:22}}>{this.props.user.name}</Text>
                        <Text>{this.props.user.alias ? this.props.user.alias : '未设置昵称'}</Text>
                    </Text>
                    <Text style={styles.textItem}>{this.props.user.mail}</Text>
                    <View style={{marginTop:10,flexDirection:'row'}}>
                        <View style={[styles.textWrap,{marginLeft:0}]}>
                            <Text style={styles.innerTextItem}><Icon name="camera-retro" size={30} color={blueColor}/>&nbsp;&nbsp;相册</Text>
                        </View>
                        <View style={styles.textWrap}>
                            <Text style={styles.innerTextItem}><Icon name="envelope-o" size={30} color={blueColor}/>&nbsp;&nbsp;收藏</Text>
                        </View>
                        <View style={styles.textWrap}>
                            <Text style={styles.innerTextItem}><Icon name="diamond" size={30} color={blueColor}/>&nbsp;&nbsp;黄金会员</Text>
                        </View>
                   </View>
                </View>
                <View style={styles.arrow}>
                        <Icon name="chevron-right" size={20} color="gray"/>
                </View>
           </TouchableOpacity> 
        );
    }
}

const styles=StyleSheet.create({
    photo:{
        width:100,
        height:100,
        borderRadius:10
    },
    header:{
        flexDirection:'row',
        backgroundColor: '#FFFFFF',
        padding: 20
    },
    headerInfo:{
        marginTop: 6,
        marginLeft: 15,
        flex: 1,
        marginRight: 90
    },
    textItem:{
        fontSize: 18,
        marginBottom: 6
    },
    textWrap: {
        flex: 1,
        borderRightWidth: 1,
        borderColor: 'gray',
        marginLeft: 10
    },
    innerTextItem:{
        fontSize: 19
    },
    arrow: {
        width: 50,
        alignItems: 'flex-end',
        justifyContent: 'center'
        
    }
});