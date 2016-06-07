import React,{ Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';
const {width,height} =Dimensions.get('window');
const ds= new ListView.DataSource({
   rowHasChanged: (r1,r2) => r1!==r2 
});
const noop= ()=>{};
export default class Popover extends Component{
    static defaultProps={
        list: [""],
        onClick: noop,
        onClose: noop
    };
    static propsTypes={
        list: React.PropTypes.array.isRequired,
        onClick: React.PropTypes.func,
        onClose: React.PropTypes.func
    };
    constructor(props){
        super(props);
        this.state={
            dataSource: ds.cloneWithRows(this.props.list)
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.list !== this.props.list){
            this.setState({
                dataSource: ds.cloneWithRows(nextProps.list)
            });
        }
    }
    handleClick(data){
        this.props.onClick(data);
        this.props.onClose();
    }
    renderRow(rowData){
        let row=(
            <TouchableOpacity onPress={()=> this.handleClick(rowData)}>
                <View style={styles.rowStyle}>
                    <Text>{rowData.text}</Text>
                </View>
            </TouchableOpacity>
        );
        if(this.props.renderRow){
            row=this.props.renderRow(rowData);
        }
        return {row};
    }
    render(){
        return (
            <TouchableWithoutFeedback >
                <View style={styles.container}>
                    <View style={[styles.popover]}>
                        <View style={styles.trangle}></View>
                        <View style={styles.popoverContent}><Text style={styles.popItemText}>item1</Text></View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        position:'absolute',
        left:0,
        top:0,
        height:height,
        width:width,
        backgroundColor:'transparent'
    },
    popover:{
        position:'absolute',
        right:8,
        top:35
    },
    popoverContent:{
        backgroundColor:'#3F454F',
        width:200,
        height:150,
        borderRadius:5
    },
    trangle:{
        borderWidth:10,
        width:10,
        marginLeft:165,
        borderColor:'transparent',
        borderBottomColor:'#3F454F'
    },
    popItemText:{
        color:'#FFFFFF',
        fontSize:20
    },
    rowStyle:{
        borderBottomColor:'#FFFFFF',
        borderBottomWidth:0.5,
        flexDirection:'row'
    }
});