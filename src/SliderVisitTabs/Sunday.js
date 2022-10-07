import React, { Component, Fragment } from 'react';
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
// import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import {images} from "../constants/images";
import MapView, {Marker,PROVIDER_GOOGLE, Polyline, Circle} from "react-native-maps";

class New extends Component {


    constructor(props) {
        super(props);
        this.state = {
            avatarSource:'',
            name:'',
            email:'',
            id:'',
            data:[
                {id:1,title: 'Mayura Patanjali Store',description:'location of Mayura Patanjali Store',latitude:19.119212,longitude:72.8615671},
                {id:2,title: 'Sonu Store',description:'Location of Sonu Store',latitude:19.1492171,longitude:72.8313493},
                {id:3,title: 'Patanjali Food & Cosmetics',description:'Location of Patanjali Food & Cosmetics',latitude:18.6015531,longitude:73.8152633},
                {id:4,title: 'Pittie Group (Patanjali)',description:'Location of Pittie Group (Patanjali)',latitude:19.1223499,longitude:72.8604631}
            ],
            coordinates:[

                { latitude: 19.119212, longitude: 72.8615671 },
                { latitude: 19.1492171, longitude: 72.8313493 },
                { latitude: 18.6015531, longitude: 73.8152633 },
                { latitude: 19.1223499, longitude: 72.8604631 },


            ]

        }
    }


    componentDidMount() {


        // this.getFromAsyncStorage();
    }


    getFromAsyncStorage = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/orders', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {
                    // alert(JSON.stringify(responseJson.data.orders));return;
                    this.setState({
                        // showEmptyView: true,
                        data: responseJson.data.orders,
                        // vchrno:responseJson.result.VCHRNO?responseJson.result.VCHRNO:'New'
                    });
                }
                else{
                    this.setState({
                        // showEmptyView: true
                    });
                    alert(responseJson.message);
                }

            })
            .catch((error) => {
                this.setState({
                    showEmptyView: true
                });
                alert('An error occurred');
            })

    };
    signOutAsync = async (navigation) => {
        await AsyncStorage.clear();
        navigation.navigate('Auth');
    };
    toggle(){
        this.props.navigation.toggleDrawer();
    };

    renderEmptyView() {
        if(this.state.showEmptyView) {
            return (
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:24}}>No Items..</Text>
                </View>
            )
        }
        else {
            return<ActivityIndicator size="small" color="#353535" />;
        }
    }



    render() {
        return (
            <Fragment>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor='#1B7ED5'
                />
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    // customMapStyle={MapStyle}
                    // zoomEnabled={false}
                    region={{
                        latitude: 19.6533215,
                        longitude: 71.9412675,
                        latitudeDelta: 10,
                        longitudeDelta: 10,
                    }}
                >
                    <Polyline
                        coordinates={this.state.coordinates}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider

                        strokeWidth={6}
                    />
                    {this.state.data.map((marker, index)  => (
                        <Marker
                            style={{width:'100%',alignItems:'center'}}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude
                            }}
                            title={marker.title}
                            description={marker.description}
                            key={index}
                        >
                            <View style={{position:'absolute',alignItems:'center'}}>
                                <View style={{position:'relative',backgroundColor:'#ff1f00',borderColor:'#fff',borderWidth:2,borderRadius:5}}><Text style={{color:'#fff',padding:4}}>{marker.id}</Text></View>
                                <View style={{position:'absolute',backgroundColor:'#ff1f00',borderColor:'#fff',borderWidth:2,borderRadius:5,width:10,height:10,bottom:-3,alignItems:'center'}}/>
                            </View>
                        </Marker >
                    ))}
                </MapView>
            </Fragment>

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

        marginTop:30,
        alignItems:'center',
    },
    buttonText: {
        justifyContent:'center',
        color: '#fff',
        backgroundColor:'#ff1f77',
        paddingLeft:40,
        paddingRight:40,
        paddingTop:10,
        borderRadius:20,
        paddingBottom:10

    },
    map: {
        flex:1,
        // ...StyleSheet.absoluteFillObject,
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