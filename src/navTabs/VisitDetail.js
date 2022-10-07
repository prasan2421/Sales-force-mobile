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
            data:[],
            date:this.props.navigation.getParam('date', 0),
            coordinates:[
            ],
            latStart:'21.3320382',
            lngStart:'76.7046275',
            latStartDelta:15,
            lngStartDelta:15,

        }
    }


    componentDidMount() {
// alert(JSON.stringify(this.state.data));return;
        this.getFromAsyncStorage();
    }

    locate(){
        this.setState({
            latStart:this.state.latStart,
            lngStart:this.state.lngStart,
            latStartDelta:1,
            lngStartDelta:1
        })
    }

    getFromAsyncStorage = async () => {
        let date = moment().format("YYYY-MM-D");
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/geolocations/'+this.state.date, {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {
                    let geolocations = responseJson.data.geolocations;
                    this.setState({
                        // showEmptyView: true,
                        data: geolocations,
                        latStart: geolocations.length > 0 ? geolocations[0].latitude : '20.8569167',
                        lngStart: geolocations.length > 0 ? geolocations[0].longitude : '74.9113441',


                        // coordinates:responseJson.data.geolocations,
                        // vchrno:responseJson.result.VCHRNO?responseJson.result.VCHRNO:'New'
                    },()=>this.setState({
                        latStartDelta:1,
                        lngStartDelta:1
                    }));
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
                <TouchableOpacity

                    onPress={()=>this.locate()}
                    style={{position:'absolute',top:10,left:10,zIndex:10,backgroundColor:'#fff',borderRadius:45,width:45,height:45,justifyContent:'center',alignItems:'center'}}>
                    <Icon name="md-locate" color={"#FF2000"} size={40}  />
                </TouchableOpacity>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    // customMapStyle={MapStyle}
                    // zoomEnabled={false}
                    region={{
                        latitude:+this.state.latStart,
                        longitude: +this.state.lngStart,
                        latitudeDelta: this.state.latStartDelta,
                        longitudeDelta: this.state.lngStartDelta,
                    }}

                >
                    {/*<Polyline*/}
                        {/*coordinates={this.state.data}*/}
                        {/*strokeColor="#ff1f00" // fallback for when `strokeColors` is not supported by the map-provider*/}
                        {/*strokeWidth={6}*/}
                    {/*/>*/}

                    {this.state.data.map((marker, index)  => {
                        let color='#ffff32';
                        if(index == 0){
                            color='#ff2000'
                        }
                        else if(index == this.state.data.length - 1){
                            color='#1306ff'
                        }
                        return (

                            <Marker
                                style={{width:'100%',alignItems:'center'}}
                                coordinate={{
                                    latitude: +marker.latitude,
                                    longitude: +marker.longitude
                                }}
                                pinColor={color}
                                title={'Time'}
                                description={marker.mobile_created_at}
                                key={index}
                            >

                            </Marker >
                        )
                    })}
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