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
import {xAxisIface} from "react-native-charts-wrapper/lib/AxisIface";
import NetInfo from "@react-native-community/netinfo";

class New extends Component {
    static navigationOptions  = ({ navigation }) => {
        return {
            headerRight: <View>
                <TouchableOpacity onPress={() => navigation.navigate('AttendanceList')}
                                  style={{padding: 3, marginRight: 10, flexDirection: 'row'}}>
                    <Icon name="md-calendar" size={24} color="#fff"/>
                </TouchableOpacity></View>
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
            processing:false,
            dataCategories:[],
            class:'',
            cart:'',
            beat:'',
            switchValue:'',
            shopName:'',
            locations:'',
            disabledSwitch:false,
            getAttendance:[]
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            // this.ClearCartPunchOut(false);
            this.checkAttendance();
            this.getAttendance();
            this.loadCart();
        });
    }


    checkAttendance= async () =>{

        const access_token = await AsyncStorage.getItem('access_token');
        NetInfo.fetch().then(state => {
            if(state.isConnected){
                fetch('http://14.192.18.73/api/attendances/punch-status', {
                    headers: {
                        'x-auth': access_token
                    }
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        if(responseJson.success) {
                            // alert(Json.stringify())
                            if(responseJson.data.status==true) {
                                this.setState({
                                    switchValue:true
                                });
                            }

                            else{
                                this.setState({
                                    switchValue:false
                                });
                            }


                        }
                        else{

                            alert(responseJson.message);
                        }

                    })
                    .catch((error) => {

                        alert(error);
                    })
            }
            else{
                alert('No Internet Connection...')
            }

        });

    }
    getAttendance= async () =>{
        const access_token = await AsyncStorage.getItem('access_token');
        NetInfo.fetch().then(state => {
            if(state.isConnected){
                fetch('http://14.192.18.73/api/attendances/'+moment().format("YYYY-MM-DD"), {
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
                            alert(responseJson.errors)
                        }

                    })
                    .catch((error) => {
                        this.setState({
                            showEmptyView:true
                        })
                        alert(error);
                    })
            }
            else{
                alert('No Internet Connection...')
            }

        });

    }
    loadCart = () => {
        SessionHelper.getCartJson()
            .then(cartJson => {
                let cart = '';
                // let total = 0;

                if(cartJson) {
                    try {
                        cart = JSON.parse(cartJson).length;
                    }
                    catch(e) {
                    }
                }
                this.setState({
                    cart,
                    // total
                });
            });
    }
    saveToAsyncStorage = async (data) => {
        await AsyncStorage.multiSet([
            ['Attendance', data],
        ]);

    };

    BackgroundLocationStop = () => {
        BackgroundGeolocation.stop();
    }
    requestLocationPermission= async (value) =>  {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message:
                        'Access Location Permission',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                Geolocation.getCurrentPosition(
                    (position) => {
                        this.BackgroundLocation(value);

                    },
                    (error) => {
                        // See error code charts below.
                        // console.log(error.code, error.message);
                        alert( error.message)
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );

            } else {
                this.setState({
                    processing:false,
                    disabledSwitch:false
                })
                Alert.alert('Error','Location permission denied');
            }
        } catch (error) {
           alert(error)
        }
    }
    requestLocationPermissionPunchOut= async (value) =>  {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message:
                        'Access Location Permission',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                Geolocation.getCurrentPosition(
                    (position) => {
                        this.BackgroundLocationPunchOut(value);

                        // alert(JSON.stringify(position));
                        // console.log(position);
                    },
                    (error) => {
                        // See error code charts below.
                        // console.log(error.code, error.message);
                        alert(error.message)
                    },

                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );

            } else {
                this.setState({
                    processing:false,
                   disabledSwitch:false
                })
                Alert.alert('Error','Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
    BackgroundLocation  = async (value) =>  {
        const access_token = await AsyncStorage.getItem('access_token');
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 50,
            distanceFilter: 50,
            notificationTitle: 'Background tracking',
            notificationText: 'enabled',
            debug: false,
            startOnBoot: true,
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
            interval: 60000,
            fastestInterval: 60000,
            activitiesInterval: 60000,
            stopOnStillActivity: false,
            // url: 'http://14.192.18.73/api/geolocations',
            // httpHeaders: {
            //     'Content-Type': 'application/json',
            //
            //     'x-auth':access_token
            // },
            // customize post properties
            postTemplate: {
                latitude: '@latitude',
                longitude: '@longitude',
                mobile_created_at:  moment().format("YYYY-MM-DD HH:mm:ss ")

            }
        });
        BackgroundGeolocation.getCurrentLocation(lastLocation => {

            this.setState({ locations: lastLocation},()=>
                this. SavePunchIn(value)

            );
            // alert(JSON.stringify(this.state.locations.latitude));
        }, (error) => {
            setTimeout(() => {
                this.setState({
                    processing:false,
                    disabledSwitch:false
                })
                    this.saveToAsyncStorage('false')

                Alert.alert('Error obtaining current location', JSON.stringify(error));
            }, 100);
        });
        BackgroundGeolocation.on('location', (location) => {
            // handle your locations here
            // to perform long running operation on iOS
            // you need to create background task
            BackgroundGeolocation.startTask(taskKey => {
                // execute long running task
                // eg. ajax post location
                // IMPORTANT: task has to be ended by endTask

                if(this.state.switchValue) {
                    fetch('http://14.192.18.73/api/geolocations', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth': access_token
                        },
                        body: JSON.stringify({
                            latitude: location.latitude,
                            longitude: location.longitude,
                            mobile_created_at: moment().format("YYYY-MM-DD HH:mm:ss ")
                        })
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            if (responseJson.success) {

                            } else {
                                // Alert.alert('Auto Punch Out','Auto punched out');
                                this.saveToAsyncStorage('false');
                                SessionHelper.removeCartJson();
                                AsyncStorage.removeItem('Id');
                                this.hideLoader();
                                this.getAttendance();
                                this.saveAttendance('false')
                                this.setState({switchValue: false});
                                this.BackgroundLocationStop()
                            }

                        })
                        .catch((error) => {
                            // console.error(error);
                            alert(error);
                        })
                }

                BackgroundGeolocation.endTask(taskKey);
            });
        });

        BackgroundGeolocation.on('stationary', (stationaryLocation) => {
            // handle stationary locations here
            Actions.sendLocation(stationaryLocation);
        });

        BackgroundGeolocation.on('error', (error) => {
            console.log('[ERROR] BackgroundGeolocation error:', error);
        });

        BackgroundGeolocation.on('start', () => {
            console.log('[INFO] BackgroundGeolocation service has been started');
        });

        BackgroundGeolocation.on('stop', () => {
            console.log('[INFO] BackgroundGeolocation service has been stopped');
        });

        BackgroundGeolocation.on('authorization', (status) => {
            console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
            if (status !== BackgroundGeolocation.AUTHORIZED) {
                // we need to set delay or otherwise alert may not be shown
                setTimeout(() =>
                    Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
                        { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
                        { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
                    ]), 1000);
            }
        });

        BackgroundGeolocation.on('background', () => {
            console.log('[INFO] App is in background');
        });

        BackgroundGeolocation.on('foreground', () => {
            console.log('[INFO] App is in foreground');
        });

        BackgroundGeolocation.on('abort_requested', () => {
            console.log('[INFO] Server responded with 285 Updates Not Required');

            // Here we can decide whether we want stop the updates or not.
            // If you've configured the server to return 285, then it means the server does not require further update.
            // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
            // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
        });

        BackgroundGeolocation.on('http_authorization', () => {
            console.log('[INFO] App needs to authorize the http requests');
        });

        BackgroundGeolocation.checkStatus(status => {
            console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
            console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
            console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

            // you don't need to check status before start (this is just the example)
            if (!status.isRunning) {
                BackgroundGeolocation.start(); //triggers start on start event
            }
        });



    }
    BackgroundLocationPunchOut  = async (value) =>  {
        // alert('aaaa');
        const access_token = await AsyncStorage.getItem('access_token');
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 50,
            distanceFilter: 50,
            notificationTitle: 'Background tracking',
            notificationText: 'enabled',
            debug: false,
            startOnBoot: true,
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,

            stopOnStillActivity: false,
            url: 'http://14.192.18.73/api/geolocations',
            httpHeaders: {
                'Content-Type': 'application/json',

                'x-auth':access_token
            },
            // customize post properties
            postTemplate: {
                latitude: '@latitude',
                longitude: '@longitude',
                mobile_created_at:  moment().format("YYYY-MM-DD HH:mm:ss ")

            }
        });
        BackgroundGeolocation.getCurrentLocation(lastLocation => {

            this.setState({ locations: lastLocation},()=> this.SavePunchOut(value));
            // alert(JSON.stringify(this.state.locations.latitude));
        }, (error) => {
            setTimeout(() => {

                this.setState({
                    processing:false,
                    disabledSwitch:false
                })
                Alert.alert('Error obtaining current location', JSON.stringify(error));
            }, 100);
        });
        BackgroundGeolocation.on('location', (location) => {
            // handle your locations here
            // to perform long running operation on iOS
            // you need to create background task
            BackgroundGeolocation.startTask(taskKey => {
                // execute long running task
                // eg. ajax post location
                // IMPORTANT: task has to be ended by endTask
                BackgroundGeolocation.endTask(taskKey);
            });
        });

        BackgroundGeolocation.on('stationary', (stationaryLocation) => {
            // handle stationary locations here
            Actions.sendLocation(stationaryLocation);
        });

        BackgroundGeolocation.on('error', (error) => {
            console.log('[ERROR] BackgroundGeolocation error:', error);
        });

        BackgroundGeolocation.on('start', () => {
            console.log('[INFO] BackgroundGeolocation service has been started');
        });

        BackgroundGeolocation.on('stop', () => {
            console.log('[INFO] BackgroundGeolocation service has been stopped');
        });

        BackgroundGeolocation.on('authorization', (status) => {
            console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
            if (status !== BackgroundGeolocation.AUTHORIZED) {
                // we need to set delay or otherwise alert may not be shown
                setTimeout(() =>
                    Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
                        { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
                        { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
                    ]), 1000);
            }
        });

        BackgroundGeolocation.on('background', () => {
            console.log('[INFO] App is in background');
        });

        BackgroundGeolocation.on('foreground', () => {
            console.log('[INFO] App is in foreground');
        });

        BackgroundGeolocation.on('abort_requested', () => {
            console.log('[INFO] Server responded with 285 Updates Not Required');

            // Here we can decide whether we want stop the updates or not.
            // If you've configured the server to return 285, then it means the server does not require further update.
            // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
            // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
        });

        BackgroundGeolocation.on('http_authorization', () => {
            console.log('[INFO] App needs to authorize the http requests');
        });

        BackgroundGeolocation.checkStatus(status => {
            console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
            console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
            console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

            // you don't need to check status before start (this is just the example)
            if (!status.isRunning) {
                BackgroundGeolocation.start(); //triggers start on start event
            }
        });



    }
    showLoader = () => {
        this.setState({ isLoading: true });
    };
    hideLoader = () => {
        this.setState({ isLoading: false });
    };

    toggle(){
        this.props.navigation.toggleDrawer();
    };

    SavePunchIn = async(value) => {
        // alert(this.state.locations.latitude);return;
        // this.showLoader();
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/attendances/punch-in',{
            method:'POST',
            headers:{
                'x-auth': access_token,
                // 'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                time: moment().format("YYYY-MM-DD HH:mm:ss "),
                longitude: this.state.locations.longitude,
                latitude: this.state.locations.latitude,
            })
        })
            .then((response)=> response.json())
            .then ((responseJson) => {

                if(responseJson.success){
                    // alert('yess');
                    this.hideLoader();
                    this.setState({switchValue: value}),
                        this.getAttendance(),
                    this.saveAttendance('true')
                }
                else{
                    this.setState({
                        processing:false,
                        disabledSwitch:false
                    })
                    this.hideLoader();
                    this.saveAttendance('false')
                    alert(JSON.stringify(responseJson.errors.punch_in));
                }
            })
            .catch((error) => {
                this.saveAttendance('false')
                this.setState({switchValue: false, disabledSwitch:false});
                this.hideLoader();
                alert(error);
            })
            .done();
    };
    saveAttendance = async (data) => {
        this.setState({
            processing:false,
            disabledSwitch:false
        })

        await AsyncStorage.setItem('Attendance', data);
        // alert(await AsyncStorage.getItem('Attendance'))

    };
    SavePunchOut = async(value) => {
        this.showLoader();
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/attendances/punch-out',{
            method:'POST',
            headers:{
                'x-auth': access_token,
                // 'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                time:  moment().format("YYYY-MM-DD HH:mm:ss "),
                longitude: this.state.locations.longitude,
                latitude: this.state.locations.latitude,
            })
        })
            .then((response)=> response.json())

            .then ((responseJson) => {

                if(responseJson.success){
                    this.saveToAsyncStorage('false');
                    SessionHelper.removeCartJson();
                    AsyncStorage.removeItem('Id');
                    this.hideLoader();
                    this.getAttendance();
                    this.saveAttendance('false')
                    this.setState({switchValue: value});
                    this.BackgroundLocationStop()
                }
                else{
                    this.setState({
                        processing:false,
                        disabledSwitch:false
                    })
                    this.saveAttendance('true')
                    this.hideLoader();
                    alert(JSON.stringify(responseJson.errors.punch_out));
                }
            })
            .catch((error) => {
                this.setState({
                    disabledSwitch:false
                })
                this.saveAttendance('true')
                this.hideLoader();
                alert(error);
            })
            .done();
    };



    renderEmptyView() {
        if(this.state.showEmptyView) {
            return (
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:18}}>No attendance..</Text>
                </View>
            )
        }
        else {
            return<ActivityIndicator size="small" color="#353535" />;
        }
    }

    processing() {
        if(this.state.processing) {
            return<ActivityIndicator style={{position:'absolute',bottom:17,right:20}} size="small" color="#353535" />;
        }
        else {
            return null;
        }
    }


    searchIcon(){
        if(this.state.shopName=''){
            alert('asadas');
            <Icon name="md-search" size={22} color="#000"/>
        }
        else return null;
    }

    ClearCartPunchOut(value){
        this.requestLocationPermissionPunchOut(value)
    }
    CheckCartToggle = (value) => {
        if(this.state.cart > 0) {
            Alert.alert(
                'Confirm',
                'You need to save orders from the cart first.',
                [
                    {text: 'Cancel', onPress: () =>  this.setState({
                            processing:false,
                            disabledSwitch:true
                        })},
                    {text: 'Clear cart and Punch Out', onPress: ()=>this.ClearCartPunchOut(value)},
                    {text: 'Go to cart', onPress: ()=>
                            this.setState({
                                processing:false,
                                disabledSwitch:false
                            },()=>this.props.navigation.navigate('AddOrderEnd'))},


                ],
                { cancelable: false }
            )

        }
        else {

          this.requestLocationPermissionPunchOut();

        }



        //onValueChange of the switch this function will be called

        //state changes according to switch
        //which will result in re-render the text
    }
    toggleSwitch = (value) => {
// alert(value);
        NetInfo.fetch().then(state => {
            if(state.isConnected){
                if(value == true) {
                    this.setState({
                        processing:true,
                        disabledSwitch:true
                    },()=>this.requestLocationPermission(value))

                }
                else {
                    this.setState({
                        processing:true,
                        disabledSwitch:true
                    },()=> this.CheckCartToggle(value))

                }
            }
            else{
               alert('No Internet Connection...')
            }

        });




        //onValueChange of the switch this function will be called

        //state changes according to switch
        //which will result in re-render the text
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
                    <Text style={{textAlign:'center',fontSize: 14,color:'#2a8ee5',marginBottom:5}}>{moment().format("dddd, MMMM Do YYYY")}</Text>
                    <View style={{width:'90%',flexDirection:'row',justifyContent:'center',elevation:1,backgroundColor:'#fff',borderRadius:15,paddingTop:10,paddingBottom: 10}}>
                        <Text style={{marginRight:10}}>Punch Out</Text>
                        <Switch
                            disabled={this.state.disabledSwitch}
                            onValueChange = {value =>this.toggleSwitch(value)}
                            value = {this.state.switchValue}
                        />
                        <Text style={{marginLeft:10}}>Punch In</Text>
                        {this.processing()}
                    </View>
                </View>

                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>
                    <View style={{width:'90%',flexDirection:'row'}}>
                        <Text style={{width:'50%',color:'#f9156c',textAlign: 'center'}}>Punch In</Text>
                        <Text style={{width:'50%',color:'#f9156c',textAlign: 'center'}}>Punch Out</Text>

                    </View>
                </View>
                <View style={{width:'100%',alignItems: 'center',marginBottom:10,}}>

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