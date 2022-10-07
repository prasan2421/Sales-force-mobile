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
                <Text>response: {this.props.navigation.getParam('action', 0)}</Text>
                <View style={{width:'100%',justifyContent:'center',marginTop:10}}>
                    <TouchableOpacity style={styles.Button} onPress={() => this.props.navigation.navigate('Offers', { action: 'refresh' })}>
                        <Text style={{color:'#1d1d1d',textAlign:'center'}}>Save</Text>
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