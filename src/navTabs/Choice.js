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
    ImageBackground,
    RefreshControl,
    TouchableHighlight,
    Dimensions,
    Image,
    ActivityIndicator, Keyboard, StatusBar
} from 'react-native';
import {PermissionsAndroid} from 'react-native';

import Swiper from 'react-native-swiper';
import {images} from "../constants/images";
import Icon from "react-native-vector-icons/Ionicons";
import Notification from "../commons/Notification";
import SessionHelper from "../commons/SessionHelper";
import NetInfo from "@react-native-community/netinfo";
class New extends Component {

    static navigationOptions  = ({ navigation }) => {
        if(navigation.getParam('Count')){
            return {
                headerRight: <View>
                    <TouchableOpacity onPress={() => navigation.navigate('AddOrderEnd')}
                                      style={{padding: 3, marginRight: 10, flexDirection: 'row'}}>
                        <Notification
                            cart={navigation.getParam('Count')}
                            // ref={passwordRef => this.passwordRef = passwordRef}
                        />
                        <Icon name="md-cart" size={24} color="#fff"/>
                    </TouchableOpacity></View>
            };
        }
        else return{
            headerRight: <View>
                <TouchableOpacity onPress={() => navigation.navigate('AddOrderEnd')}
                                  style={{padding: 3, marginRight: 10, flexDirection: 'row'}}>
                    <Icon name="md-cart" size={24} color="#fff"/>
                </TouchableOpacity></View>
        };

    };


    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            async:false,
            dataLength:'',
            Attendance:'',
            TotalAchievement:'',
        }
    }


    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.checkAttendance();
            this.getTotalAchievement();

        });
        // this.getAttendanceStorage();
        this.networkStatus();


    }
    checkAttendance= async () =>{
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/attendances/punch-status', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // alert(JSON.stringify(responseJson));
                if(responseJson.success) {
                    // alert(Json.stringify())
                    if(responseJson.data.status==true) {
                        this.getAttendanceStorage('true');
                    }
                    else{
                        this.getAttendanceStorage('false');
                    }

                }
                else{
                    // alert(responseJson.errors.token);
                    if(responseJson.errors.token == "token_invalid"){
                        alert(responseJson.errors.token);
                        this.signOutAsync();
                    }
                    else{
                        alert(JSON.stringify(responseJson.errors));
                    }

                }

            })
            .catch((error) => {

                alert(error);
            })
    }
    getTotalAchievement = async () => {

        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/performances/total-achievements', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {
// alert(JSON.stringify(responseJson));
                    this.setState({
                        // showEmptyView: true,
                        TotalAchievement: responseJson.data.total_achievements,

                    });
                }
                else{
                    if(responseJson.errors.token == "token_invalid"){
                        alert(responseJson.errors.token);
                        this.signOutAsync();
                    }
                    else{
                        alert(JSON.stringify(responseJson.errors));
                    }

                }

            })
            .catch((error) => {
                this.setState({
                    showEmptyView: true
                });
                alert(error);
            })

    };
    checkAsync(){
        SessionHelper.getCartJsonOffline()
            .then(cartJsonOffline => {
                if (cartJsonOffline) {
                    this.setState({
                        async : true,
                    })
                }
            })
    }
    networkStatus = () =>{
        NetInfo.fetch().then(state => {
            if(state.isConnected){
                this.focusListener = this.props.navigation.addListener('didFocus', () => {
                    this.loadCart();
                    this.checkAsync();
                });

                this.getFromAsyncStorage();
                this.getCategoriesFromApi()
            }
            else{
                alert('No Internet Connection:')
            }

            // console.log("Connection type", state.type);
            // console.log("Is connected?", state.isConnected);
        });


    }

        getCategoriesFromApi = async () => {

        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/verticals', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {
// alert(JSON.stringify(responseJson));
                    this.setState({
                        // showEmptyView: true,
                        dataLength: responseJson.data.verticals.length,
                        // vchrno:responseJson.result.VCHRNO?responseJson.result.VCHRNO:'New'
                    });
                }
                else{
                    if(responseJson.errors.token == "token_invalid"){
                        alert(responseJson.errors.token);
                        this.signOutAsync();
                    }
                    else{
                        alert(JSON.stringify(responseJson.errors));
                    }
                }

            })
            .catch((error) => {

                alert(error);
            })

    };
    loadCart = () => {
        // this.props.navigation.setParams({ Count: 15 });return;
        SessionHelper.getCartJson()
            .then(cartJson => {
                let cart = '';
                // let total = 0;

                if(cartJson) {
                    try {
                        cart = JSON.parse(cartJson).length;
                    }
                    catch(e) {
                    }
                }
                // this.setState({
                //     count:cart
                // });
                this.props.navigation.setParams({ Count: cart });
            });
    }
    getAttendanceStorage = async (data) => {
        this.setState({
            Attendance:data
        });

        // alert(await AsyncStorage.getItem('Attendance'))
    }

    getFromAsyncStorage = async () => {

        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/users/profile', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {

                    this.setState({
                        // showEmptyView: true,
                        name: responseJson.data.name,
                        email: responseJson.data.email,
                        // vchrno:responseJson.result.VCHRNO?responseJson.result.VCHRNO:'New'
                    });
                }
                else{
                    if(responseJson.errors.token == "token_invalid"){
                        alert(responseJson.errors.token);
                        this.signOutAsync();
                    }
                    else{
                        alert(JSON.stringify(responseJson.errors));
                    }
                }

            })
            .catch((error) => {
                this.setState({
                    showEmptyView: true
                });
                alert(error);
            })

    };

    signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');

    };
    toggle(){
        this.props.navigation.toggleDrawer();
    };


    render() {
        const width = Dimensions.get('window').width;
        return (
            <ScrollView style={{flex:1,backgroundColor:'#ebeef3'}}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor='#1B7ED5'
                />

                <ImageBackground  style={{justifyContent:'center',alignItems:'center',paddingTop:5,paddingBottom:15,height:250}} source={images.blue}>


                    <View style={{marginTop:30,height:90,width:90,backgroundColor:'#aa3f00',borderRadius:90,justifyContent:'center',borderColor:'#298ade',borderWidth:3}}>
                        <Image style={{height:84,width:84,backgroundColor:'#aa3f00',borderRadius:84,justifyContent:'center',borderColor:'#f3f7ec',borderWidth:2}}  source={images.face}/>
                    </View>

                    <View style={{marginBottom:10}}>
                        <Text style={{fontSize:14,color:'#f1e4a3',/*fontWeight:'bold',width:'100%'*/}}>{this.state.name}</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <View style={{paddingLeft:10,paddingBottom:10}}><Text style={{fontSize:14,color:'#fff',}}>Allocated Vertical : <Text style={{fontSize:22,color:'#fff',fontWeight:'bold'}}>{this.state.dataLength}</Text></Text>
                            </View>
                    </View>

                </ImageBackground>
                <View style={{flex:2,width:'100%',alignItems:'center',marginBottom:20}}>
                    <View
                        showsVerticalScrollIndicator={false}
                        style={{width:'85%',}}>

                    <View style={{flexDirection:'row', marginTop:20,marginBottom:20}}>
                        <View style={{width:'50%',alignItems: 'center'}}>
                            <View style={{
                                width:'100%',
                                marginRight:10,
                                backgroundColor:'#ff1f77',
                                paddingTop:10,
                                paddingBottom:10,
                                paddingLeft:20,
                                paddingRight:20,
                                borderRadius:30,
                                alignItems:'center'
                            }}
                            >
                                <View style={{alignItems:'center'}}>

                                    <Text style={styles.Text}>Total Target : </Text>
                                    <Text style={styles.Text}>xx</Text>
                                </View>
                            </View>

                        </View>
                        <View style={{width:'50%',alignItems: 'center', }}>
                            <View style={{
                                width:'100%',
                                marginLeft:10,
                                backgroundColor:'#ff1f77',
                                paddingTop:10,
                                paddingBottom:10,
                                paddingLeft:10,
                                paddingRight:10,
                                borderRadius:30,
                                alignItems:'center'
                            }} >
                                <View style={{alignItems:'center'}}>

                                    <Text style={styles.Text}>Total Achievement : </Text>
                                    <Text style={styles.Text}>{this.state.TotalAchievement}</Text>
                                </View>
                            </View>
                        </View>
                        {/*<View style={{flex:1, alignItems: 'center'}}>*/}
                            {/*<TouchableHighlight style={styles.Button} onPress={()=>this.props.navigation.navigate('DisplaySaved')}>*/}
                                {/*<View style={{flexDirection:'row',alignItems:'center'}}>*/}
                                    {/*<Icon name="md-add" size={22} color="#fff"/>*/}
                                    {/*<Text style={styles.Text}>Display Save</Text>*/}
                                {/*</View>*/}
                            {/*</TouchableHighlight>*/}
                        {/*</View>*/}
                    </View>
                        <View style={{

                            flexDirection:'row',
                            marginBottom:20
                        }}>
                            <TouchableHighlight
                                underlayColor={'#c3c3c3'}
                                onPress={this.state.Attendance=='true'?()=>this.props.navigation.navigate('MyVisit'):null}
                                style={{
                                elevation:2,
                                backgroundColor:this.state.Attendance=='true'?'#ffffff':'#acacac',
                                shadowOpacity: 0.1,
                                width:'100%',
                                borderRadius:3,
                                flexDirection:'row',
                                flex:1,

                                marginRight:10
                            }}>
                                <View style={{flex:1,paddingTop:20,paddingLeft:20,paddingRight:20,paddingBottom:5,alignItems:'center',justifyContent:'center'}}>
                                    <Image style={{width:60,height:60}}  source={images.icon1}/>
                                    <Text style={{
                                        color:this.state.Attendance=='true'?'#1b1b1b':'#fff',
                                        paddingTop:10,
                                        paddingBottom:10,
                                        textAlign:'center'}}>My Visit</Text>


                                </View>

                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor={'#c3c3c3'}
                                onPress={this.state.Attendance=='true'?()=>this.props.navigation.navigate('MyActivity'):null}
                                style={{
                                elevation:2,
                                backgroundColor:this.state.Attendance=='true'?'#ffffff':'#acacac',
                                shadowOpacity: 0.1,
                                width:'100%',
                                borderRadius:3,
                                flexDirection:'row',
                                marginLeft:10,
                                flex:1
                            }}>
                                <View style={{flex:1,paddingTop:20,paddingLeft:20,paddingRight:20,paddingBottom:5,alignItems:'center',justifyContent:'center'}}>
                                    <Image style={{width:60,height:60}}  source={images.icon2}/>
                                    <Text style={{color:this.state.Attendance=='true'?'#1b1b1b':'#fff',
                                        paddingTop:10,
                                        paddingBottom:10,
                                        textAlign:'center'}}>My Activity</Text>


                                </View>

                            </TouchableHighlight>
                        </View>
                        <View style={{
                            flexDirection:'row'
                        }}>
                            <TouchableHighlight
                                underlayColor={'#c3c3c3'}
                                onPress={()=>this.props.navigation.navigate('Performance')}
                                style={{
                                elevation:2,
                                backgroundColor:'#ffffff',
                                shadowOpacity: 0.1,
                                width:'100%',
                                borderRadius:3,
                                flexDirection:'row',
                                flex:1,

                                marginRight:10
                            }}>
                                <View style={{flex:1,paddingTop:20,paddingLeft:20,paddingRight:20,paddingBottom:5,alignItems:'center',justifyContent:'center'}}>
                                    <Image style={{width:60,height:60}}  source={images.icon3}/>
                                    <Text style={styles.iconText}>Performance</Text>


                                </View>

                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor={'#c3c3c3'}
                                onPress={()=>this.props.navigation.navigate('Attendance')}
                                style={{
                                elevation:2,
                                backgroundColor:'#ffffff',
                                shadowOpacity: 0.1,
                                width:'100%',
                                borderRadius:3,
                                flexDirection:'row',
                                marginLeft:10,
                                flex:1
                            }}>
                                <View style={{flex:1,paddingTop:20,paddingLeft:20,paddingRight:20,paddingBottom:5,alignItems:'center',justifyContent:'center'}}>
                                    <Image style={{width:80,height:60}}  source={images.icon4}/>
                                    <Text style={styles.iconText}>Attendance Column</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
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
    slide:{
        flex: 1,
    },

    Text: {
        fontWeight:'bold',
        fontSize:12,
        marginLeft:5,
        color: 'white',
        justifyContent:'center',
        alignItems:'center'
    },
    iconText:{

        paddingTop:10,
        paddingBottom:10,
        textAlign:'center'
    },

    map: {
        flex:1,
    },

});