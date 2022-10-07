import {createStackNavigator,createSwitchNavigator,createAppContainer } from 'react-navigation'
import React, {Component} from 'react';
// import { Box,} from 'react-native-design-utility';

import {Image,Text,View,TouchableOpacity} from 'react-native';

import navTabs from "./AppYeti.js";
import Icon from 'react-native-vector-icons/Ionicons'
import SigninBride from "./SigninBride";
import SignupBride from "./SignupBride";
import PurchaseOrderNext from '../navTabs/PurchaseOrderNext'
import ShopDetail from '../navTabs/ShopDetail'
import Feedback from '../navTabs/Feedback'
import ShopListDetail from '../navTabs/ShopListDetail'
import OrderDetail from '../navTabs/OrderDetail'
import AddShopNext from '../navTabs/AddShopNext'
import ChangePassword from '../navTabs/ChangePassword'
import EditShop from '../navTabs/EditShop'
import OfferNext from '../navTabs/OffersNext'
import AddOrderEnd from '../navTabs/AddOrderEnd'
import EditOrder from '../navTabs/EditOrder'
import InvoiceAdd from '../navTabs/InvoiceAdd'
import InvoiceEdit from '../navTabs/InvoiceEdit'
import InvoiceDetail from '../navTabs/InvoiceDetail'
import AddOrderCheckOut from '../navTabs/AddOrderCheckOut'
import DisplaySaved from '../navTabs/DisplaySaved'
import TargetAchievement from '../navTabs/TargetAchievement'
import Performance from '../navTabs/Performance'
import Attendance from '../navTabs/Attendance'
import AttendanceDayDetail from '../navTabs/AttendanceDayDetail'
import AttendanceList from '../navTabs/AttendanceList'
import ReviewWeeks from '../navTabs/ReviewWeeks'
import ActivityDetail from '../navTabs/ActivityDetail'
import VisitDetail from '../navTabs/VisitDetail'
import TotalVisitedDetail from '../navTabs/TotalVisitedDetail'
import ListOrder from '../navTabs/ListOrder'
import TodayActivity from '../navTabs/TodayActivity'
import TodayVisit from '../navTabs/TodayVisit'
import LastWeekActivity from '../navTabs/LastWeekActivity'
import LastWeekVisit from '../navTabs/LastWeekVisit'
import LastWeekTotalVisited from '../navTabs/LastWeekTotalVisited'
import TotalVisitedShop from '../navTabs/TotalVisitedShop'
import ListOrderDetail from '../navTabs/ListOrderDetail'
import SigninBaker from "./SigninBaker";
import SignupBaker from "./SignupBaker";
import SignupBakerSubmitted from "./SignupBakerSubmitted";
import SignupBrideSubmitted from "./SignupBrideSubmitted";
import LoginScreen from "./LoginScreen";
import ForgotPasswordFirst from "./ForgotPasswordFirst";
import ForgotPasswordSecond from "./ForgotPasswordSecond";
import LoginScreenOtp from "./LoginScreenOtp";
import SelectBeat from '../navTabs/SelectBeat'
import MyVisit from '../navTabs/MyVisit'
import AddOrderNext from '../navTabs/AddOrderNext'
import AddOrderNextProducts from '../navTabs/AddOrderNextProducts'
import AddOrderNextProductsInvoice from '../navTabs/AddOrderNextProductsInvoice'
import AddOrderInvoice from '../navTabs/AddOrderInvoice'
import AddOrderNextInvoice from '../navTabs/AddOrderNextInvoice'
import ListSync from '../navTabs/ListSync'
import ForgotPassword from "./ForgotPassword";
import BakerForm from "./BakerForm";
import BrideForm from "./BrideForm";
import PasswordResetBride from "./PasswordResetBride";
import Notification from '../commons/Notification';
// import Feedback from "../navTabs/Schedule";

const AuthNavigator = createStackNavigator(
    {
        Login: {screen:LoginScreen,
            navigationOptions: {
                header: null,
            }} ,
        LoginScreenOtp: {screen:LoginScreenOtp,
            navigationOptions: {
                header: null,
            }} ,
        ForgotPasswordFirst: {screen:ForgotPasswordFirst,
            navigationOptions: {
                header: null,
            }} ,

        ForgotPasswordSecond: {screen:ForgotPasswordSecond,
            navigationOptions: {
                header: null,
            }} ,
        signupBride: {screen:SignupBride,navigationOptions: {
                topBarElevationShadowEnabled: false,

                headerStyle:{height:90, backgroundColor: '#f9f9f9',
                    elevation: 0,
                }

            }} ,
        signinBride: {screen:SigninBride,navigationOptions: {
                topBarElevationShadowEnabled: false,
                headerStyle:{height:90, backgroundColor: '#f9f9f9',
                    elevation: 0,
                }

            }} ,




        signinBaker: {screen:SigninBaker,navigationOptions: {

                topBarElevationShadowEnabled: false,

                headerStyle:{height:90, backgroundColor: '#f9f9f9',
                    elevation: 0,
                }}
                } ,
        signupBaker: {screen:SignupBaker,navigationOptions: {
                topBarElevationShadowEnabled: false,

                headerStyle:{height:90, backgroundColor: '#f9f9f9',
                    elevation: 0,
                }

            }} ,
        signupBakerSubmitted: {screen:SignupBakerSubmitted,navigationOptions: {
                header: null,
            }} ,
        signupBrideSubmitted: {screen:SignupBrideSubmitted,navigationOptions: {
                header: null,
            }} ,
        BakerForm: {screen:BakerForm,navigationOptions: {
                topBarElevationShadowEnabled: false,
headerTitle:<Text style={{color:'#ff4b98', textAlign:'center'}}>New Baker Application</Text>,
                headerStyle:{height:90, backgroundColor: '#f9f9f9',
                    elevation: 0,
                }

            }} ,
        BrideForm: {screen:BrideForm,navigationOptions: {
                topBarElevationShadowEnabled: false,
                headerTitle:<Text style={{color:'#ff4b98', textAlign:'center'}}>New Bride Application</Text>,
                headerStyle:{height:90, backgroundColor: '#f9f9f9',
                    elevation: 0,
                }
            }} ,
        PasswordResetBride: {screen:PasswordResetBride,navigationOptions: {
                topBarElevationShadowEnabled: false,
                headerTitle:<Text style={{color:'#ff4b98', textAlign:'center'}}>Reset Bride Password</Text>,
                headerStyle:{height:90, backgroundColor: '#f9f9f9',
                    elevation: 0,
                }
            }} ,

    });




const BrideNavigator =  createStackNavigator({

    navTabs: {screen:navTabs,navigationOptions: {
            header: null,
        }
    } ,
    PurchaseOrderNext:{
        screen: PurchaseOrderNext,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerStyle:{backgroundColor: '#f9f9f9',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#2f2f2f", fontWeight:"bold",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>PURCHASE ORDER</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,

        })
    },
    AddShopNext:{
        screen: AddShopNext,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Add Shop</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>
        })
    },
    ChangePassword:{
        screen: ChangePassword,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Change Password</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>
        })
    },
    LastWeekTotalVisited:{
    screen: LastWeekTotalVisited,
        navigationOptions: ({navigation}) => ({
        topBarElevationShadowEnabled: false,
        headerTintColor: 'white',
        headerStyle:{backgroundColor: '#1B7ED5',
            elevation: 0,
        },
        headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Total Visited Last Week</Text>,
        // headerLeft: <View>
        //     {/*<TouchableOpacity*/}
        //         {/*onPress={() => navigation.openDrawer()} >*/}
        //
        //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
        //     {/*</TouchableOpacity>*/}
        // </View>,
        headerRight:<View></View>
    })
},
    TotalVisitedShop:{
    screen: TotalVisitedShop,
        navigationOptions: ({navigation}) => ({
        topBarElevationShadowEnabled: false,
        headerTintColor: 'white',
        headerStyle:{backgroundColor: '#1B7ED5',
            elevation: 0,
        },
        headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Total Visited</Text>,
        // headerLeft: <View>
        //     {/*<TouchableOpacity*/}
        //         {/*onPress={() => navigation.openDrawer()} >*/}
        //
        //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
        //     {/*</TouchableOpacity>*/}
        // </View>,
        headerRight:<View></View>
    })
},
    EditShop:{
        screen: EditShop,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Edit Shop</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>
        })
    },
    Feedback:{
        screen: Feedback,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Feedback</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>
        })
    },
    TodayActivity:{
        screen: TodayActivity,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Today's Order</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>

        })
    },
    ActivityDetail:{
        screen: ActivityDetail,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Order Detail</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>

        })
    },
    VisitDetail:{
        screen: VisitDetail,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Route Map Detail</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>

        })
    },
    TotalVisitedDetail:{
        screen: TotalVisitedDetail,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Total Visited Detail</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>

        })
    },
    TodayVisit:{
        screen: TodayVisit,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Today's Visit</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>

        })
    },
    LastWeekActivity:{
        screen: LastWeekActivity,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Orders From Last Week</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>

        })
    },
    LastWeekVisit:{
        screen: LastWeekVisit,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Visit From Last Week</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>

        })
    },
    ShopDetail:{
        screen: ShopDetail,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Check In</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>
        })
    },
    ShopListDetail:{
        screen: ShopListDetail,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Shop Detail</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>
        })
    },
    OrderDetail:{
        screen: OrderDetail,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Order Detail</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>
        })
    },
    TargetAchievement:{
        screen: TargetAchievement,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Target Achievement</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>
        })
    },
    ReviewWeeks:{
        screen: ReviewWeeks,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Monitoring</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>
        })
    },

    ListSync:{
    screen: ListSync,
        navigationOptions: ({navigation}) => ({
        topBarElevationShadowEnabled: false,
        headerTintColor: 'white',
        headerStyle:{backgroundColor: '#1B7ED5',
            elevation: 0,
        },
        headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>List Orders (Offline)</Text>,
        // headerLeft: <View>
        //     {/*<TouchableOpacity*/}
        //         {/*onPress={() => navigation.openDrawer()} >*/}
        //
        //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
        //     {/*</TouchableOpacity>*/}
        // </View>
        headerRight:<View></View>
    })
},
    AddOrderNext:{
        screen: AddOrderNext,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Add Order</Text>,

            // headerRight:<View></View>
        })
    },
    AddOrderNextProducts:{
        screen: AddOrderNextProducts,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Add Order</Text>,

            // headerRight:<View></View>
        })
    },
    AddOrderNextProductsInvoice:{
        screen: AddOrderNextProductsInvoice,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Product Invoice - Add Order</Text>,

            // headerRight:<View></View>
        })
    },
    AddOrderInvoice:{
        screen: AddOrderInvoice,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Product Invoice - Add Order</Text>,

            // headerRight:<View></View>
        })
    },
    AddOrderNextInvoice:{
        screen: AddOrderNextInvoice,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Product Invoice - Add Order</Text>,

            // headerRight:<View></View>
        })
    },
    AddOrderEnd:{
        screen: AddOrderEnd,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Order List</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>
            // headerRight:<View><Notification/></View>
        })
    },
    EditOrder:{
        screen: EditOrder,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Edit Order</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>
            headerRight:<View></View>
        })
    },
    InvoiceAdd:{
        screen: InvoiceAdd,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Add Invoice</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>
            headerRight:<View></View>
        })
    },
    InvoiceEdit:{
        screen: InvoiceEdit,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Edit Invoice</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>
            headerRight:<View></View>
        })
    },
    InvoiceDetail:{
        screen: InvoiceDetail,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Invoice Detail</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>

        })
    },
    AddOrderCheckOut:{
        screen: AddOrderCheckOut,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Check Out</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>
            headerRight:<View></View>
        })
    },
    SYNC:{
        screen: AddOrderCheckOut,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Check Out</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>
            headerRight:<View></View>
        })
    },
    ListOrder:{
        screen: ListOrder,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>List Order</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>
            headerRight:<View></View>
        })
    },
    ListOrderDetail:{
        screen: ListOrderDetail,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff", width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Order Detail</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>
            headerRight:<View></View>
        })
    },
    OfferNext:{
        screen: OfferNext,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerStyle:{backgroundColor: '#f9f9f9',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#2f2f2f", fontWeight:"bold",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Offer Next</Text>,

        })
    },
    Performance:{
        screen: Performance,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Performance</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>
        })
    },
    SelectBeat:{
        screen: SelectBeat,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Select Beat</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>
        })
    },
    MyVisit:{
        screen: MyVisit,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>My Visit</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,
            headerRight:<View></View>
        })
    },

    DisplaySaved:{
        screen: DisplaySaved,
        navigationOptions: {
            header: null,
        }
    },
    Attendance:{
        screen: Attendance,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Attendance</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,

        })
    },
    AttendanceDayDetail:{
        screen: AttendanceDayDetail,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Attendance</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,

        })
    },
    AttendanceList:{
        screen: AttendanceList,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#1B7ED5',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Attendance List</Text>,
            // headerLeft: <View>
            //     {/*<TouchableOpacity*/}
            //         {/*onPress={() => navigation.openDrawer()} >*/}
            //
            //         {/*<Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />*/}
            //     {/*</TouchableOpacity>*/}
            // </View>,

        })
    },

});

const AppNavigator =  createSwitchNavigator(
    {
        Splash: {
            getScreen: () => require('./SplashScreen').default,

        },
        Auth: AuthNavigator,
        // Baker:BakerNavigator,
        Bride:BrideNavigator


    },{
initialRouteName: 'Splash',
    });
const AppContainer = createAppContainer(AppNavigator);


class Navigation extends React.Component{
    state = {};
    render(){
        return <AppContainer/>
    }
}

export default Navigation;