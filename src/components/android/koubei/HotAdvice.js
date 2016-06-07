'use strict';

import React,{ Component } from 'react';
import {
    View,
    Image,
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
class AdviceItem extends Component{
    constructor(props){
        super(props);
    }
    renderStar(){
        let star=this.props.data.star;
        let stars=[];
        let i=1;
        for(;i<=star;i++){
            stars.push(<Icon key={'star-'+i} name="star" size={20} color="#FFB44F"/>);
        }
        if((star-parseInt(star))>=0.5){
            stars.push(<Icon key={'star-'+i} name="star-half-o" size={20} color="#FFB44F"/>);
        }
        return stars;
    }
    render(){
       
        
        return (
            <TouchableOpacity style={styles.adviceItem}>
                <Image source={this.props.data.src} style={styles.adviceImage}/>
                <View style={styles.adviceItemInfo}>
                    <Text style={{fontSize:22,color:'#000000'}}>{this.props.data.name}</Text>
                    <Text style={[styles.itemInfoText,{color:'#FFB44F'}]}>{this.renderStar()}&nbsp;&nbsp;{this.props.data.star}</Text>
                    <Text style={styles.itemInfoText}>{this.props.data.type}&nbsp;&nbsp;{this.props.data.address}&nbsp;&nbsp;{this.props.data.distance}</Text>
                    <Text style={styles.itemInfoText}><Icon name="thumbs-o-up" size={30} color="#FFB44F"/>&nbsp;&nbsp;{this.props.data.desc}</Text>
                </View>
                <View style={styles.discount}>
                    <Text style={styles.discountText}>{this.props.data.discount}<Text style={{fontSize: 20}}>折</Text></Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default class HotAdvice extends Component{
    constructor(props){
        super(props);
        let ds= new ListView.DataSource({rowHasChanged: (r1,r2)=> r1!==r2 });
        this.state={
          hotAdvice:  ds.cloneWithRows(this._genRows())
        };
    }
    _genRows(){
        const shopList=[
            {
                name:'仙芋世家(财富港店)',
                src:require('../../../images/shop-1.png'),
                star: 4.9,
                type:'饮品/甜点',
                address:'时代城',
                distance:'627m',
                desc:'附近热门商家',
                discount:'9.5'
            }, {
                name:'云顶贡茶(财富港店)',
                src:require('../../../images/shop-2.png'),
                star: 4.9,
                type:'饮品/甜点',
                address:'时代城',
                distance:'613m',
                desc:'附近热门商家',
                discount:'9.5'
            },{
                name:'百果汇(新岸线分店)',
                src:require('../../../images/shop-3.png'),
                star: 4.8,
                type:'生鲜水果',
                address:'宝体',
                distance:'741m',
                desc:'附近热门商家',
                discount:'9.5'
            },
             {
                name:'上岛咖啡(富通城店)',
                src:require('../../../images/shop-5.png'),
                star: 4.3,
                type:'咖啡',
                address:'西乡',
                distance:'1.1km',
                desc:'附近热门商家',
                discount:'9.5'
            },
            {
                name:'黑龙茶(平洲店)',
                src:require('../../../images/shop-5.png'),
                star: 4.3,
                type:'奶茶',
                address:'时代城',
                distance:'853m',
                desc:'附近热门商家',
                discount:'9.5'
            }
        ];
        return shopList;
    }
    renderRow(rowData,sectionID,rowID){
        return <AdviceItem data={rowData}/>;
    }
    render(){
        return (<View style={{marginTop:20,marginBottom:50,backgroundColor:'#FFFFFF',borderColor:'#E6E6E6',borderTopWidth:1,borderBottomWidth:1}}>
                <View style={styles.hotAdviceHeader}>
                    <Text style={styles.headerText}>热门推荐</Text>
                </View>
                <ListView renderRow={this.renderRow}
                          dataSource={this.state.hotAdvice}/>
                <TouchableOpacity style={styles.more}><Text style={{fontSize: 19}}>查看更多</Text></TouchableOpacity>
        </View>);
    }
}
const styles=StyleSheet.create({
   adviceItem:{
       flexDirection: 'row',
       padding: 20,
       borderColor: '#E6E6E6',
       borderTopWidth: 1
   },
   adviceImage:{
       width:120,
       height:100,
       borderRadius: 10
   },
   adviceItemInfo:{
       marginLeft:15,
       flex:1
   },
   discount:{
     justifyContent:'center'  
   },
   discountText:{
     color:'rgb(251,97,101)',
     fontSize:45  
   },
   hotAdviceHeader:{
       paddingLeft: 20,
       height: 80,
       justifyContent: 'center'
   },
   headerText:{
       fontSize:20,
       color:'#000000'
   },
   itemInfoText:{
       fontSize:18,
       marginTop:10
   },
   more:{
       height: 70,
       justifyContent: 'center',
       alignItems: 'center',
       borderColor: '#E6E6E6',
       borderBottomWidth: 1,
       borderTopWidth: 1,
       backgroundColor: '#FFFFFF'
   } 
});

