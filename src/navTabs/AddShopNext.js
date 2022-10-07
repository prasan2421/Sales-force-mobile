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
import ErrorText from "../commons/ErrorText";
import {images} from "../constants/images";
import ImagePicker from "react-native-image-picker";
import Geolocation from 'react-native-geolocation-service';
import ActivityIcon from "../commons/ActivityIcon";
const options = {
    title: 'Select Shop',

    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            avatarSource:'',
            name:this.props.navigation.getParam('shopName', 0),
            BeatName:this.props.navigation.getParam('BeatName', 0),
            ownerName:this.props.navigation.getParam('ownerName', 0),
            TownName:this.props.navigation.getParam('TownName', 0),
            ShopType:this.props.navigation.getParam('ShopType', 0),
            ShopCategory:this.props.navigation.getParam('ShopCategory', 0),

            email:'',
            dataLocation:[],
            location:'',
            mobile:'',
            address:'',
            gps:'',
            gstNumber:'',
            retailerCode:'',
            retailerCodeError:'',
            state:'',
            district:'',
            avatarSource1: { uri: '' },
            avatarSource2: { uri: '' },

            city:'',
            pincode:'',
            state1:'',
            district1:'',
            city1:'',
            pincode1:'',
            dataState:[]
        }
    }


    componentDidMount() {
        this.getLocationFromAsyncStorage();
        this.getState();
    }

    getState = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/states', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success='true') {

                    this.setState({
                        dataState: responseJson.data.states,
                    });

                }
                else{
                    alert('Something went wrong.');
                }
            })
            .catch((error) => {

                alert('An error occurred');
            })

    };

    requestLocationPermission= async () =>  {
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
                        this.setState({
                            gps:position.coords.latitude+','+position.coords.longitude,
                        })
                        // alert(JSON.stringify(position));
                        // console.log(position);
                    },
                    (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );

            } else {
                Alert.alert('Error','Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    showLoader = () => {
        this.setState({ isLoading: true });
    };

    hideLoader = () => {
        this.setState({ isLoading: false });
    };



    getLocationFromAsyncStorage = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/locations', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {

                    this.setState({
                        // showEmptyView: true,
                        dataLocation: responseJson.data.locations,

                        // vchrno:responseJson.result.VCHRNO?responseJson.result.VCHRNO:'New'
                    });
                }
                else{

                    alert(responseJson.message);
                }

            })
            .catch((error) => {

                alert('An error occurred');
            })

    };
    Submit = async() => {

        // let retailerCode = this.state.retailerCode;
        let mobile = this.state.mobile;
        let address = this.state.address;
        let location = this.state.gps;
        let longitude = this.state.longitude;
        let latitude = this.state.latitude;


        // let retailerCodeError:'';
        let mobileError = '';
        let addressError = '';
        let locationError = '';



        if(mobile==""){
            mobileError = 'Please enter the mobile number';
        }

        if(address==""){
            addressError = 'Please enter the address';
        }
        if(location==""){
            locationError = 'Please enter the location';
        }
        // if(retailerCode==""){
        //     retailerCodeError = 'Please enter the retailer code';
        // }



        this.setState({

            mobileError: mobileError,
            addressError: addressError,
            locationError: locationError,
            // retailerCodeError:retailerCodeError


        });

        if( mobileError || addressError || locationError ) {
            return;
        }

        this.showLoader();
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/customers',{
            method:'POST',
            headers:{
                'x-auth': access_token,
                // 'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                location_id: this.state.location,

                name: this.state.name,
                route_id:this.state.BeatName,
                mobile: this.state.mobile,
                address: this.state.address,
                longitude: this.state.longitude,
                latitude: this.state.latititude,

                customer_type_id:this.state.ShopType,
                customer_class_id:this.state.ShopCategory,
                sap_code:this.state.retailerCode,

                gst_number:this.state.gstNumber,
                town:this.state.TownName,

                owner_name:this.state.ownerName,
                owner_email:this.state.email,
                owner_contact_number:this.state.mobile,
                billing_state_id:this.state.state,
                billing_district:this.state.district,
                billing_city:this.state.city,
                billing_address:this.state.address,
                billing_pincode:this.state.pincode,
                shipping_state_id:this.state.state1,
                shipping_district:this.state.district1,
                shipping_city:this.state.city1,
                shipping_address:this.state.address1,
                shipping_pincode:this.state.pincode1,
            })
        })
            .then((response)=> response.json())


            .then ((responseJson) => {

                if(responseJson.success){
                    this.hideLoader();
                    this.props.navigation.navigate('AddShop');
                    Alert.alert('Success','Shop added successfully.')
                    // this.saveToAsyncStorage(responseJson);
                }
                else{
                    this.hideLoader();
                    if(responseJson.errors.sap_code){
                        this.setState({
                            retailerCodeError:responseJson.errors.sap_code
                        })
                    }
                    else{
                        alert(JSON.stringify(responseJson.errors));
                    }

                }
            })
            .catch((error) => {
                this.hideLoader();
                alert('An error occurred');
            })
            .done();

    };


    image1=()=> {

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
                this.setState({
                    avatarSource1: source,
                });
            }
        });
    };
    image2=()=> {
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
                this.setState({
                    avatarSource2: source,
                });
            }
        });
    };

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
                <ActivityIcon visible={this.state.isLoading}
                              indicatorColor={'#333333'}
                              messageColor={'#afafaf'}
                              message='Please wait, Saving customer...'
                />

                <View style={{width:'100%',marginBottom:10,alignItems: 'center',marginTop:10}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',alignItems:'center',borderRadius:5,elevation: 1}}>
                        <TextInput style={{paddingLeft:10}}
                                   value={this.state.gps}
                                   placeholder="GPS Location"
                                   returnKeyType='done'
                                   onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(gps) => this.setState({gps})}
                        />
                        <TouchableOpacity onPress={() => this.requestLocationPermission()}>
                        <Icon name="md-pin" color={"#2f2f2f"} size={24} style={{padding:5}} />
                        </TouchableOpacity>
                    </View>
                    <ErrorText text={this.state.locationError} />
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <TextInput style={{paddingLeft:10,width:'100%'}}
                                   placeholder="GST number"
                                   returnKeyType='done'
                                   onSubmitEditing={Keyboard.dismiss}
                                   onChangeText={(gstNumber) => this.setState({gstNumber})}
                        />
                    </View>
                    <ErrorText text={this.state.latitudeError} />
                </View>
                {/*<View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>*/}

                    {/*<View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>*/}
                        {/*<TextInput style={{paddingLeft:10,width:'100%'}}*/}
                                   {/*placeholder="Retailer Code"*/}
                                   {/*returnKeyType='done'*/}
                                   {/*onSubmitEditing={Keyboard.dismiss}*/}
                                   {/*onChangeText={(retailerCode) => this.setState({retailerCode})}*/}
                        {/*/>*/}
                    {/*</View>*/}
                    {/*<ErrorText text={this.state.retailerCodeError} />*/}
                {/*</View>*/}
                <View style={{width:'100%',alignItems:'center',}}>
                <View style={{flexDirection:'row',width:'90%',marginBottom:10,alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        <Text style={{fontWeight:'bold',marginRight:10}}>Images</Text>
                        <TouchableOpacity onPress={() => this.image1()}>
                            <View style={styles.boxImage}>
                                <Image source={this.state.avatarSource1.uri ? this.state.avatarSource1 : images.iconimage } style={styles.imageUpload}  />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.image2()}>
                            <View style={styles.boxImage}>
                                <Image source={this.state.avatarSource2.uri ? this.state.avatarSource2 : images.iconimage} style={styles.imageUpload}  />
                            </View>
                        </TouchableOpacity>
                    </View>
                        <Icon name="md-camera" color={"#2f2f2f"} size={24} />
                </View>
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>
                    <View style={{width:'90%'}}>
                   <Text style={{color:'#f9156c'}}>Primary Contact</Text>
                    </View>
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <TextInput style={{paddingLeft:10,width:'100%'}}
                                   maxLength={10}
                                   keyboardType={'numeric'}
                                   placeholder="Mobile No. (Required)"
                                   returnKeyType='done'
                                   onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(mobile) => this.setState({mobile})}
                        />
                    </View>
                    <ErrorText text={this.state.mobileError} />
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <TextInput style={{paddingLeft:10,width:'100%'}}
                                   placeholder="Email Id (Required)"
                                   returnKeyType='done'
                                   onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(email) => this.setState({email})}
                        />
                    </View>
                    <ErrorText text={this.state.emailError} />
                </View>

                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>
                    <View style={{width:'90%'}}>
                    <Text style={{color:'#f9156c'}}>Billing Details</Text>
                    </View>
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <Picker
                            selectedValue={this.state.state}
                            style={{width: '100%',}}

                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({state: itemValue})
                            }>
                            <Picker.Item label="State" value="" />
                            {this.state.dataState.map(item => (<Picker.Item key={'' + item._id} label={item.name} value={item._id} />))}

                        </Picker>

                    </View>
                </View>
                
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <TextInput style={{paddingLeft:10,width:'100%'}}
                                   placeholder="City name / Village name"
                                   returnKeyType='done'
                                   onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(city) => this.setState({city})}
                        />


                    </View>
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <TextInput style={{paddingLeft:10,width:'100%'}}
                                   placeholder="Address (Required)"
                                   returnKeyType='done'
                                   onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(address) => this.setState({address})}
                        />


                    </View>
                    <ErrorText text={this.state.addressError} />
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <TextInput style={{paddingLeft:10,width:'100%'}}
                                   placeholder="Pincode"
                                   returnKeyType='done'
                                   onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(pincode) => this.setState({pincode})}
                        />


                    </View>
                </View>

                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>
                    <View style={{width:'90%'}}>
                    <Text style={{color:'#f9156c'}}>Shipping Details</Text>
                    </View>
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>

                        <Picker
                            selectedValue={this.state.state1}
                            style={{width: '100%',}}

                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({state1: itemValue})
                            }>
                            <Picker.Item label="State" value="" />
                            {this.state.dataState.map(item => (<Picker.Item key={'' + item._id} label={item.name} value={item._id} />))}
                        </Picker>

                    </View>
                </View>

                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <TextInput style={{paddingLeft:10,width:'100%'}}
                                   placeholder="City name / Village name"
                                   returnKeyType='done'
                                   onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(city1) => this.setState({city1})}
                        />


                    </View>
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <TextInput style={{paddingLeft:10,width:'100%'}}
                                   placeholder="Address"
                                   returnKeyType='done'
                                   onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(address1) => this.setState({address1})}
                        />


                    </View>
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <TextInput style={{paddingLeft:10,width:'100%'}}
                                   placeholder="Pincode"
                                   returnKeyType='done'
                                   onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(Pincode1) => this.setState({Pincode1})}
                        />


                    </View>
                </View>
                <View style={styles.buttonWrapper}>

                    <TouchableHighlight onPress={this.Submit} style={{ backgroundColor:'#ff1f77',
                        paddingLeft:40,
                        paddingRight:40,
                        paddingTop:10,
                        borderRadius:20,
                        paddingBottom:10}}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableHighlight>

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
        marginTop:20,
        marginBottom:20,
        alignItems:'center',
    },
    buttonText: {
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
    boxImage:{
        margin: 5,
        borderStyle: 'dotted',
        borderRadius : 1,
        borderWidth: 3,
        borderColor:'#aaa'
    },
    imageUpload:{
        height:80,
        width:80,
    },


});