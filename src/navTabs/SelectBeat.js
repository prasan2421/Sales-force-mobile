import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    AsyncStorage,
    Button,
    TextInput,
    Alert,
    Picker,
    StyleSheet,
    Modal,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    TouchableHighlight,
    Dimensions,
    Image,
    ActivityIndicator, Keyboard, StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import {images} from "../constants/images";
import ErrorText from "../commons/ErrorText";



class New extends Component {

    constructor(props) {
        super(props);
        this.state = {
            TownName:'',

            avatarSource:'',
            BeatName:'',
            BeatNameError:'',
            ShopCategory:'',
            dataBeat:[]

        }
    }


    componentDidMount() {

        this.getBeatFromAsyncStorage();
    }
    getBeatFromAsyncStorage = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/routes', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success='true') {

                    this.setState({
                        dataBeat: responseJson.data.routes,
                    });

                }
                else{
                    alert('Something went wrong.');return;
                }
            })
            .catch((error) => {

                alert('An error occurred');
            })

    };


    next = () => {

        let BeatName = this.state.BeatName;

        let BeatNameError = '';

        if(BeatName==""){
            BeatNameError = 'Please select the Beat';
        }


        this.setState({
            BeatNameError: BeatNameError,

        });

        if(BeatNameError) {
            return;
        }
        this.props.navigation.navigate('MyVisit');


    };
    signOutAsync = async (navigation) => {
        await AsyncStorage.clear();
        navigation.navigate('Auth');
    };
    toggle(){
        this.props.navigation.toggleDrawer();
    };


    render() {
        return (
            <ScrollView style={{backgroundColor:'#ebeef3'}}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor='#1B7ED5'
                />

                <View style={{width:'100%',marginBottom:10,marginTop:10,alignItems: 'center'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <Picker
                            selectedValue={this.state.BeatName}
                            style={{width: '100%',}}

                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({BeatName: itemValue})
                            }>
                            <Picker.Item label="Select Beat" value="" />
                            {this.state.dataBeat.map(item => (<Picker.Item key={'' + item._id} label={item.name} value={item._id} />))}
                        </Picker>
                    </View>
                    <ErrorText text={this.state.BeatNameError} />
                </View>

                <View style={styles.buttonWrapper}>

                    <TouchableHighlight onPress={this.next} style={{  paddingLeft:40,
                        paddingRight:40,
                        paddingTop:10,
                        borderRadius:20,  backgroundColor:'#ff1f77',}}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableHighlight>


                </View>
            </ScrollView>
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
    buttonWrapper: {
        flexDirection:'row',
        marginTop:20,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText: {
        color: '#fff',


        paddingBottom:10

    },
    inputContainer: {
        marginTop:5,
        borderWidth:1.5,
        borderColor:'#dbdbdb',
        backgroundColor: '#ffffff',

        borderRadius:10,
        height:50,
        justifyContent:'center'
    },
    inputContainerTopWrapper:{
        flexDirection:'row'
    },
    inputContainerTopLeft: {
        marginTop:5,
        borderWidth:1.5,
        borderColor:'#dbdbdb',
        backgroundColor: '#ffffff',
        width:'80%',
        borderRadius:10,
        height:50,
        justifyContent:'center'
    },
    inputContainerTopRight: {
        marginTop:5,
        borderWidth:1.5,
        borderColor:'#dbdbdb',
        backgroundColor: '#ffffff',
        width:'20%',
        borderRadius:10,
        height:50,
        justifyContent:'center'
    },


});