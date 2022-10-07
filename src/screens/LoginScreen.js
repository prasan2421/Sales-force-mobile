import React, {Component} from 'react';

import {
    AppRegistry,
    ImageBackground,
    Dimensions,
    Alert,
    ScrollView,
    Button,
    Image,
    TextInput,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Animated,
    StatusBar,
    StyleSheet, AsyncStorage, Keyboard
} from 'react-native';

import {Text} from 'react-native';
import ActivityIcon from "../commons/ActivityIcon";
import ErrorText from '../commons/ErrorText';

import {images} from "../constants/images";

class LoginScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            opacity: new Animated.Value(0),
            position: new Animated.Value(0),
        }
    }
    componentDidMount(){
        this.opacityAnim();
        this.positionAnim();
    }

    login = () => {

        let email = this.state.email.trim();
        let password = this.state.password;
        let emailError = '';
        let passwordError = '';

        if(email==""){
            emailError = 'Please enter the email';
        }

        if(password==""){
            passwordError = 'Please enter the password';
        }

        this.setState({
            emailError: emailError,
            passwordError: passwordError
        });
        

        if(emailError ||  passwordError) {
            return;
        }
        this.showLoader();
        // fetch('http://14.192.18.73/api/users/login',{
            fetch('http://14.192.18.73/api/users/login',{

            method:'POST',
            headers:{
                // 'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        })
            .then((response)=> response.json())


            .then ((responseJson) => {
// alert(JSON.stringify(responseJson));return;
                if(responseJson.success){

                    this.saveToAsyncStorage(responseJson);
                    // this.props.navigation.navigate('LoginScreenOtp',{ Email: this.state.email,Token:responseJson.data.token});

                }
                else{
                    this.hideLoader();
                    // alert(JSON.stringify(responseJson.errors.email));return;
                    if(responseJson.errors.email){
                        alert(responseJson.errors.email);
                    }
                    else{
                        alert(JSON.stringify(responseJson.errors));
                    }

                }
            })
            .catch((error) => {
                this.hideLoader();
                alert(error);
            })
            .done();
    };

    saveToAsyncStorage = async (data) => {
        await AsyncStorage.multiSet([
            ['role', 'bride'],
            ['access_token',data.data.token],
        ]);
        this.props.navigation.navigate('navTabs');
        this.hideLoader();
    };
    loginTest = async () => {
        await AsyncStorage.multiSet([
            ['role', 'bride'],
        ]);
        this.props.navigation.navigate('navTabs');

    };

    showLoader = () => {
        this.setState({ isLoading: true });
    };

    hideLoader = () => {
        this.setState({ isLoading: false });
    };

    opacityAnim=() =>{
        Animated.timing(this.state.opacity,{
            toValue:1,
            duration:200
        }).start()
    };

    positionAnim=() =>{
        Animated.timing(this.state.position,{
            toValue:1,
            duration:300,
            useNativeDriver:true,
        }).start()
    };


    render(){


        const logoTranslate = this.state.position.interpolate({
            inputRange:[0,1],
            outputRange:[245,20],
        });
        const width = (Dimensions.get('window').width)-170;
        const height = width/2.118;
        return(
                <View style={styles.wrapper}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor='#1577ce'
                    />

                <ActivityIcon visible={this.state.isLoading}
                              indicatorColor={'#333333'}
                              messageColor={'#afafaf'}
                              message='Please wait, logging in...'
                />

                <View style={{flex:1,backgroundColor:'#1577ce'}}/>
                <View style={{flex:2.5,backgroundColor:'#e8e8e8',paddingLeft:25,paddingRight:25,}}>
                    <View style={styles.container}>
                        <View style={styles.containerInside}>
                            <View style={{alignItems:'center', marginTop:30,marginBottom:30}} >
                                <Image style={{width,height}}  source={images.logo}/>
                            </View>
                            <View style={{alignItems:'center',marginBottom:20}} >
                                <Text style={{fontSize:16,color:'#1577ce'}}>LOGIN</Text>
                            </View>

                            <View style={{marginBottom:15}}>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                               placeholder="Enter the email"
                                               returnKeyType='next'
                                               onSubmitEditing={() => this.passwordRef.focus()}
                                               autoCapitalize = 'none'
                                               underlineColorAndroid='transparent'
                                               onChangeText={(email) => this.setState({email})}/>

                                </View>
                                <ErrorText text={this.state.emailError} />

                            </View>
                            <View style={{marginBottom:30}}>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                               placeholder="Enter the password"
                                               ref={passwordRef => this.passwordRef = passwordRef}
                                               returnKeyType='done'
                                               onSubmitEditing={Keyboard.dismiss}
                                               secureTextEntry={true}
                                               underlineColorAndroid='transparent'
                                               onChangeText={(password) => this.setState({password})}/>

                                </View>
                                <ErrorText text={this.state.passwordError} />
                            </View>
                            <View style={styles.loginWrapper}>

                                <TouchableHighlight onPress={(this.login)} style={styles.loginButton}>
                                    <Text style={styles.loginText}>Login</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={[styles.forgotText]}
                                    // onPress={() => this.props.navigation.navigate('ForgotPasswordFirst')}
                                >
                                    <Text style={{fontSize:14,color:'#9b9b9b'}}>Forgot your password?</Text>
                                </TouchableHighlight>
                                <View style={[styles.PinkText]}
                                    // onPress={() => this.props.navigation.navigate('ForgotPassword')}
                                >
                                    <Text style={{fontSize:14, color:'#ff1f77'}}>विकल्प रहित संकल्प । अखण्ड ,प्रचण्ड पुरुषार्थ ।</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                </View>
        );
    }
}
export default LoginScreen;

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    wrapper:{
        flex:1,
    },
    container: {
        justifyContent:'center',
        width:'100%',
        height:520,
       backgroundColor:'#fff',
        borderRadius:10,
        top:'-25%',
        elevation:5,
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,

    },
    containerInside:{
        justifyContent:'center',
       width:'100%',
        paddingLeft:20,
        paddingRight:20
    },

    inputContainer: {
        elevation:5,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        paddingLeft:5,
        paddingRight:5,
        borderRadius:10,
        backgroundColor:'#fff',
    },


    inputs:{

    },
    inputIcon:{
        marginTop:5,
        width:40,
        height:15,
        marginLeft:15,
        alignSelf: 'flex-end'
    },
    loginWrapper: {
        alignItems:'center',
    },
    loginButton:{
        elevation:5,
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:50,
        paddingRight:50,
        borderRadius:30,
        marginBottom:20,
        backgroundColor:'#ff1f77',

    },

    forgotText:{
        width:'70%',
        alignItems: 'center',
        marginBottom:20,

    },
    PinkText:{
        width:'100%',
        alignItems: 'center',
        marginBottom:20,


    },
    loginText: {
        color: 'white',
    }

});
