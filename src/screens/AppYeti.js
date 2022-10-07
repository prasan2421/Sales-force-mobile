import React from 'react';
import {StatusBar,Platform,StyleSheet, Text, View, Image, Dimensions, ScrollView, Alert, AsyncStorage,TouchableOpacity} from 'react-native';

import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import { DrawerItems, SafeAreaView, } from 'react-navigation';

import Choice from '../navTabs/Choice'
import AddShop from '../navTabs/AddShop'
import AddOrder from '../navTabs/AddOrder'
import Checkin from '../navTabs/Checkin'
import MyActivity from '../navTabs/MyActivity'
import Profile from '../navTabs/Profile'
import Schedule from '../navTabs/Schedule'
import About from '../navTabs/About'
import screenMapping from '../../src/screenMapping';
import MainDrawer from '../drawers/MainDrawer';
import Notification from '../commons/Notification';
import {images} from "../constants/images";
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import ListShop from "../navTabs/ListShop";


// const CustomDrawerContentComponent = (props) => (
//     <ScrollView>
//         <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
//             <View>
//                 <HeaderContents/>
//             </View>
//             <DrawerItems {...props} />
//         </SafeAreaView>
//     </ScrollView>
// );

const HomeTab = createStackNavigator({
    Choice:{
        screen: Choice,
        navigationOptions: ({navigation}) => ({
            headerTransparent: true,
            topBarElevationShadowEnabled: false,
            headerStyle:{
                // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

                backgroundColor: 'transparent',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:16,justifyContent:'center'}}>Dashboard</Text>,

            headerLeft: <View>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()} >

                    <Icon name="md-list" color={"#fff"} size={24} style={{ padding: 20 }} />
                </TouchableOpacity>
            </View>,
            // headerRight:<View>
            //    <Notification
            //        onPress={() => navigation.navigate('AddOrderEnd')}
            //    />
            // </View>

        })
    },


});
const AddShopTab = createStackNavigator({
    AddShop:{
        screen: AddShop,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Add Shop</Text>,
            headerLeft: <View>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()} >

                    <Icon name="md-list" color={"#fff"} size={24} style={{ padding: 20 }} />
                </TouchableOpacity>
            </View>,
            headerRight:<View></View>
        })
    },
});
const ListShopTab = createStackNavigator({
    ListShop:{
        screen: ListShop,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>List Shop</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>
            headerLeft: <View>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()} >

                    <Icon name="md-list" color={"#fff"} size={24} style={{ padding: 20 }} />
                </TouchableOpacity>
            </View>,
            headerRight:<View></View>
        })
    },
});
const AddOrderTab = createStackNavigator({
    AddOrder:{
        screen: AddOrder,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Add Order</Text>,
            headerLeft: <View>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()} >

                    <Icon name="md-list" color={"#fff"} size={24} style={{ padding: 20 }} />
                </TouchableOpacity>
            </View>,
            // headerRight:<View><Notification
            //     onPress={() => navigation.navigate('AddOrderEnd')}
            // /></View>
        })
    },
});
const MyActivityTab = createStackNavigator({
    MyActivity:{
        screen: MyActivity,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>My Activity</Text>,
            headerLeft: <View>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()} >

                    <Icon name="md-list" color={"#fff"} size={24} style={{ padding: 20 }} />
                </TouchableOpacity>
            </View>,
            headerRight:<View></View>
        })
    },
});
const CheckinTab = createStackNavigator({
    Checkin:{
        screen: Checkin,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Check In</Text>,
            headerLeft: <View>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()} >

                    <Icon name="md-list" color={"#fff"} size={24} style={{ padding: 20 }} />
                </TouchableOpacity>
            </View>,
            headerRight:<View></View>
        })
    },
});
const ProfileTab = createStackNavigator({
    Profile:{
        screen: Profile,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerStyle:{
                // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                // height: 56 + Platform.select({'android': StatusBar.currentHeight, 'ios': 0}),
                backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Profile</Text>,
            headerLeft: <View>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()} >

                    <Icon name="md-list" color={"#fff"} size={24} style={{ padding: 20 }} />
                </TouchableOpacity>
            </View>,
            headerRight:<View></View>
        })
    },
});
const ScheduleTab = createStackNavigator({
    Schedule:{
        screen: Schedule,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", fontWeight:"bold",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Schedule</Text>,
            headerLeft: <View>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()} >

                    <Icon name="md-menu" color={"#fff"} size={24} style={{ padding: 20 }} />
                </TouchableOpacity>
            </View>,
            headerRight:<View></View>
        })
    },
});
const AboutTab = createStackNavigator({
    Settings:{
        screen: About,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>About Patanjali</Text>,
            headerLeft: <View>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()} >

                    <Icon name="md-list" color={"#fff"} size={24} style={{ padding: 20 }} />
                </TouchableOpacity>
            </View>,
            headerRight:<View></View>
        })
    },
});

export default createDrawerNavigator({
        Home: {screen: HomeTab},
        AddShop: {screen: AddShopTab},
        AddOrder: {screen: AddOrderTab},
        ListShop: {screen: ListShopTab},
        MyActivity: {screen: MyActivityTab},

        Profile: {screen: ProfileTab},
        Checkin: {screen: CheckinTab},
        Schedule: {screen: ScheduleTab},
        About: {screen: AboutTab},
        ...screenMapping,
},
    {
    contentComponent: MainDrawer /*CustomDrawerContentComponent*/,
        drawerWidth:300
    },

)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header:{
        backgroundColor:'#04009f',
        height:50
    }
})

;
