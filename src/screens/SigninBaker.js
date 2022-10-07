import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    Button,
    TouchableHighlight,
    Keyboard,
    Modal,
    Image,
    Alert,
    AsyncStorage
} from 'react-native';
import {images} from "../constants/images";
import ActivityIcon from "../commons/ActivityIcon";
import ErrorText from '../commons/ErrorText';
import Icon from 'react-native-vector-icons/Ionicons'
class SigninBaker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email   : '',
            password: '',
            emailError: '',
            passwordError: ''
        }
    }

    login = () => {
        let email = this.state.email.trim();
        let password = this.state.password;

        let emailError = '';
        let passwordError = '';

        if(email==""){
            //alert('please fill the first name');
            emailError = 'Please fill the email';
        }

        if(password==""){
            passwordError = 'Please fill the password';
        }
        else if(password.length <5){
            passwordError = 'Password  must be more than 5';
        }

        this.setState({
            emailError: emailError,
            passwordError: passwordError
        });


        if(emailError || passwordError) {
            // alert('there is error');
            return;
        }

        // alert('did not return');
        this.showLoader();
        fetch('http://weddingcake.cyya.com/api/login',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        })
            .then((response)=> response.json())


            .then ((responseJson) => {
                if(responseJson.data) {

                    if(responseJson.data.role == "baker"){
                        // alert('yes');

                        this.saveToAsyncStorage(responseJson.data);
                    }
                    else{
                        alert('User does not not exist');
                        this.hideLoader();
                    }
                }
                else{
                    alert('User doesn not exist');
                    this.hideLoader();
                }

            })
            .done();
    };

    saveToAsyncStorage = async (data) => {
        await AsyncStorage.multiSet([
            ['role', data.role],
            ['Id',JSON.stringify(data.id) ],
            ['access_token', data.access_token],
            ['refresh_token', data.refresh_token]

        ]);
        this.props.navigation.navigate('navTabs');
    };

    showLoader = () => {
        this.setState({ isLoading: true });
    };

    hideLoader = () => {
        this.setState({ isLoading: false });
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIcon visible={this.state.isLoading}

                              indicatorColor={'#333333'}
                              messageColor={'#afafaf'}
                              message='Please wait, logging in...'
                />

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Email"
                               returnKeyType='next'
                               onSubmitEditing={() => this.passwordRef.focus()}
                               autoCapitalize = 'none'
                               underlineColorAndroid='transparent'
                               onChangeText={(email) => this.setState({email})}/>
                    <ErrorText text={this.state.emailError} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Password"
                               ref={passwordRef => this.passwordRef = passwordRef}
                               returnKeyType='done'
                               onSubmitEditing={Keyboard.dismiss}
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(password) => this.setState({password})}/>
                    <ErrorText text={this.state.passwordError} />
                </View>

                {/*<View style={styles.inputContainernew}>*/}

                        {/*<Icon name="logo-facebook" size={40} color="#fff" style={{justifyContent:'center',textAlign:'center'}} />*/}

                {/*</View>*/}

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.login}>
                    <Text style={styles.loginText}>Log In</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.forgotText]} onPress={() => this.props.navigation.navigate('PasswordResetBaker')}>

                    < View style={[styles.forgotText]}>
                        <Text style={{fontSize:12}}>Forgot your password?</Text>
                        <Image style={styles.inputIcon} source={images.forgot}/>

                    </View>
                </TouchableHighlight>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    inputContainer: {

        backgroundColor: '#f9f9f9',
        borderBottomWidth: 3,
        borderBottomColor:'#ff4b98',

        width:'70%',

        marginBottom:20,


    },
    inputContainernew: {
        height:50,
        justifyContent:'center',
        backgroundColor: '#43609c',

borderRadius:10,
        width:'70%',

        marginTop:20,
        marginBottom:40,


    },
    horizontal: {

        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    inputs:{


        borderBottomColor: '#FFFFFF',

    },
    inputIcon:{
        marginTop:5,
        width:40,
        height:15,
        marginLeft:15,

        alignSelf: 'flex-end'
    },
    buttonContainer: {
        height:60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:200,

    },
    loginButton: {
        position: 'absolute',
        top:0,
        right:0,
        backgroundColor: "#ff4b98",
    },
    forgotText:{
        width:'70%',
        alignItems: 'flex-end'
    },
    loginText: {
        color: 'white',
    }
});

export default SigninBaker;