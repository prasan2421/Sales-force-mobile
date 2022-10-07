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
            email:'',
            dataLocation:[],
            location:'',
            mobile:'',
            address:'',
            gps:'',

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

            oldpassword:'',
            newpassword:'',
            confirmpassword:'',

            oldpasswordError:'',
            newpasswordError:'',
            confirmpasswordError:''

        }
    }


    componentDidMount() {


    }



    showLoader = () => {
        this.setState({ isLoading: true });
    };

    hideLoader = () => {
        this.setState({ isLoading: false });
    };




    Submit = async() => {
        // alert('asdads');return;
        let oldpassword = this.state.oldpassword;
        let newpassword = this.state.newpassword;
        let confirmpassword = this.state.confirmpassword;
        let oldpasswordError = '';
        let newpasswordError = '';
        let confirmpasswordError = '';

        if(oldpassword==""){
            oldpasswordError = 'Please enter the current password';
        }

        if(newpassword==""){
            newpasswordError = 'Please enter the new password';
        }

        if(confirmpassword==""){
            confirmpasswordError = 'Please confirm the new password';
        }

        if(confirmpassword!=newpassword){
            confirmpasswordError = 'Password do not match';
        }

        this.setState({
            oldpasswordError: oldpasswordError,
            newpasswordError: newpasswordError,
            confirmpasswordError: confirmpasswordError,


        });

        if(oldpasswordError ||  newpasswordError || confirmpasswordError) {
            return;
        }

        this.showLoader();
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/users/change-password',{
            method:'POST',
            headers:{
                'x-auth': access_token,
                // 'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                current_password: this.state.oldpassword,
                new_password: this.state.newpassword,
            })
        })
            .then((response)=> response.json())


            .then ((responseJson) => {

                if(responseJson.success){

                    this.hideLoader();
                    this.props.navigation.navigate('Profile');
                    Alert.alert('Success','Password changed successfully.')
                    // this.saveToAsyncStorage(responseJson);
                }
                else{

                    this.hideLoader();
                    alert('Could not change the password.');
                }
            })
            .catch((error) => {
                this.hideLoader();
                // console.error(error);
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
                              message='Please wait, Changing Password...'
                />

                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>
                    {/*<View style={{width:'90%'}}>*/}
                   {/*<Text style={{color:'#f9156c'}}>Primary Contact</Text>*/}
                    {/*</View>*/}
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <TextInput style={{paddingLeft:10,width:'100%'}}
                                   // maxLength={10}
                                   // keyboardType={'numeric'}
                                   placeholder="Current Password"
                                   returnKeyType='done'
                                   onSubmitEditing={Keyboard.dismiss}
                                   onChangeText={(oldpassword) => this.setState({oldpassword})}
                        />
                    </View>
                    <ErrorText text={this.state.oldpasswordError} />
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <TextInput style={{paddingLeft:10,width:'100%'}}
                                   // maxLength={10}
                                   // keyboardType={'numeric'}
                                   placeholder="New Password"
                                   secureTextEntry={true}
                                   returnKeyType='done'
                                   onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(newpassword) => this.setState({newpassword})}
                        />
                    </View>
                    <ErrorText text={this.state.newpasswordError} />
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <TextInput style={{paddingLeft:10,width:'100%'}}
                                   placeholder="Confirm New Password"
                                   returnKeyType='done'
                                   secureTextEntry={true}
                                   onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(confirmpassword) => this.setState({confirmpassword})}
                        />
                    </View>
                    <ErrorText text={this.state.confirmpasswordError} />
                </View>


                <View style={styles.buttonWrapper}>

                    <TouchableHighlight onPress={this.Submit} style={{ backgroundColor:'#ff1f77',
                        paddingLeft:40,
                        paddingRight:40,
                        paddingTop:10,
                        borderRadius:20,
                        paddingBottom:10}}>
                        <Text style={styles.buttonText}>Change password</Text>
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