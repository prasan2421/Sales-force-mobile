import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
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
                        <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center',fontSize:16, color:'#ff4b98',fontWeight:'bold'}}>Application Submitted</Text></View>
                        <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center',marginBottom:15,marginTop:30,fontWeight:'bold'}}>We'll call if there are items which need clarification.</Text></View>
                        <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center',marginBottom:15,fontWeight:'bold'}}>Otherwise, expect an email or test to confirm your approval within 3 business days.</Text></View>
                        <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center',fontWeight:'bold',marginBottom:15}}>When accepted, you'll be able to complete your account information.</Text></View>
                    </View>
                </View>
                <TouchableHighlight style={[styles.forgotText]}  onPress={() => this.props.navigation.navigate('signinBaker')}>
                    <Text style={{fontSize:20,color:"#ff4b98"}}>Ok</Text>
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


    box:{
        flex: 1,
        flexDirection: 'column',
        width:'90%',
        alignItems:'center',
        justifyContent: 'center',

    },

    containerBox:{
        padding: 10,
        paddingBottom:20,
        paddingTop:20,
        position:'absolute',
        top:'30%',
        justifyContent:'center',
        width: '80%',
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