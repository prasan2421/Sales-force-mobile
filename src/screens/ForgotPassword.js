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
            email   : '',
            password: '',
            emailError: '',
            passwordError: '',
            opacity: new Animated.Value(0),
            position: new Animated.Value(0),
        }
    }
    componentDidMount(){

    }


    // login = () => {
    //     let email = this.state.email.trim();
    //     let password = this.state.password;
    //     let emailError = '';
    //     let passwordError = '';
    //
    //     if(email==""){
    //         //alert('please fill the first name');
    //         // this.setState({emailError: 'please fill the email'});
    //         emailError = 'Please fill the email';
    //
    //     }
    //
    //     if(password==""){
    //         passwordError = 'Please fill the password';
    //     }
    //     else if(password.length <5){
    //         this.setState({passwordError: 'Password  must be more than 5'});
    //     }
    //
    //     this.setState({
    //         emailError: emailError,
    //         passwordError: passwordError
    //     });
    //
    //     if(emailError ||  passwordError) {
    //         return;
    //     }
    //     this.showLoader();
    //     this.saveToAsyncStorage('bride');
    // };
    //
    // saveToAsyncStorage = async (data) => {
    //     await AsyncStorage.multiSet([
    //         ['role', data],
    //
    //     ]);
    //     this.props.navigation.navigate('navTabs');
    // };
    //


    showLoader = () => {
        this.setState({ isLoading: true });
    };

    hideLoader = () => {
        this.setState({ isLoading: false });
    };



    render(){

        return(
                <View style={styles.wrapper}>
                <View style={{alignItems:'center', backgroundColor:'#fff'}} >
                    <View>
                        <Image style={{height:140,width:150}}  source={images.logo}/>
                    </View>
                </View>
                <View style={styles.container}>
    <View style={styles.containerInside}>
<View style={{marginBottom:30}}>
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

    <View style={[styles.loginWrapper]}>
        <TouchableHighlight onPress={this.login} style={styles.loginButton}>
        <Text style={styles.loginText}>Send Email</Text>
        </TouchableHighlight>
    </View>


    </View>
</View>

                    <TouchableHighlight style={[styles.forgotText]}
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        <Text style={{fontSize:16,color:'#9b9b9b'}}>Go back to login screen</Text>

                    </TouchableHighlight>


                </View>
        );
    }
}
export default LoginScreen;
const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        alignItems:'center'
    },
    container: {
        justifyContent:'center',
        elevation:2,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        // backgroundColor: '#e4e4e4',
        alignItems:'center',
        width:'80%',
        borderRadius:25,
        height:'65%'
    },
    containerInside:{
        justifyContent:'center',
        marginTop:0,
        marginBottom:40,
       width:'80%',

    },

    inputContainer: {
        borderWidth:1.5,
        borderColor:'#dbdbdb',
        backgroundColor: '#ffffff',

        borderRadius:25,
        height:56,
        justifyContent:'center'
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
        paddingTop:17,
        paddingBottom:17,
        paddingLeft:50,
        paddingRight:50,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        borderBottomLeftRadius:30,
        backgroundColor:'#4a84ff'
    },

    forgotText:{
        width:'70%',
        alignItems: 'center',
        marginTop:40
    },
    loginText: {
        color: 'white',
    }

});
