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
    ActivityIndicator, Keyboard, StatusBar, PermissionsAndroid
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons'
import {images} from "../constants/images";
import moment from "moment";
import RNFetchBlob from "rn-fetch-blob";
const options = {
    title: 'Select QR',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
class New extends Component {


    constructor(props) {
        super(props);
        this.state = {
            avatarSource:'',
            name:'',
            email:'',
            id:this.props.navigation.getParam('ID', 0),
            customer:this.props.navigation.getParam('customer', 0),
            data:[]
        }
    }


    componentDidMount() {

        this.getFromAsyncStorage();
    }

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


    getFromAsyncStorage = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/orders/'+this.state.id, {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {
// alert(JSON.stringify(responseJson));return;
                    this.setState({
                        data: responseJson.data,
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

    requestStoragePermission = async (id,cust) => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message:
                        'Please accept to store the file.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.onDownloadImagePress(id,cust);
            } else {
                console.log('Storage permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
    onDownloadImagePress= async (id,cust)=> {
        const access_token = await AsyncStorage.getItem('access_token');

        const dirs = RNFetchBlob.fs.dirs;
        const android = RNFetchBlob.android;

        RNFetchBlob
            .config({
                // add this option that makes response data to be stored as a file,
                // this is much more performant.

                addAndroidDownloads : {
                    useDownloadManager : true,
                    notification: true,
                    title: cust+'_'+id+'.xlsx',

                    mediaScannable : true,
                    path : `${dirs.DownloadDir}/`+cust+`_`+id+`.xlsx`,
                }

            })
            .fetch('GET', 'http://14.192.18.73/api/orders/'+this.state.id+'/download-excel', {

                'x-auth': access_token

            })
            .then((res) => {
                // the temp file path
                Alert.alert('Success','Downloaded file successfully !')

            })
        // .catch((errorMessage, statusCode) => {
        //     alert(errorMessage)
        // })


    };
    dataList(){

        return(
            <FlatList
                ListEmptyComponent={this.renderEmptyView()}
                data={this.state.data.products}

                // extraData={this.state.showCheckedOnly}
                keyExtractor={item => '' + item._id}
                renderItem={({item})=>
                    <View style={{borderBottomWidth:1,borderColor:'#e6e6e6',padding:10}}>
                        <Text style={{color:'#f9156c',width:150}}>{item.name}</Text>
                        <Text style={{color:'#262626'}}>Quantity: {item.quantity}</Text>
                        <Text style={{color:'#262626'}}>Unit: {item.unit}</Text>
                        <Text style={{color:'#262626'}}>Rate: {item.rate}</Text>
                    </View>}
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
                <View style={{width:'100%',marginBottom:10,marginTop:10,alignItems: 'center'}}>
                    <View style={{position:'relative',width:'95%',flexDirection: 'row',alignItems:'center',justifyContent:'center',backgroundColor:'#fff',padding:20,borderRadius:5}}>
                        <View style={{height:90,width:90,backgroundColor:'#aa3f00',borderRadius:90,justifyContent:'center',borderColor:'#298ade',borderWidth:3,marginRight:20}}>
                            <Image style={{height:84,width:84,backgroundColor:'#aa3f00',borderRadius:84,justifyContent:'center',borderColor:'#f3f7ec',borderWidth:2}}  source={images.face}/>
                        </View>
                        <View>
                        <Text style={{color:'#f9156c',fontSize:16}}>{this.state.data.customer}</Text>
                            {/*<Text style={{color:'#262626',fontSize:12}}>District Sales Manager</Text>*/}
                        </View>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('EditOrder',{
                                ID:this.state.id
                            })}
                            style={{position:'absolute',width:40,height:40,borderRadius:40,backgroundColor:'#1bb601',bottom:-15,right:60,alignItems:'center',justifyContent:'center'}}>
                            <Icon name="md-create" size={22} color="#fff"/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>this.requestStoragePermission(this.state.id,this.state.customer)}
                            style={{position:'absolute',width:40,height:40,borderRadius:40,backgroundColor:'#070db6',bottom:-15,right:10,alignItems:'center',justifyContent:'center'}}>
                        <Icon name="md-download" size={22} color="#fff"/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'95%',marginTop:20,backgroundColor:'#fff',padding:10,borderRadius:5}}>
                        {this.dataList()}
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