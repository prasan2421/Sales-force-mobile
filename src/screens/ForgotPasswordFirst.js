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
    AsyncStorage, Alert, StatusBar

} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {Header} from "react-navigation";
import ActivityIcon from "../commons/ActivityIcon";
import ErrorText from '../commons/ErrorText';



class BakerForm extends Component {
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
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
            email: '',
            token:'',
            password: '',
            confirm_password: '',
            email_Error: '',
            token_Error: '',
            password_Error: '',
            confirm_password_Error: '',
        }
    }

    updateValue(text, field) {

        if (field == 'email') {
            this.setState({
                email: text,
            })
        } else if (field == 'password') {
            this.setState({
                password: text,
            })
        } else if (field == 'confirm_password') {
            this.setState({
                confirm_password: text,
            })
        }
        else if (field == 'token') {
            this.setState({
                token: text,
            })
        }
    }

    submitResetCode() {

            let email = this.state.email.trim();
            let email_Error = '';
            if (email == "") {
                email_Error = 'Please fill the email';
            }

            this.setState({
                email_Error: email_Error,

            });


            if (email_Error ) {
                return;

            }
        Alert.alert('Success!!!','Reset code has been sent to your email.');
        this.props.navigation.navigate('ForgotPasswordSecond',{email:this.state.email});return;
            const data = new FormData();

            data.append('email', this.state.email);


// console.warn(data);

            let url = 'http://weddingcake.cyya.com/api/password/create';
            this.showLoader();
            fetch(url, {
                method: 'POST', // or 'PUT'
                body: data, // data can be `string` or {object}!
                headers: {
                    'Accept': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                    if (response.errors) {
                        this.hideLoader();
                        alert(response.errors);
                    }
                    else {

                        this.hideLoader();
                        Alert.alert('Success!!!','Reset code has been sent to your email.');
                        this.props.navigation.navigate('ForgotPasswordSecond',{email:this.state.email});
                    }

                })
                .catch(error => {
                    console.error('Error:', error)
                    this.hideLoader();
                });
        }
    submit() {

        let email = this.state.email.trim();
        let token = this.state.token.trim();
        let password = this.state.password;
        let confirm_password = this.state.confirm_password;
        let email_Error = '';
        let token_Error = '';
        let password_Error = '';
        let confirm_password_Error = '';

        if (email == "") {
            email_Error = 'Please fill the email';
        }

        if (password == "") {
            password_Error = 'Please fill the password';
        }
        if (token == "") {
            token_Error = 'Please fill the token';
        }
        else if (password.length < 6) {
            password_Error = 'Password  must be more than 6';
        }

        if (confirm_password == "") {
            confirm_password_Error = 'Please fill the confirm password';
        }

        else if (password !== confirm_password) {
            confirm_password_Error = 'Password does not match';
        }

        this.setState({
            email_Error: email_Error,
            token_Error: token_Error,
            password_Error: password_Error,
            confirm_password_Error: confirm_password_Error
        });


        if (email_Error || token_Error || password_Error || confirm_password_Error) {

            return;

        }
        const data = new FormData();
        data.append('email', this.state.email);
        data.append('token', this.state.token);
        data.append('password', this.state.password);
        data.append('password_confirmation', this.state.confirm_password);

// console.warn(data);

        let url = 'http://weddingcake.cyya.com/api/password/reset';
        this.showLoader();
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: data, // data can be `string` or {object}!
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                if (response.errors) {
                    this.hideLoader();
                    alert(response.errors);
                }
                else {

                    this.hideLoader();
                    Alert.alert('Success!!!','Your password has been changed.');
                    this.props.navigation.navigate('signinBride');
                }

            })
            .catch(error => {
                console.error('Error:', error)
                this.hideLoader();
            });
    }


    showLoader = () => {
            this.setState({isLoading: true});
        };

        hideLoader = () => {
            this.setState({isLoading: false});
        };

        render()
        {
            let ScreenWidth = Dimensions.get('window').width;
            let ScreenHeight = Dimensions.get('window').height;

            return (
                <View
                    style={styles.slide}
                    // behavior="padding"
                    // keyboardVerticalOffset={Header.HEIGHT + 20}
                    // enabled
                >
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor='#1577ce'
                    />
                    <ActivityIcon visible={this.state.isLoading}

                                  indicatorColor={'#333333'}
                                  messageColor={'#afafaf'}
                                  message='Please wait'
                    />


                    <View style={styles.container}>
                        <TouchableHighlight style={[styles.loginButton]}>
                            <Text style={styles.loginText}>We'll send you the token you can use to reset password.</Text>
                        </TouchableHighlight>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       autoCapitalize = 'none'
                                       placeholder="Email"
                                       returnKeyType='next'
                                       onSubmitEditing={Keyboard.dismiss}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text, 'email')}/>
                            <ErrorText text={this.state.email_Error}/>
                        </View>

                        <TouchableOpacity style={[styles.savenext]} onPress={() => this.submitResetCode()}>
                            <Text style={{fontSize: 20, color: "#1577ce"}}>Send reset token</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            );
        }

}
const styles = StyleSheet.create({
    container: {

        marginTop:20,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    slide:{
        flex: 1,
        justifyContent:'center',
        backgroundColor: '#f9f9f9',
    },
    savenext:{
       marginTop:30,
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
marginBottom:40,
        backgroundColor: "#1577ce",
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
        borderBottomColor:'#1577ce',
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
        margin: 10
    }

});

export default BakerForm;