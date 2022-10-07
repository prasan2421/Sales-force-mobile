import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    ScrollView,
    Alert,
    AsyncStorage,
    KeyboardAvoidingView,
    TouchableOpacity, Dimensions
} from 'react-native';
import { Header } from 'react-navigation';

const mockData = [
    {
        label: 'Check the box to the "Choice Bakers" terms of service and privacy policy.',
        value: 'one'
    },

];
class SignupBride extends Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            first_name_Error: '',
            last_name_Error: '',
            email_Error: '',
            password_Error: '',
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
        }


    }

    submit()
    {

        let first_name = this.state.first_name.trim();
        let last_name = this.state.last_name.trim();
        let email = this.state.email.trim();
        let password = this.state.password.trim();
        let first_name_Error: '';
        let last_name_Error: '';
        let email_Error: '';
        let password_Error: '';

        if(first_name==""){
            first_name_Error = 'please fill the First Name';
        }

        if(last_name==""){
            last_name_Error = 'please fill the Last Name';
        }

        if(email==""){
            email_Error = 'please fill the email';
        }

        if(password==""){
            password_Error = 'please fill the password';
        }
        else if(password.length <5){
            password_Error ='password  must be more than 5';
        }

        this.setState({
            first_name_Error: first_name_Error,
            last_name_Error: last_name_Error,
            email_Error: email_Error,
            password_Error: password_Error
        });


        if(first_name_Error || last_name_Error || email_Error || password_Error ) {
            return;

        }

        const data = new FormData();
        data.append('first_name', this.state.first_name);
        data.append('last_name', this.state.last_name);
        data.append('email', this.state.email);
        data.append('password', this.state.password);


        let url = 'http://weddingcake.cyya.com/api/brides/store';

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: data, // data can be `string` or {object}!
            headers:{
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                if(response.errors) {
                    alert(response.errors);
                }
                else {
                    AsyncStorage.setItem('bride_first',{})
                        .then(() => {

                        });
                    console.log('Success:', response);
                    this.props.navigation.navigate('SignupBrideSecond');
                }

            })
            .catch(error => {
                console.error('Error:', error)
            });
    }



    render() {
        let ScreenWidth = Dimensions.get('window').width;
        let ScreenHeight = Dimensions.get('window').height;
        return (

            <ScrollView
                style={{flex:1, width:ScreenWidth,  backgroundColor: '#f9f9f9',}}
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
                        <Text style={{color:'red', textAlign:'center'}}>
                            {this.state.first_name_Error}
                        </Text>
                    </View>


                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                                   placeholder="Last Name"
                                   ref={last_name => this.last_name = last_name}
                                   returnKeyType='next'
                                   onSubmitEditing={() => this.email.focus()}
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) => this.updateValue(text,'last_name')}/>
                        <Text style={{color:'red', textAlign:'center'}}>
                            {this.state.last_name_Error}
                        </Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                                   placeholder="Email"
                                   ref={email => this.email = email}
                                   returnKeyType='next'
                                   onSubmitEditing={() => this.password.focus()}
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) => this.updateValue(text,'email')}/>
                        <Text style={{color:'red', textAlign:'center'}}>
                            {this.state.email_Error}
                        </Text>
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
                        <Text style={{color:'red', textAlign:'center'}}>
                            {this.state.password_Error}
                        </Text>

                </View>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                                   placeholder="Confirm password"
                                   secureTextEntry={true}
                                   ref={confirm_password => this.confirm_password = confirm_password}
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) => this.updateValue(text,'confirm_password')}/>
                        <Text style={{color:'red', textAlign:'center'}}>
                            {this.state.password_Error}
                        </Text>
                    </View>

                    <View style={styles.inputContainerBelow}>
                        <Text style={styles.inputs}>
                            By proceeding, you agree to our <Text style={{color:"#ff4b98"}}>Privacy Policy</Text> and <Text style={{color:"#ff4b98"}}>Terms of
                            Use.</Text>
                        </Text>
                    </View>
                    <TouchableHighlight style={[styles.savenext]} onPress={() => this.submit()}>
                        <Text style={{fontSize:20,color:"#ff4b98"}}>Save-Next</Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.props.navigation.navigate('SignupBrideSecond')}>
                        <Text style={{fontSize:20,color:"#ff4b98"}}>Join the magic NOW!</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
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
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:'#fff'

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
        height:45,
        marginBottom:40,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputContainerBelow: {

        backgroundColor: '#f9f9f9',
        width:'70%',
        height:45,
        marginBottom:40,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputContainer1: {

        backgroundColor: '#f9f9f9',
        // borderTopWidth: 3,
        // borderTopColor:'#ff4b98',
        width:'70%',
        height:45,
        marginBottom:40,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputContainerTop: {

        backgroundColor: '#f9f9f9',

        width:'70%',

        marginBottom:20,
        flexDirection: 'row',
        // alignItems:'center'
    },
    inputs:{
        justifyContent:'center',
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
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
export default SignupBride;