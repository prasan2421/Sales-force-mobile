import React, {Component} from 'react';

import {

    Dimensions,
    TextInput,
    ScrollView,
    Image,
    View,
    Keyboard,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    AsyncStorage, Alert

} from 'react-native';
import ImagePicker from 'react-native-image-picker';


import Swiper from 'react-native-swiper';
import {images} from "../constants/images";
import {Header} from "react-navigation";
import RadioButton from '../commons/RadioButton';
import ActivityIcon from "../commons/ActivityIcon";
import ErrorText from '../commons/ErrorText';


const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class BakerForm extends Component{
    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState({
            showPagination: false
        });
    }
    _keyboardDidHide = () => {
        this.setState({
            showPagination: true
        });
    }

    constructor(props) {
        super(props);
        this.state = {

            isLoading: false,
            date:"2016-05-15",
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: '',
            _request_title: 'Bridal Cake',
            _request_guest_count: '',
            _request_needed_date: '',
            _request_location: '',
            _request_price_from: '',
            _request_price_to: '',
            first_name_Error: '',
            last_name_Error: '',
            email_Error: '',
            password_Error: '',
            confirm_password_Error: '',
            _request_title_Error: '',
            _request_guest_count_Error: '',
            _request_needed_date_Error: '',
            _request_location_Error: '',
            _request_price_from_Error: '',
            _request_price_to_Error: '',
            avatarSource1: { uri: '' },



        }
    }
    updateValue(text, field){
        if(field =='first_name'){
            this.setState({
                first_name:text,
            })
        }
        else if(field =='last_name'){
            this.setState({
                last_name:text,
            })
        }
        else if(field =='email'){
            this.setState({
                email:text,
            })
        } else if(field =='password') {
            this.setState({
                password: text,
            })
        } else if(field =='confirm_password') {
                this.setState({
                    confirm_password: text,
                })

        }else if(field =='bridalcake'){

        }else if(field =='cupcake'){

        }else if(field =='_request_guest_count'){
            this.setState({
                _request_guest_count:text,
            })
        }else if(field =='_request_needed_date'){
            this.setState({
                _request_needed_date:text,
            })
        }else if(field =='_request_location'){
            this.setState({
                _request_location:text,
            })
        }else if(field =='_request_price_from'){
            this.setState({
                _request_price_from:text,
            })
        }else if(field =='_request_price_to'){
            this.setState({
                _request_price_to:text,
            })
        }
    }

    submit(){
        let first_name = this.state.first_name.trim();
        let last_name = this.state.last_name.trim();
        let email = this.state.email.trim();
        let password = this.state.password;
        let confirm_password = this.state.confirm_password;
        let first_name_Error = '';
        let last_name_Error = '';
        let email_Error = '';
        let password_Error = '';
        let confirm_password_Error = '';

        if(first_name==""){
            first_name_Error = 'Please fill the First Name';
        }

        if(last_name==""){
            last_name_Error = 'Please fill the Last Name';
        }

        if(email==""){
            email_Error = 'Please fill the email';
        }

        if(password==""){
            password_Error = 'Please fill the password';
        }
        else if(password.length <5){
            password_Error ='Password  must be more than 5';
        }

        if(confirm_password==""){
            confirm_password_Error = 'Please fill the confirm password';
        }

        else if(password !== confirm_password){
            confirm_password_Error = 'Password does not match';
        }

        this.setState({
            first_name_Error: first_name_Error,
            last_name_Error: last_name_Error,
            email_Error: email_Error,
            password_Error: password_Error,
            confirm_password_Error: confirm_password_Error
        });



        if(first_name_Error || last_name_Error || email_Error || password_Error ) {

            this.refs.mySlide.scrollBy(-4,true);
            return;

        }
        const data = new FormData();
    data.append('first_name', this.state.first_name);
    data.append('last_name', this.state.last_name);
    data.append('email', this.state.email);
    data.append('password', this.state.password);
    data.append('_request_title', this.state._request_title);
    data.append('_request_guest_count', this.state._request_guest_count);
    data.append('_request_needed_date', this.state._request_needed_date);
    data.append('_request_location', this.state._request_location);
    data.append('_request_price_from', this.state.multiSliderValue[0]);
    data.append('_request_price_to', this.state.multiSliderValue[1]);
    data.append('status', 'UNVERIFIED');

    if(this.state.avatarSource1.uri) {
        data.append('avatar', {
            uri: this.state.avatarSource1.uri,
            type: 'image/jpeg',
            name: 'avatar'
        });
    }


// console.warn(data);

        let url = 'http://weddingcake.cyya.com/api/brides/store';
        this.showLoader();
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: data, // data can be `string` or {object}!
            headers:{
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                if(response.errors) {
                    this.hideLoader();
                    alert(response.errors);

                }
                else {
                    // AsyncStorage.setItem('baker',{})
                    //     .then(() => {
                    //
                    //     });
                    // console.log('Success:', response);
                    this.hideLoader();
                    // Alert.alert('Success!!!','Bride has been successfully created.');
                    this.props.navigation.navigate('signupBrideSubmitted');
                }

            })
            .catch(error => {
                console.error('Error:', error)
                this.hideLoader();
            });
    }

    onPress=()=>{
        this.refs.mySlide.scrollBy(1,true);
    };
    _onSelect = ( item ) => {
        console.log(item);
    };

    avatar=()=> {
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


    showLoader = () => {
        this.setState({ isLoading: true });
    };

    hideLoader = () => {
        this.setState({ isLoading: false });
    };

    render(){
        let ScreenWidth = Dimensions.get('window').width;
        let ScreenHeight = Dimensions.get('window').height;

        return(
            <Swiper style={styles.wrapper}
                    showsPagination={this.state.showPagination}
                    activeDotColor='#ff4b98'
                    ref={"mySlide"}
            loop={false}>



                <ScrollView
                    style={styles.slide}
                    behavior="padding"
                    keyboardVerticalOffset = {Header.HEIGHT + 20}
                    enabled
                >


                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} >
                        <Text style={styles.loginText}>Sign Up</Text>
                    </TouchableHighlight>
                    <View style={styles.container}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="First Name"
                                       returnKeyType='next'
                                       onSubmitEditing={() => this.last_name.focus()}
                                       underlineColorAndroid='transparent'

                                       onChangeText={(text) => this.updateValue(text,'first_name')}/>
                            <ErrorText text={this.state.first_name_Error} />
                        </View>




                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Last Name"
                                       ref={last_name => this.last_name = last_name}
                                       returnKeyType='next'
                                       onSubmitEditing={() => this.email.focus()}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text,'last_name')}/>
                            <ErrorText text={this.state.last_name_Error} />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Email"
                                       ref={email => this.email = email}
                                       returnKeyType='next'
                                       autoCapitalize = 'none'
                                       onSubmitEditing={() => this.password.focus()}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text,'email')}/>
                            <ErrorText text={this.state.email_Error} />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Password"
                                       secureTextEntry={true}
                                       ref={password => this.password = password}
                                       onSubmitEditing={() => this.confirm_password.focus()}
                                       returnKeyType='next'
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text,'password')}/>
                            <ErrorText text={this.state.password_Error} />

                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Confirm password"
                                       secureTextEntry={true}
                                       onSubmitEditing={Keyboard.dismiss}
                                       ref={confirm_password => this.confirm_password = confirm_password}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text,'confirm_password')}/>
                            <ErrorText text={this.state.confirm_password_Error} />
                        </View>

                        <View style={styles.inputContainerBelow}>
                            <Text style={styles.inputs}>
                                By proceeding, you agree to our <Text style={{color:"#ff4b98"}}>Privacy Policy</Text> and <Text style={{color:"#ff4b98"}}>Terms of
                                Use.</Text>
                            </Text>
                        </View>
                        <TouchableHighlight style={[styles.savenext]} onPress={() => this.onPress()}>
                            <Text style={{fontSize:20,color:"#ff4b98"}}>Save-Next</Text>
                        </TouchableHighlight>

                    </View>
                </ScrollView>

                <ScrollView
                    style={styles.slide}
                    behavior="padding"
                    keyboardVerticalOffset = {Header.HEIGHT + 20}
                    enabled
                >

                    <View style={styles.container}>
                        <View style={styles.inputContainerBelow}>
                            <Text style={styles.inputs}>
                                Reception Date
                            </Text>
                        </View>

                        <View style={styles.inputContainerBelow}>

                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Venue name and city"

                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text,'_request_location')}
                            />
                        </View>
                        <View style={styles.inputContainerBelow}>
                            <View style={styles.inputs}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{width: '50%',alignItems:'center'}}>
                                        <RadioButton

                                            checked={this.state._request_title == 'Bridal Cake'}
                                            onPress={() => this.setState({_request_title: 'Bridal Cake'})}
                                            checkedColor={'#ff4b98'}
                                            uncheckedColor={'#ff4b98'}
                                        />

                                        <Text>Bridal Cake</Text>
                                    </View>
                                    <View style={{width: '50%',alignItems:'center'}}>
                                        <RadioButton

                                            checked={this.state._request_title == 'Cupcakes'}
                                            onPress={() => this.setState({_request_title: 'Cupcakes'})}
                                            checkedColor={'#ff4b98'}
                                            uncheckedColor={'#ff4b98'}
                                        />
                                        <Text>Cupcakes</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Amount of serving"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text,'_request_guest_count')}/>
                        </View>
                        <TouchableHighlight style={[styles.savenext]}  onPress={() => this.onPress()}>
                            <Text style={{fontSize:20,color:"#ff4b98"}}>Save-Next</Text>
                        </TouchableHighlight>

                    </View>
                </ScrollView>




                <ScrollView
                    style={styles.slide}
                    behavior="padding"
                    keyboardVerticalOffset = {Header.HEIGHT + 20}
                    enabled
                >
                    <ActivityIcon visible={this.state.isLoading}

                                  indicatorColor={'#333333'}
                                  messageColor={'#afafaf'}
                                  message='Please wait'
                    />

                    <View style={styles.container}>


                        <View style={{
                            backgroundColor: '#f9f9f9',
                            width:'100%',
                            height:115,
                            marginBottom:20,
                            alignItems:'center'
                        }}>
                            <View style={{flex:1, flexDirection:'row', backgroundColor:'#fff',width:'80%', height:100,}}>

                                <View style={{width:100, height: 100,}}>
                                    <TouchableOpacity onPress={() => this.avatar()}>
                                        <Image source={this.state.avatarSource1.uri ? this.state.avatarSource1 : images.avatarbride } style={{width:115, height: 115,}}  />
                                    </TouchableOpacity>
                                </View>

                                <View style={{paddingLeft:20}}>
                                    <Text style={{fontSize:12}}>Name : <Text>{this.state.first_name.trim()}</Text> <Text>{this.state.last_name.trim()}</Text></Text>
                                    <Text style={{fontSize:12}}>Date : <Text>{this.state._request_needed_date.trim()}</Text></Text>
                                    <Text style={{fontSize:12}}>Venue : <Text>{this.state._request_location.trim()}</Text></Text>
                                    <Text style={{fontSize:12}}>Cake : <Text>{this.state._request_title}</Text></Text>
                                    <Text style={{fontSize:12}}>Servings : <Text>{this.state._request_guest_count.trim()}</Text></Text>

                                </View>
                            </View>
                        </View>
                        <Text style={{flex: 1,fontWeight:'bold',width:'100%', textAlign:'center', }}>Price Range</Text>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom:20}}>

                        </View>

                        <TouchableOpacity style={[styles.savenext]}  onPress={() => this.submit()}>
                            <Text style={{fontSize:20,color:"#ff4b98"}}>Save - Let the magic begin !</Text>
                        </TouchableOpacity>


                    </View>

                </ScrollView>
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    slide:{
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    savenext:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom:20,
    },
    containerBox:{
        justifyContent:'center',
        width: '70%',
        marginTop:50,
        marginBottom:50
    },
    imageUpload:{
        height:150,
        width:330,
    },

    bottomText:{
        position: 'absolute',
        bottom:60,
    },
    buttonContainer: {
        backgroundColor: '#f9f9f9',
        height:60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:200,
    },
    loginButton: {

        backgroundColor: "#ff4b98",
    },
    bottomText2:{
        width:'100%',
        position: 'absolute',
        justifyContent:'center',
        bottom:90,
        paddingLeft:20,
    },

    box:{
        width:'100%',
        marginBottom:10,
        alignItems:'center',
        justifyContent: 'center',
    },
    boxImage:{
        margin: 5,
        borderStyle: 'dotted',
        borderRadius : 1,
        borderWidth: 3,
        borderColor:'#aaa'
    },
    containerBox1:{
        backgroundColor:'#fff',
        // justifyContent:'left',
        width: '100%',
        marginBottom:50
    },
    containerInside:{
        justifyContent:'center',
        width: '70%',

    },
    containerFull:{
        justifyContent:'center',
        width: '100%',
    },

    inputContainer: {
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 3,
        borderBottomColor:'#ff4b98',
        width:'70%',
        marginBottom:20,
    },

    inputContainerBelow: {
        backgroundColor: '#f9f9f9',
        width:'70%',
        height:45,
        marginBottom:40,
        alignItems:'center'
    },

    inputContainer1: {
        backgroundColor: '#fff',
        width:'85%',
        marginBottom:20,
    },

    inputContainerTop: {
        backgroundColor: '#f9f9f9',
        width:'70%',
        marginBottom:20,
        flexDirection: 'row',
        // alignItems:'center'
    },

    inputs:{

// width:'100%'
    },
    inputs1:{
        borderTopWidth: 3,
        borderTopColor:'#ff4b98',
        height:45,

        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputs2:{
        borderTopWidth: 3,
        borderTopColor:'#ff4b98',
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
        marginTop:5,
        width:40,
        height:15,
        marginLeft:15,

        alignSelf: 'flex-end'
    },

    forgotText:{
        width:'70%',
        alignItems: 'flex-end'
    },
    loginText: {
        color: 'white',
    }

});

export default BakerForm;