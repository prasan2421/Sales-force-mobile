import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    AsyncStorage,
    Button,
    TextInput,
    Alert,
    StyleSheet,
    Modal,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    TouchableHighlight,
    Dimensions,
    Image,
    ActivityIndicator, Keyboard
} from 'react-native';

class New extends Component {


    constructor(props) {
        super(props);
        this.state = {

        }
    }


    componentDidMount() {

        // this.getFromAsyncStorage();
    }


    // getFromAsyncStorage = async () => {
    //
    //
    //     const access_token = await AsyncStorage.getItem('access_token');
    //
    //     fetch('http://weddingcake.cyya.com/api/brides/bid-requests?service=select&service_type=free&bid_request_type=new', {
    //         headers: {
    //             Authorization: 'Bearer ' + access_token
    //         }
    //     })
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         if(responseJson.errors) {
    //
    //             alert(responseJson.errors);
    //         }
    //         else if(responseJson.data) {
    //
    //         }
    //     })
    //     .catch((error) => {
    //
    //         alert('An error occurred');
    //     })
    //
    // };
    signOutAsync = async (navigation) => {
        await AsyncStorage.clear();
        navigation.navigate('Auth');
    };
    toggle(){
        this.props.navigation.toggleDrawer();
    };


    render() {
        return (

            <View style={{flex:1}}>


                <View
                    style={{flex:1,width:'100%',justifyContent:'center'}}>
                   <Text style={{textAlign:'center'}}>Settings</Text>
                    <TouchableOpacity style={{textAlign:'center',marginBottom:30}}
                    onPress={() => this.signOutAsync(this.props.navigation)}
                    >
                    <Text>Signout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:'center'}}
                                      onPress={() => this.toggle()}
                    >
                        <Text>Toggle Drawer</Text>
                    </TouchableOpacity>

                </View>





            </View>
        );
    }
}

export default New;
const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 5,
        justifyContent:'center',
        alignItems:'center'
    },

});