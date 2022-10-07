import React, { Component } from 'react';
import {
    Alert,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView, AsyncStorage, Image,
} from 'react-native';
import { DrawerItems } from 'react-navigation';
import MyDrawerItem from '../commons/MyDrawerItem';
import Icon from 'react-native-vector-icons/Ionicons'
import { evaluateOuterDrawerListItems } from '../utils';
import OuterDrawerItem from '../components/OuterDrawerItem';
import DrawerHeader from '../components/DrawerHeader';
import {images} from "../constants/images";
import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";
import moment from "moment";

const styles = StyleSheet.create({
    customDrawerTouch: {
        paddingLeft: 13,
        paddingTop: 15,
    },
    customDrawerIcon: { paddingRight: 10 },
    backButtonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 17,
        paddingLeft: 3,
        borderBottomColor: '#7f7f7f',
        borderBottomWidth: 1,
    },
});

class MainDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainDrawer: true,
            currentComponent: '',
            name:'',
            email:'',
            Attendance:'',
            locations:''
        };
    }
    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.checkAttendanceStart();

        });

        this.getIdFromAsyncStorage()

    }
    getAttendanceStorage = async () => {
        this.setState({
            Attendance:await AsyncStorage.getItem('Attendance')?await AsyncStorage.getItem('Attendance'):'false'
        });

        // alert(await AsyncStorage.getItem('Attendance'))
    }
    saveToAsyncStorage = async (data) => {
        await AsyncStorage.multiSet([
            ['Attendance', data],
        ]);
        this.getAttendanceStorage()
    };
    checkAttendanceStart= async () =>{
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/attendances/punch-status', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {
                    // alert(Json.stringify())
                    if(responseJson.data.status==true) {
                        this.saveToAsyncStorage('true');
                    }
                    else{
                        this.saveToAsyncStorage('false');
                    }
                }
                else{
                    alert(JSON.stringify(responseJson.errors));
                }
            })
            .catch((error) => {

                alert(error);
            })
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
                if(responseJson.success) {
                    if(responseJson.data.status==true) {
                        this.BackgroundLocationPunchOut()
                    }

                    else{
                        this._signOutAsync()
                    }


                }
                else{

                    alert(responseJson.message);
                }

            })
            .catch((error) => {

                alert(error);
            })
    }
    _signOutAsync= async () =>{
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }


    getIdFromAsyncStorage = async () => {
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
                    this.setState({
                        // showEmptyView: true
                    });
                    alert(JSON.stringify(responseJson.errors));
                }

            })
            .catch((error) => {
                this.setState({
                    showEmptyView: true
                });
                // this._signOutAsync();
                alert(error);
            })

    };

    toggleMainDrawer = () =>
        this.setState(prevState => ({ mainDrawer: !prevState.mainDrawer }));

    renderMainDrawerComponents = mainDrawerItems =>
        Object.keys(mainDrawerItems).map(item => (

            <OuterDrawerItem
                key={item}
                label={'Reports'}
                onPress={() => {
                    this.setState({
                        currentComponent: item,
                        mainDrawer: false,
                    });
                }}
            />


        ));

    navigateToCallback = routeName => {
        this.setState({ mainDrawer: true });
        this.props.navigation.navigate(routeName);
    };

    logout=()=>{
        Alert.alert(
            'Confirm',
            'Do you want to Logout from this account ?',
            [
                {text: 'OK', onPress: ()=>this.checkAttendance()},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
        )
    };


    BackgroundLocationPunchOut  = async () =>  {

        const access_token = await AsyncStorage.getItem('access_token');
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 50,
            distanceFilter: 50,
            notificationTitle: 'Background tracking',
            notificationText: 'enabled',
            debug: false,
            startOnBoot: true,
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,

            stopOnStillActivity: false,
            url: 'http://14.192.18.73/api/geolocations',
            httpHeaders: {
                'Content-Type': 'application/json',

                'x-auth':access_token
            },
            // customize post properties
            postTemplate: {
                latitude: '@latitude',
                longitude: '@longitude',
                mobile_created_at:  moment().format("YYYY-MM-DD HH:mm:ss ")

            }
        });
        BackgroundGeolocation.getCurrentLocation(lastLocation => {

            this.setState({ locations: lastLocation},()=> this.SavePunchOut());
            // alert(JSON.stringify(this.state.locations.latitude));
        }, (error) => {
            setTimeout(() => {
                Alert.alert('Error obtaining current location', JSON.stringify(error));
            }, 100);
        });



    }

    SavePunchOut = async() => {


            const access_token = await AsyncStorage.getItem('access_token');
            fetch('http://14.192.18.73/api/attendances/punch-out',{
                method:'POST',
                headers:{
                    'x-auth': access_token,
                    // 'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    time:  moment().format("YYYY-MM-DD HH:mm:ss "),
                    longitude: this.state.locations.longitude,
                    latitude: this.state.locations.latitude,
                })
            })
                .then((response)=> response.json())

                .then ((responseJson) => {

                    if(responseJson.success){
                        // alert('aaaa');return;
                        this._signOutAsync();
                        this.BackgroundLocationStop();
                    }
                    else{
                        // alert('bbb');return;
                        alert(JSON.stringify(responseJson.errors.punch_out));
                    }
                })
                .catch((error) => {

                    alert(error);
                })
                .done();
        }





    BackgroundLocationStop = async() => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
        BackgroundGeolocation.stop();
    }


    render() {

        const { items, ...restProps } = this.props;
        const { mainDrawer, currentComponent } = this.state;
        const { routeName } = this.props.navigation.state.routes[this.props.navigation.state.index];
        // get items objects with unique items and indexes
        const scopedItemsObject = evaluateOuterDrawerListItems(items);

        if (mainDrawer) {


            return (
                <ScrollView style={{flex:1,backgroundColor:'#2e90e9'}}>
                    {/*drawer header*/}
                    <View style={{backgroundColor:'#fff',justifyContent:'center',alignItems:'center',paddingTop:5,paddingBottom:15}}>
                        <Image style={{height:60,width:127,marginBottom:10}}  source={images.logo}/>

                        <View style={{height:90,width:90,backgroundColor:'#aa3f00',borderRadius:90,justifyContent:'center',borderColor:'#298ade',borderWidth:3}}>
                            <Image style={{height:84,width:84,backgroundColor:'#aa3f00',borderRadius:84,justifyContent:'center',borderColor:'#f3f7ec',borderWidth:2}}  source={images.face}/>
                        </View>


                        <View>
                            <Text style={{fontSize:14,color:'#298ade',/*fontWeight:'bold',width:'100%'*/}}>{this.state.name}</Text>

                        </View>
                    </View>
                    <View style={{marginTop:20}}>
                        <MyDrawerItem
                            onPress={() => {
                                this.props.navigation.navigate('Home');
                                this.props.navigation.closeDrawer();
                            }}
                            style={{
                                marginLeft: 20,
                                color: '#fff'}}
                            iconColor={'#fff'}
                            active={routeName == 'Home'}
                            icon="md-home"
                            text="Home"
                        />
                        <MyDrawerItem
                            onPress={() => {
                                if( this.state.Attendance=='true')
                                {
                                    this.props.navigation.navigate('AddShop');
                                    this.props.navigation.closeDrawer()
                                }
                                else return null;

                            }}
                            style={{
                                marginLeft: 20,
                                color:  this.state.Attendance=='true'?'#fff':'#acacac'}}
                            iconColor={this.state.Attendance=='true'?'#fff':'#acacac'}
                            active={routeName == 'AddShop'}
                            text="Add Shop"
                            icon="md-cart"
                        />
                        <MyDrawerItem
                            onPress={() => {
                                if( this.state.Attendance=='true')
                                {
                                    this.props.navigation.navigate('AddOrder');
                                    this.props.navigation.closeDrawer()
                                }
                                else return null;

                            }}

                            style={{
                                marginLeft: 20,
                                color: this.state.Attendance=='true'?'#fff':'#acacac'}}
                            iconColor={this.state.Attendance=='true'?'#fff':'#acacac'}
                            active={routeName == 'AddOrder'}
                            text="Add Order"
                            icon="md-clipboard"
                        />
                        <MyDrawerItem

                            onPress={() => {
                                this.props.navigation.navigate('Checkin');
                                this.props.navigation.closeDrawer();
                            }}
                            style={{
                                marginLeft: 20,
                                color: '#fff'}}
                            iconColor={'#fff'}
                            active={routeName == 'Checkin'}
                            text="Check In"
                            icon="md-checkmark-circle-outline"
                        />
                        <MyDrawerItem
                            onPress={() => {
                                if( this.state.Attendance=='true')
                                {
                                    this.props.navigation.navigate('MyActivity');
                                    this.props.navigation.closeDrawer()
                                }
                                else return null;

                            }}

                            style={{
                                marginLeft: 20,
                                color:this.state.Attendance=='true'?'#fff':'#acacac'}}
                            iconColor={this.state.Attendance=='true'?'#fff':'#acacac'}
                            active={routeName == 'MyActivity'}
                            text="My Activity"
                            icon="md-list-box"
                        />
                        <MyDrawerItem
                            onPress={() => {
                                this.props.navigation.navigate('ListShop');
                                this.props.navigation.closeDrawer();
                            }}
                            style={{
                                marginLeft: 20,
                                color: '#fff'}}
                            iconColor={'#fff'}
                            active={routeName == 'ListShop'}
                            text="Retailer Master"
                            icon="md-pint"
                        />
                        <MyDrawerItem
                            onPress={() => {
                                this.props.navigation.navigate('Profile');
                                this.props.navigation.closeDrawer();
                            }}
                            style={{
                                marginLeft: 20,
                                color: '#fff'}}
                            iconColor={'#fff'}
                            active={routeName == 'Profile'}
                            text="Profile"
                            icon="md-person"
                        />
                        {/*<MyDrawerItem*/}
                            {/*onPress={() => {*/}
                                {/*this.props.navigation.navigate('Schedule');*/}
                                {/*this.props.navigation.closeDrawer();*/}
                            {/*}}*/}
                            {/*active={routeName == 'Schedule'}*/}
                            {/*text="Schedule"*/}
                            {/*icon="md-calendar"*/}
                        {/*/>*/}
                        <MyDrawerItem
                            onPress={() => {
                                this.props.navigation.navigate('About');
                                this.props.navigation.closeDrawer();
                            }}
                            style={{
                                marginLeft: 20,
                                color: '#fff'}}
                            iconColor={'#fff'}
                            active={routeName == 'About'}
                            text="About Patanjali"
                            icon="md-information-circle-outline"
                        />
                        {/*{this.renderMainDrawerComponents(scopedItemsObject)}*/}
                        <MyDrawerItem
                            onPress={()=>this.logout()}
                            style={{
                                marginLeft: 20,
                                color: '#fff'}}
                            iconColor={'#fff'}
                            text="Logout"
                            icon="md-log-out"
                        />
                        <Text style={{paddingLeft: 15,marginTop:20,alignItems:'flex-end'}}>Version : 1.0.1</Text>
                    </View>
                </ScrollView>
            );
        }
        const index = scopedItemsObject[currentComponent];

        const scopedItemsArr = items.slice(index.start, index.end);

        return (
            <ScrollView style={{backgroundColor:'#f5f5f5'}}>
                <View style={{backgroundColor:'rgba(3,155,229 ,1)',height:130,justifyContent:'center',}}>
                    <View  style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                        <View style={{height:70,width:70,backgroundColor:'#aa3f00',borderRadius:70,justifyContent:'center'}}>
                            <Text style={{textAlign:'center',fontSize:22,color:'#e4e4e4',fontWeight:'bold'}}>R</Text>
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontSize:16,color:'#e4e4e4',/*fontWeight:'bold',width:'100%'*/}}>Ripl International</Text>
                            <Text style={{fontSize:12,color:'#aaaaaa'}}>Dillibazar, Kathmandu</Text></View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={this.toggleMainDrawer}
                    style={styles.customDrawerTouch}
                >
                    <View style={styles.backButtonRow}>
                        <Icon name="md-arrow-round-back" size={25} color="#494949"/>
                        <Text style={{ color: '#494949',marginLeft:20 ,fontWeight:'bold'}}>Back</Text>
                    </View>
                </TouchableOpacity>
                <DrawerItems
                    items={scopedItemsArr} {...restProps} />
            </ScrollView>
        );
    }
}

export default MainDrawer;