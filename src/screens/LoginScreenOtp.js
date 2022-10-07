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
            email: this.props.navigation.getParam('Email', 0),
            code: '',
            codeError: '',
            opacity: new Animated.Value(0),
            position: new Animated.Value(0),
        }
    }
    componentDidMount(){
        this.opacityAnim();
        this.positionAnim();
    }

    login = () => {

        let code = this.state.code.trim();
        let codeError = '';

        if(code==""){

            codeError = 'Please enter the code';

        }

        this.setState({
            codeError: codeError,

        });

        if(codeError) {
            return;
        }

        this.showLoader();
        // fetch('http://14.192.18.73/api/users/verify-login',{
            fetch('http://14.192.18.73/api/users/verify-login',{

            method:'POST',
            headers:{
                // 'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                verification_code: this.state.code,
            })
        })
            .then((response)=> response.json())
            .then ((responseJson) => {
                if(responseJson.success){
                    // this.hideLoader();
                    // this.props.navigation.navigate('navTabs');
                    this.saveToAsyncStorage(responseJson);
                }
                else{
                    this.setState({
                        codeError: responseJson.errors.password,
                    });
                    this.hideLoader();
                }
            })
            .catch((error) => {
                this.hideLoader();
                alert('An error occurred');
            })
            .done();
    };

    saveToAsyncStorage = async (data) => {
        await AsyncStorage.multiSet([
            ['role', 'bride'],
            ['access_token',data.data.token],
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
                                <Text style={{fontSize:16,color:'#1577ce'}}>OTP</Text>
                            </View>
                            <View style={{alignItems:'center',marginBottom:20}} >
                                <Text style={{fontSize:16,color:'#1c1c1c'}}>Please type the verification code sent to your email.</Text>
                            </View>

                            <View style={{marginBottom:15}}>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                               placeholder="Enter the code"


                                               autoCapitalize = 'none'
                                               underlineColorAndroid='transparent'
                                               onChangeText={(code) => this.setState({code})}/>

                                </View>
                                <ErrorText text={this.state.codeError} />

                            </View>

                            <View style={styles.loginWrapper}>

                                <TouchableHighlight onPress={(this.login)} style={styles.loginButton}>
                                    <Text style={styles.loginText}>Submit</Text>
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
       backgroundColor:'#fff',
        borderRadius:10,
        top:'-25%',
        height:520,
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
