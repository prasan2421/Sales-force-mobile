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
    Modal,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    TouchableHighlight,
    Dimensions,
    Image,
    ActivityIndicator, Keyboard, StatusBar
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons'

class New extends Component {


    constructor(props) {
        super(props);
        this.state = {

        }
    }


    componentDidMount() {

        // this.getFromAsyncStorage();
    }


    // getFromAsyncStorage = async () => {
    //
    //
    //     const access_token = await AsyncStorage.getItem('access_token');
    //
    //     fetch('http://weddingcake.cyya.com/api/brides/bid-requests?service=select&service_type=free&bid_request_type=new', {
    //         headers: {
    //             Authorization: 'Bearer ' + access_token
    //         }
    //     })
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         if(responseJson.errors) {
    //
    //             alert(responseJson.errors);
    //         }
    //         else if(responseJson.data) {
    //
    //         }
    //     })
    //     .catch((error) => {
    //
    //         alert('An error occurred');
    //     })
    //
    // };
    signOutAsync = async (navigation) => {
        await AsyncStorage.clear();
        navigation.navigate('Auth');
    };
    toggle(){
        this.props.navigation.toggleDrawer();
    };


    render() {
        return (
            <ScrollView style={{backgroundColor:'#ebeef3'}}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor='#1B7ED5'
                />
                <View style={{width:'100%',alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                <View style={{flexDirection: 'row',marginTop:10,justifyContent:'center'}}>
                    <TouchableHighlight onPress={()=> this.props.navigation.navigate('TargetAchievement')} style={{borderRadius:10,width:'50%',height:150,backgroundColor:'#fff',margin:7,elevation: 1,justifyContent:'center',alignItems:'center'}}>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Icon name="md-trending-up" size={34} color="#1B7ED5"/>
                            <Text style={{fontWeight: 'bold',marginTop:10}}>Target vs Achievements</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> this.props.navigation.navigate('ReviewWeeks')} style={{borderRadius:10,width:'50%',height:150,backgroundColor:'#fff',margin:7,elevation: 1,justifyContent:'center',alignItems:'center'}}>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Icon name="md-paper" size={34} color="#1B7ED5"/>
                            <Text style={{fontWeight: 'bold',marginTop:10}}>Monitoring</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                </View>
                </View>

            </ScrollView>
        );
    }
}

export default New;
const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonWrapper: {

        marginTop:30,
        alignItems:'center',
    },
    buttonText: {
        justifyContent:'center',
        color: '#fff',
        backgroundColor:'#ff1f77',
        paddingLeft:40,
        paddingRight:40,
        paddingTop:10,
        borderRadius:20,
        paddingBottom:10

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