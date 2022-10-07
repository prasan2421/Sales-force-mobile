import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions, ScrollView, Alert,AsyncStorage,TouchableOpacity} from 'react-native';

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import Bride from '../navTabs/Bride'

import {images} from "../constants/images";
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';

_signOutAsync = async (navigation) => {
    await AsyncStorage.clear();
    navigation.navigate('Auth');
};

const MaterialHeaderButton = props => (
    <HeaderButton {...props} IconComponent={Icon} iconSize={23} color="#ff4b98" />
);



const MainTab2 = createStackNavigator({

    Bride: {
        screen: Bride,
        navigationOptions: ({navigation}) => ({

            topBarElevationShadowEnabled: false,
            headerStyle:{height:90, backgroundColor: '#f9f9f9',
                elevation: 0,
            },
            headerTitle: <Text style={{color:"#ff4b98", fontWeight:"bold",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Choice Estimates</Text>,
            // headerRight: (
            //     <HeaderButtons
            //         HeaderButtonComponent={MaterialHeaderButton}
            //         OverflowIcon={<Icon name="md-more" size={23} color="#ff4b98" style={{paddingLeft:10,paddingRight:10,justifyContent:'center'}} />}
            //         style={{justifyContent:'center'}}
            //     >
            //         <Item title="person" iconName="md-settings" style={{paddingLeft:10,paddingRight:10,justifyContent:'center'}}  onPress={() => navigation.navigate('SettingsBaker')} />
            //         <Item title="Profile" show="never" onPress={() => navigation.navigate('ProfileBaker')} />
            //         <Item title="Settings" show="never" onPress={() => navigation.navigate('SettingsBaker')} />
            //     </HeaderButtons>
            //
            // ),

        })
    },

});



export default createBottomTabNavigator({



    MainTab2: {
        screen: MainTab2,
        navigationOptions: {
            tabBarLabel: 'BRIDE',
            tabBarIcon: ({tintColor}) => (<Image
                source={images.icon4}
                style={{width: 26, height: 26, tintColor: tintColor}}
            />)
        }
    },

}, {
    tabBarOptions: {
        labelStyle: {
            fontSize: 8,
        },
        activeTintColor: '#ff4b98',
        inactiveTintColor: 'grey',
        style: {
            paddingTop:10,
            paddingBottom:10,
            height:60,
            backgroundColor: 'white',
            borderTopWidth: 0,
            shadowOffset: { width: 5, height: 5 },
            shadowColor: 'black',
            shadowOpacity: 0.8,
            shadowRadius:10,
            elevation: 2,
            borderRadius:30,
            marginBottom:10,
            width:"100%",

        },
        navigationOptions: {
            header: {
                visible: true,
            },
        },
    },

})

;
