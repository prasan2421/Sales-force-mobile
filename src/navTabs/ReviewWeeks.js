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
    processColor,
    ActivityIndicator, Keyboard, StatusBar
} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';
// import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons'

class New extends Component {


    constructor(props) {
        super(props);
        this.state = {

        };


    }


    componentDidMount() {

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
                            <TouchableHighlight
                                // onPress={()=> this.props.navigation.navigate('TargetAchievement')}
                                  style={{padding:10,borderRadius:5,width:'100%',backgroundColor:'#fff',margin:7,elevation: 1,justifyContent:'center',}}>
                                <View>
                                <View style={{justifyContent:'center',flexDirection:'row',borderBottomWidth:1,borderColor:'#c2c2c2'}}>
                                    <Text style={{fontWeight: 'bold',width:'30%',padding:5,textAlign:'center'}}>Weeks</Text>
                                    <Text style={{fontWeight: 'bold',width:'35%',padding:5,textAlign:'center'}}>Visited</Text>
                                    <Text style={{fontWeight: 'bold',width:'35%',padding:5,textAlign:'center'}}>Order Received</Text>
                                </View>
                                <View style={{justifyContent:'center',flexDirection:'row',marginTop:5,marginBottom:5}}>
                                    <Text style={{fontWeight: 'bold',width:'30%',padding:5,textAlign:'center'}}>Week 1</Text>
                                    <Text style={{fontWeight: 'bold',width:'35%',padding:5,textAlign:'center'}}>36</Text>
                                    <Text style={{fontWeight: 'bold',width:'35%',padding:5,textAlign:'center'}}>12</Text>
                                </View>
                                    <View style={{justifyContent:'center',flexDirection:'row',marginTop:5,marginBottom:5}}>
                                        <Text style={{fontWeight: 'bold',width:'30%',padding:5,textAlign:'center'}}>Week 2</Text>
                                        <Text style={{fontWeight: 'bold',width:'35%',padding:5,textAlign:'center'}}>22</Text>
                                        <Text style={{fontWeight: 'bold',width:'35%',padding:5,textAlign:'center'}}>1</Text>
                                    </View>
                                    <View style={{justifyContent:'center',flexDirection:'row',marginTop:5,marginBottom:5}}>
                                        <Text style={{fontWeight: 'bold',width:'30%',padding:5,textAlign:'center'}}>Week 3</Text>
                                        <Text style={{fontWeight: 'bold',width:'35%',padding:5,textAlign:'center'}}>0</Text>
                                        <Text style={{fontWeight: 'bold',width:'35%',padding:5,textAlign:'center'}}>3</Text>
                                    </View>
                                    <View style={{justifyContent:'center',flexDirection:'row',marginTop:5,marginBottom:5}}>
                                        <Text style={{fontWeight: 'bold',width:'30%',padding:5,textAlign:'center'}}>Week 4</Text>
                                        <Text style={{fontWeight: 'bold',width:'35%',padding:5,textAlign:'center'}}>45</Text>
                                        <Text style={{fontWeight: 'bold',width:'35%',padding:5,textAlign:'center'}}>0</Text>
                                    </View>
                                    <View style={{justifyContent:'center',flexDirection:'row',marginTop:5,marginBottom:5}}>
                                        <Text style={{fontWeight: 'bold',width:'30%',padding:5,textAlign:'center'}}>Week 5</Text>
                                        <Text style={{fontWeight: 'bold',width:'35%',padding:5,textAlign:'center'}}>103</Text>
                                        <Text style={{fontWeight: 'bold',width:'35%',padding:5,textAlign:'center'}}>16</Text>
                                    </View>
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
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    }
});