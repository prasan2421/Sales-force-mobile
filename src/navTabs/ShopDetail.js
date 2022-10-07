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
    ActivityIndicator, Keyboard, StatusBar, PermissionsAndroid
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons'
import {images} from "../constants/images";
import Geolocation from "react-native-geolocation-service";
import ActivityIcon from "../commons/ActivityIcon";
const options = {
    title: 'Select QR',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
class New extends Component {


    constructor(props) {
        super(props);
        this.state = {
            avatarSource:'',
            name:'',
            email:'',
            mobile:'',
            isLoading:false,
            address:'',
            position:'',
            checkinId:'',
            data:[],
            id:this.props.navigation.getParam('Id', 0),
        }
    }


    componentDidMount() {
        this.checkGeom();
        this.getFromAsyncStorage();
    }

    saveLatLngToAsync = async (position,id) => {
        // alert(JSON.stringify(id));return;
        await AsyncStorage.multiSet([
            // ['Geom', position],
            ['Id',id]
        ],()=>this.hideLoader());
        this.checkGeom();
    };

    getLocation = (id) => {

        this.showLoader();
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            .then(result => {
                if (result == PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition(
                        (position) => {

                            this.setState({

                                position: JSON.stringify(position)
                            },()=>this.saveLatLngToAsync(position,id));

                        },
                        (error) => {
                            let message = '';

                            if (error.code == 1) {
                                message = 'This application requires permission to access location.';
                                this.hideLoader();
                            } else if (error.code == 4) {
                                message = 'Please make sure Google Play Services is installed and is up to date.';
                                this.hideLoader();
                            } else if (error.code == 5) {
                                message = 'Please enable location services.';
                                this.hideLoader();
                            } else {
                                message = 'Failed to retrieve location. Please try again.';
                                this.hideLoader();
                            }

                            alert(message);
                        },
                        {
                            enableHighAccuracy: true,
                            timeout: 15000,
                            maximumAge: 1000
                        },

                    );
                } else {
                    alert('This application requires permission to access location.');
                }
            });
    }
    checkOut = () => {
        AsyncStorage.removeItem('Id');
        this.checkGeom();
    }

    showLoader = () => {
        this.setState({ isLoading: true });
    };
    hideLoader = () => {
        this.setState({ isLoading: false });
    };

    checkGeom= async () => {
        // const geom = await AsyncStorage.getItem('Geom');
        const id = await AsyncStorage.getItem('Id');
        // alert(JSON.stringify(id));return;
        if(id==''){
            this.setState({
            })
        }
        else{
            this.setState({
                // position:geom,
                checkinId:id
            })
        }
    }


    getFromAsyncStorage = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/customers/'+this.state.id, {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {
// alert(JSON.stringify(responseJson.data));return;
                    this.setState({
                        // showEmptyView: true,
                        data: responseJson.data,

                        // vchrno:responseJson.result.VCHRNO?responseJson.result.VCHRNO:'New'
                    });
                }
                else{

                    alert(responseJson.message);
                }

            })
            .catch((error) => {
                this.setState({
                    showEmptyView: true
                });
                alert('An error occurred');
            })

    };
    signOutAsync = async (navigation) => {
        await AsyncStorage.clear();
        navigation.navigate('Auth');
    };
    toggle(){
        this.props.navigation.toggleDrawer();
    };
    qr=()=> {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {uri: response.uri};

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    };
    NewOrder(){
        if(this.state.checkinId == this.state.id){
            return(
                <TouchableHighlight
                    style={{
                        marginRight: 10,
                        backgroundColor:'#f9156c',
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderRadius: 20,
                        paddingLeft:15,
                        paddingRight:15
                    }}

                    onPress={() =>this.props.navigation.navigate('AddOrder')}

                >
                    <Text style={{
                        color: '#fff',
                        fontSize: 14
                    }}>New Order</Text>
                </TouchableHighlight>
            )
        }
        else return null;
    }

    render() {
        let backgroundColor = '#ff1f77';

        if(this.state.checkinId) {
            if(this.state.checkinId == this.state.id) {
                backgroundColor = '#ff650a';
            }
            else {
                backgroundColor ='#acacac'
            }
        }

        return (
            <ScrollView style={{backgroundColor:'#ebeef3'}}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor='#1B7ED5'
                />
                <ActivityIcon visible={this.state.isLoading}
                              indicatorColor={'#333333'}
                              messageColor={'#afafaf'}
                              message='Please wait...'
                />
                <View style={{width:'100%',marginBottom:10,marginTop:10,alignItems: 'center'}}>
                    <View style={{position:'relative',width:'95%',flexDirection: 'row',alignItems:'center',justifyContent:'center',backgroundColor:'#fff',}}>

                        <Image style={{height:120,width:'100%',justifyContent:'center',}}  source={images.patanjali_banner}/>

                        <View style={{position:'absolute',padding:3,bottom:0,backgroundColor:'#1f1f1f',right:0,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'#fff'}}>{this.state.data.customer_type}</Text>
                        </View>
                    </View>
                    <View style={{width:'95%',marginTop:10,backgroundColor:'#fff',padding:10,borderRadius:5}}>
                        <View style={{padding:10}}>
                            <Text style={{color:'#2b8fe7',fontSize:18}}>{this.state.data.name}</Text>

                        </View>
                        <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#e6e6e6',padding:10}}>
                            <Text style={{color:'#262626',width:150}}>Town</Text>
                            <Text style={{color:'#f9156c'}}>:{this.state.data.town}</Text>
                        </View>
                        <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#e6e6e6',padding:10}}>
                            <Text style={{color:'#262626',width:150}}>Beat</Text>
                            <Text style={{color:'#f9156c'}}>:{this.state.data.route}</Text>
                        </View>
                        <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#e6e6e6',padding:10}}>
                            <Text style={{color:'#262626',width:150}}>Shop Type</Text>
                            <Text style={{color:'#f9156c'}}>:{this.state.data.customer_type}</Text>
                        </View><View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#e6e6e6',padding:10}}>
                        <Text style={{color:'#262626',width:150}}>Owner's name</Text>
                        <Text style={{color:'#f9156c'}}>:{this.state.data.owner_name}</Text>
                    </View><View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#e6e6e6',padding:10}}>
                        <Text style={{color:'#262626',width:150}}>Contact no.</Text>
                        <Text style={{color:'#f9156c'}}>:{this.state.data.owner_contact_number}</Text>
                    </View><View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#e6e6e6',padding:10}}>
                        <Text style={{color:'#262626',width:150}}>Email</Text>
                        <Text style={{color:'#f9156c'}}>:{this.state.data.owner_email}</Text>
                    </View><View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#e6e6e6',padding:10}}>
                        <Text style={{color:'#262626',width:150}}>GST number</Text>
                        <Text style={{color:'#f9156c'}}>:{this.state.data.gst_number}</Text>
                    </View><View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#e6e6e6',padding:10}}>
                        <Text style={{color:'#262626',width:150}}>Billing Address</Text>
                        <Text style={{color:'#f9156c'}}>:{this.state.data.billing_address}</Text>
                    </View><View style={{flexDirection:'row',padding:10}}>
                        <Text style={{color:'#262626',width:150}}>Shipping Address</Text>
                        <Text style={{color:'#f9156c'}}>:{this.state.data.shipping_address}</Text>
                    </View>
                    </View>

                    <View style={{width:'95%',marginTop:10,padding:10,borderRadius:5}}>
                     <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <TouchableHighlight
                            style={{
                                marginRight: 10,
                                backgroundColor,
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderRadius: 20,
                                paddingLeft:15,
                                paddingRight:15
                            }}
                            disabled={this.state.checkinId && this.state.checkinId != this.state.id? true:false}
                            onPress={() => this.state.checkinId == this.state.id ? this.checkOut() : this.getLocation(this.state.id)}

                        >
                            <Text style={{
                                color: '#fff',
                                fontSize: 14
                            }}>{this.state.checkinId == this.state.id ? 'Check Out' : 'Check In'}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                                style={{
                                    marginRight: 10,
                                    backgroundColor:'#f9156c',
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    borderRadius: 20,
                                    paddingLeft:15,
                                    paddingRight:15
                                }}

                                onPress={() =>this.props.navigation.navigate('Feedback')}

                            >
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 14
                                }}>Feedback</Text>
                        </TouchableHighlight>
                         {this.NewOrder()}
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