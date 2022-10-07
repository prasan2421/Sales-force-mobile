import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    AsyncStorage,
    Button,
    TextInput,
    Alert,
    Picker,
    StyleSheet,
    PermissionsAndroid,
    Modal,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    TouchableHighlight,
    Dimensions,
    Image,
    ActivityIndicator, Keyboard, StatusBar
} from 'react-native';
import {images} from "../constants/images";
import SessionHelper from "../commons/SessionHelper";

class New extends Component {


    constructor(props) {
        super(props);
        this.state = {

            shop:this.props.navigation.getParam('Customer', ''),
            shopId:this.props.navigation.getParam('CustomerId', ''),

        }
    }


    componentDidMount() {


    }
    EmptyCart = async() => {
        AsyncStorage.removeItem('Id');
        this.props.navigation.navigate('Choice');
    }

    render() {
        return (
            <View style={{flex:1,justifyContent:'center',backgroundColor:'#c1d961'}}>
                <View style={styles.container}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor='#c1d961'
                    />
                    <View style={styles.box}>
                        <Image style={{width:200,height:120}}  source={images.splash}/>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Text style={styles.text}>Your order has been saved</Text>

                    </View>

                    <TouchableHighlight onPress={()=>this.props.navigation.navigate('Choice')} style={{ backgroundColor:'#ff1f77',
                        marginTop:100,
                        borderRadius:20,
                        padding:7,}}>
                        <Text style={styles.buttonText}>Go Back to Home Screen</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>this.EmptyCart()} style={{ backgroundColor:'#ff1f77',
                        marginTop:20,
                        borderRadius:20,
                        padding:7,}}>
                        <Text style={styles.buttonText}>Check-Out</Text>
                    </TouchableHighlight>
                </View>

            </View>
        );
    }
}

export default New;
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c1d961',
    },


    box:{

        flexDirection: 'column',
        width:'90%',
        alignItems:'center',
        justifyContent: 'center',
        marginBottom: 20

    },
    text:{
        color:'#db3b08',
        fontSize:20,
        fontWeight:'bold'
    },

    buttonWrapper: {
        flexDirection:'row',
        marginTop:20,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText: {
        padding:7,
        color: '#fff',
    },
    inputContainer: {
        marginTop:5,
        borderWidth:1.5,
        borderColor:'#dbdbdb',
        backgroundColor: '#ffffff',

        borderRadius:10,
        height:50,
        justifyContent:'center'
    },
    inputContainerTopWrapper:{
        flexDirection:'row'
    },
    inputContainerTopLeft: {
        marginTop:5,
        borderWidth:1.5,
        borderColor:'#dbdbdb',
        backgroundColor: '#ffffff',
        width:'80%',
        borderRadius:10,
        height:50,
        justifyContent:'center'
    },
    inputContainerTopRight: {
        marginTop:5,
        borderWidth:1.5,
        borderColor:'#dbdbdb',
        backgroundColor: '#ffffff',
        width:'20%',
        borderRadius:10,
        height:50,
        justifyContent:'center'
    },

});