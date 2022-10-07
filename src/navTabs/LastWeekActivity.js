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
    Switch,
    TouchableOpacity,
    RefreshControl,
    TouchableHighlight,
    Dimensions,
    Image,
    ActivityIndicator, Keyboard, StatusBar, PermissionsAndroid
} from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
// import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons'

import SessionHelper from "../commons/SessionHelper";
import ErrorText from "../commons/ErrorText";
import moment from "moment";
import Geolocation from "react-native-geolocation-service";

class New extends Component {
    static navigationOptions  = ({ navigation }) => {

        return {
            headerRight: <View>
            </View>
        };



    };
    constructor(props) {
        super(props);
        this.state = {
            refreshing:false,
            showEmptyView: false,
            modalVisible: false,
            customer:'',
            data:[],
            dataCategories:[],
            class:'',
            beat:'',
            switchValue:false,
            shopName:'',
            locations:'',
            dates:[]
        }
    }

    componentDidMount() {
        this.getSevenDaysAttendance();
    }

    getSevenDaysAttendance(){
        let dates = [];

        for(let i=1 ; i<= 7; i++){
            dates.push( moment().subtract(i, 'days'));
        }


        this.setState({
            dates
        })

    }
    showLoader = () => {
        this.setState({ isLoading: true });
    };
    hideLoader = () => {
        this.setState({ isLoading: false });
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

    attendanceList(){

        return(
            <FlatList
                ListEmptyComponent={this.renderEmptyView()}
                data={this.state.dates}

                // extraData={this.state.data}
                keyExtractor={item => '' + item._id}
                renderItem={({item})=> {

                    return (
                        <View>
                            <View
                                style={{marginBottom: 10, marginTop: 1, alignItems: 'center',}}
                            >
                                <TouchableHighlight style={{
                                    flexDirection: 'row',
                                    width: '95%',
                                    backgroundColor: '#ffffff',
                                    elevation: 1,
                                    padding: 10,
                                    borderRadius: 5
                                }}
                                                    onPress={()=>this.props.navigation.navigate('ActivityDetail',
                                                        {
                                                            date:item.format("YYYY-MM-DD")
                                                        })}
                                >
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
                                        <Text style={{color:'#777777',fontSize: 14,fontWeight: 'bold',paddingBottom:10,paddingTop:10}}>{item.format("dddd, MMMM Do YYYY")}</Text>
                                        <Icon name="md-return-right" size={22} color="#777777"/>
                                    </View>



                                </TouchableHighlight>
                            </View>
                        </View>
                    );
                }}
            />
        )

    }

    render() {

        return (
            <ScrollView style={{backgroundColor:'#ebeef3'}}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor='#1B7ED5'
                />

                <View style={{width:'100%',marginTop:10}}>
                    {this.attendanceList()}


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