import * as DataSearchScreens from './components/DataSearch';
import {StyleSheet, Text, View, Image, Dimensions, ScrollView, Alert, AsyncStorage,TouchableOpacity} from 'react-native';
import React from 'react';
import StockAccount from './navTabs/StockAccount'
import SummaryDispatch from './navTabs/SummaryDispatch'
import CurrentStock from './navTabs/CurrentStock'
import MonthlyStockTarget from './navTabs/MonthlyStockTarget'
import { evaluateChildDrawerTitle } from './utils';
import {createStackNavigator} from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons'

const StockAccountTab = createStackNavigator({
    Settings:{
        screen: StockAccount,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerStyle:{backgroundColor: '#f9f9f9',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#2f2f2f", fontWeight:"bold",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Stock Account</Text>,
            headerLeft: <View>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()} >
                    <Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />
                </TouchableOpacity>
            </View>
        })
    },
});
const SummaryDispatchTab = createStackNavigator({
    Settings:{
        screen: SummaryDispatch,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerStyle:{backgroundColor: '#f9f9f9',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#2f2f2f", fontWeight:"bold",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Summary Dispatch</Text>,
            headerLeft: <View>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()} >

                    <Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />
                </TouchableOpacity>
            </View>
        })
    },
});
const CurrentStockTab = createStackNavigator({
    Settings:{
        screen: CurrentStock,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerStyle:{backgroundColor: '#f9f9f9',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#2f2f2f", fontWeight:"bold",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Current Stock</Text>,
            headerLeft: <View>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()} >

                    <Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />
                </TouchableOpacity>
            </View>
        })
    },
});
const MonthlyStockTargetTab = createStackNavigator({
    Settings:{
        screen: MonthlyStockTarget,
        navigationOptions: ({navigation}) => ({
            topBarElevationShadowEnabled: false,
            headerStyle:{backgroundColor: '#f9f9f9',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#2f2f2f", fontWeight:"bold",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Monthly Stock Target</Text>,
            headerLeft: <View>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()} >

                    <Icon name="md-menu" color={"#2f2f2f"} size={24} style={{ padding: 20 }} />
                </TouchableOpacity>
            </View>
        })
    },
});

export default {
    DataSearch_Basic: {
        screen: StockAccountTab,
        navigationOptions: {evaluateChildDrawerTitle,
            drawerLabel:<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Icon name="md-card" size={25} color="#494949" style={{  marginLeft: 15}}/>
                <Text style={{
                paddingTop: 21,
                paddingBottom: 16,
                paddingLeft: 20,
                paddingRight: 10,color:'#494949',fontWeight:'bold'}}>Stock Account</Text>
            </View>},
    },
    asd: {
        screen: SummaryDispatchTab,
        navigationOptions: {evaluateChildDrawerTitle,
            drawerLabel:<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Icon name="md-cube" size={25} color="#494949" style={{  marginLeft: 15}}/>
                <Text style={{
                    paddingTop: 21,
                    paddingBottom: 16,
                    paddingLeft: 20,
                    paddingRight: 10,color:'#494949',fontWeight:'bold'}}>Summary Dispatch</Text>
            </View>},
    },
    zxc: {
        screen: CurrentStockTab,
        navigationOptions: {evaluateChildDrawerTitle,
            drawerLabel:<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Icon name="md-analytics" size={25} color="#494949" style={{  marginLeft: 15}}/>
                <Text style={{
                    paddingTop: 21,
                    paddingBottom: 16,
                    paddingLeft: 20,
                    paddingRight: 10,color:'#494949',fontWeight:'bold'}}>Current Stock</Text>
            </View>},
    },
    'DataSearch_With Icon 2': {
        screen: MonthlyStockTargetTab,
        navigationOptions: {evaluateChildDrawerTitle,
            drawerLabel:<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Icon name="md-contract" size={25} color="#494949" style={{  marginLeft: 15}}/>
                <Text style={{
                    paddingTop: 21,
                    paddingBottom: 16,
                    paddingLeft: 20,
                    paddingRight: 10,color:'#494949',fontWeight:'bold'}}>Monthly Stock Target</Text>
            </View>},
    },

};