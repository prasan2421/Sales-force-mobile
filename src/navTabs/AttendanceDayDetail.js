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
    Switch,
    TouchableOpacity,
    RefreshControl,
    TouchableHighlight,
    Dimensions,
    Image,
    ActivityIndicator, Keyboard, StatusBar, PermissionsAndroid
} from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
// import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons'

import SessionHelper from "../commons/SessionHelper";
import ErrorText from "../commons/ErrorText";
import moment from "moment";
import Geolocation from "react-native-geolocation-service";

class New extends Component {
    static navigationOptions  = ({ navigation }) => {

        return {
            headerRight: <View>
            </View>
        };



    };
    constructor(props) {
        super(props);
        this.state = {
            refreshing:false,
            showEmptyView: false,
            modalVisible: false,
            customer:'',
            data:[],
            dataCategories:[],
            class:'',
            cart:'',
            beat:'',
            switchValue:'',

            shopName:'',
            locations:'',
            disabledSwitch:false,
            date:this.props.navigation.getParam('date', 0),
            getAttendance:[]
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            // this.ClearCartPunchOut(false);
          ;
            this.getAttendance();

        });
    }


    getAttendance= async () =>{

        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/attendances/'+this.state.date, {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {

                   this.setState({
                       getAttendance:responseJson.data.attendances,
                       showEmptyView: true
                   })

                }
                else{
                    this.setState({
                        showEmptyView:true
                    })
                }

            })
            .catch((error) => {

                alert('Error getting attendance');
            })
    }



    showLoader = () => {
        this.setState({ isLoading: true });
    };
    hideLoader = () => {
        this.setState({ isLoading: false });
    };

    renderEmptyView() {
        if(this.state.showEmptyView) {
            return (
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:24}}>No attendance..</Text>
                </View>
            )
        }
        else {
            return<ActivityIndicator size="small" color="#353535" />;
        }
    }



    attendanceList(){

        return(
            <FlatList
                ListEmptyComponent={this.renderEmptyView()}
                data={this.state.getAttendance}

                // extraData={this.state.data}
                keyExtractor={item => '' + item._id}
                renderItem={({item})=> {

                    return (
                        <View>
                            <View style={{flexDirection:'row',marginTop:3,marginBottom:3,}}>
                            <Text style={{width:'50%',textAlign: 'center'}}>{item.punch_in_time}</Text>
                            <Text style={{width:'50%',textAlign: 'center'}}>{item.punch_out_time}</Text>

                            </View>
                        </View>
                    );
                }}
            />
        )

    }

    render() {

        return (
            <ScrollView style={{backgroundColor:'#ebeef3'}}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor='#1B7ED5'
                />
                <View style={{width:'100%',marginBottom:10,marginTop:10,alignItems: 'center'}}>
                    <Text style={{textAlign:'center',fontSize: 14,color:'#2a8ee5',marginBottom:5}}>{this.state.date}</Text>

                </View>



                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>
                    <View style={{width:'90%',flexDirection:'row'}}>
                        <Text style={{width:'50%',color:'#f9156c',textAlign: 'center'}}>Punch In</Text>
                        <Text style={{width:'50%',color:'#f9156c',textAlign: 'center'}}>Punch Out</Text>

                    </View>
                </View>
                <View style={{width:'100%',alignItems: 'center',}}>

                    <View style={{width:'90%',flexDirection:'row',backgroundColor:'#fff',paddingTop:5,paddingBottom:5,borderRadius:5}}>
                            {this.attendanceList()}
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