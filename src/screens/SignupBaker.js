import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Alert,
    AsyncStorage
} from 'react-native';

class SignupBaker extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={styles.containerBox}>
                        <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center',fontSize:16, color:'#ff4b98',fontWeight:'bold'}}>Notice Applying Bakers</Text></View>
                        <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center',marginBottom:15,marginTop:30}}>Supply requested information by clicking "Join The Magic Now!"</Text></View>
                        <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center',marginBottom:15}}>Or</Text></View>
                        <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center'}}>Go on-line to</Text></View>
                        <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center',marginBottom:15,fontWeight:'bold'}}>WeddingCakeWizard.com</Text></View>
                        <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center'}}>Review FAQ's Click Here</Text></View>
                    </View>
                </View>
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.props.navigation.navigate('BakerForm')}>
                    <Text style={styles.loginText}>Sign Up</Text>
                </TouchableHighlight>
                <TouchableOpacity style={[styles.forgotText]}  onPress={() => this.props.navigation.navigate('BakerForm')}>
                    <Text style={{fontSize:20,color:"#ff4b98"}}>Join the magic NOW!</Text>
                </TouchableOpacity>
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


    box:{
        flex: 1,
        flexDirection: 'column',
        width:'90%',
        alignItems:'center',
        justifyContent: 'center',
marginBottom:150
    },

    containerBox:{
        padding: 10,
        paddingBottom:20,
        paddingTop:20,
        position:'absolute',
        top:'30%',
        justifyContent:'center',
        width: '90%',
        backgroundColor: '#fff',
        elevation: 4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius:10,
    },
    inputIcon:{
        width:30,
        height:30,
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
        left:0,
        backgroundColor: "#ff4b98",
    },
    forgotText:{
        position: 'absolute',
        bottom:20,



    },
    loginText: {
        color: 'white',
    },

});

export default SignupBaker;