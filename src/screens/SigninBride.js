import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Keyboard,
    TouchableHighlight,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    Image,
    Alert,
    AsyncStorage,
} from 'react-native';
import {images} from "../constants/images";
import ActivityIcon from "../commons/ActivityIcon";
import ErrorText from '../commons/ErrorText';
import Icon from 'react-native-vector-icons/Ionicons'
class SigninBride extends Component {

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
            // this.setState({emailError: 'please fill the email'});
            emailError = 'Please fill the email';

        }

        if(password==""){
            passwordError = 'Please fill the password';
        }
        else if(password.length <5){
            this.setState({passwordError: 'Password  must be more than 5'});
        }

        this.setState({
            emailError: emailError,
            passwordError: passwordError
        });

        if(emailError ||  passwordError) {
            return;
        }
        this.showLoader();
        this.saveToAsyncStorage('bride');
    };

    saveToAsyncStorage = async (data) => {
        await AsyncStorage.multiSet([
            ['role', data],

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
                               keyboardType="email-address"
                               returnKeyType='next'
                               autoCapitalize = 'none'
                               onSubmitEditing={() => this.passwordRef.focus()}
                               underlineColorAndroid='transparent'
                               onChangeText={(email) => this.setState({email})}
                    />
                    <ErrorText text={this.state.emailError} />

                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               ref={passwordRef => this.passwordRef = passwordRef}
                               returnKeyType='done'
                               placeholder="Password"
                               autoCapitalize = 'none'
                               secureTextEntry={true}
                               onSubmitEditing={Keyboard.dismiss}
                               underlineColorAndroid='transparent'
                               onChangeText={(password) => this.setState({password})}
                    />
                    <ErrorText text={this.state.passwordError} />

                </View>

                {/*<View style={styles.inputContainernew}>*/}

                    {/*<Icon name="logo-facebook" size={40} color="#fff" style={{justifyContent:'center',textAlign:'center'}} />*/}

                {/*</View>*/}


                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.login}   >
                    <Text style={styles.loginText}>Log In</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.forgotText]} onPress={() => this.props.navigation.navigate('PasswordResetBride')}>

                    <View style={[styles.forgotText]}>
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
        // height:10,
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

export default SigninBride;