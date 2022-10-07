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
import moment from 'moment';
import {images} from "../constants/images";
const options = {
    title: 'Select QR',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
import RNFetchBlob from "rn-fetch-blob";
import ActivityIcon from "../commons/ActivityIcon";
class New extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            showEmptyView: false,
            name:'',
            email:'',
            id:'',
            data:[]
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {

            this.getFromAsyncStorage();

        });

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
                        showEmptyView: true,
                        data: responseJson.data.orders,
                                               // vchrno:responseJson.result.VCHRNO?responseJson.result.VCHRNO:'New'
                    });
                }
                else{
                    this.setState({
                        showEmptyView: true
                    });
                    alert(responseJson.message);
                }

            })
            .catch((error) => {

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
    showLoader = () => {
        this.setState({ isLoading: true });
    };
    hideLoader = () => {
        this.setState({ isLoading: false });
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
            .fetch('GET', 'http://14.192.18.73/api/orders/'+id+'/download-excel', {
                'x-auth': access_token
            })
            .then((res) => {
                // the temp file path
                Alert.alert('Success','Downloaded file successfully !')
                // android.actionViewIntent(`${dirs.DownloadDir}/`+id+`_`+cust+`.xlsx`)
            })
        // .catch((errorMessage, statusCode) => {
        //     alert(errorMessage)
        // })
    };
    removeOrder = async(id) => {
        // this.showLoader();
        const access_token = await AsyncStorage.getItem('access_token');
        // alert(access_token);return;
        fetch('http://14.192.18.73/api/orders/'+id,{
            method:'POST',
            headers:{
                'x-auth': access_token,
                // 'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                _method: 'DELETE'
            })
        })
            // .then(response => response.text())
            // .then(text => alert(text))
            .then((response)=> response.json())


            .then ((responseJson) => {

                if(responseJson.success){
                    this.hideLoader();
                    this.props.navigation.goBack();

                    Alert.alert('Success','Order deleted successfully.')
                    this.getFromAsyncStorage();
                }
                else{
                    this.hideLoader();
                    alert(JSON.stringify(responseJson.errors));
                }
            })
            .catch((error) => {
                this.hideLoader();
                // console.error(error)
                alert('An error occurred');
            })
            .done();

    }
    delete(invoice_id,id){
        if(invoice_id!=''){
            return null;
        }
        else{
            return(
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            null,
                            'Are you sure you want to delete?',
                            [
                                {text: 'Cancel', onPress: () => {}},
                                {text: 'Delete', onPress: () => this.removeOrder(id)}
                            ]
                        );
                    }}
                    style={{backgroundColor:'#ff2000',padding:5,borderRadius:5,marginRight:10}}><Text style={{color:'#fff',fontSize:12}}>Delete</Text>
                </TouchableOpacity>
            )
        }

    }

    dataList(){
        return(
            <FlatList
                ListEmptyComponent={this.renderEmptyView()}
                data={this.state.data}

                // extraData={this.state.showCheckedOnly}
                keyExtractor={item => '' + item._id}
                renderItem={({item})=>
                    <TouchableHighlight
                        style={{width:'100%',backgroundColor:'#fff',padding:10,borderRadius:5,elevation:2,marginBottom:5,justifyContent:'center'}}

                    >
                        <View style={{width:'100%',justifyContent:'center'}}>

                            <View style={{padding:10}}>
                                <Text style={{color:'#f9156c'}}>{item.customer}</Text>
                                {/*<Text style={{}}>{moment(item.created_at).format("MM Do YYYY")}</Text>*/}
                            </View>
                            <View style={{paddingLeft:10,paddingBottom:10,flexDirection:'row'}}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('OrderDetail',
                                        {
                                            ID: item._id,
                                            customer: item.customer
                                        }
                                    )}
                                    style={{backgroundColor:'#00daff',padding:5,borderRadius:5,marginRight:10}}><Text style={{color:'#fff',fontSize:12}}>Detail</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>this.props.navigation.navigate('EditOrder',{
                                        ID:item._id
                                    })}
                                    style={{backgroundColor:'#0a2dff',padding:5,borderRadius:5,marginRight:10}}><Text style={{color:'#fff',fontSize:12}}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>this.requestStoragePermission(item._id,item.customer)}
                                    style={{backgroundColor:'#2aab10',padding:5,borderRadius:5,marginRight:10}}><Text style={{color:'#fff',fontSize:12}}>Download</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>item.invoice_id==''?this.props.navigation.navigate('InvoiceAdd',{
                                        ID:item._id
                                    }):this.props.navigation.navigate('InvoiceDetail',{
                                        ID:item._id,
                                        INVOICEID:item.invoice_id
                                    })}
                                    style={{backgroundColor:item.invoice_id==''?'#ffc504':'#ff8400',padding:5,borderRadius:5,marginRight:10}}><Text style={{color:'#fff',fontSize:12}}>{item.invoice_id==''?'Add Invoice':'Invoice Detail'}</Text>
                                </TouchableOpacity>
                                {this.delete(item.invoice_id,item._id)}

                            </View>
                        </View>
                    </TouchableHighlight>}
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
                <ActivityIcon visible={this.state.isLoading}
                              indicatorColor={'#333333'}
                              messageColor={'#afafaf'}
                              message='Please wait, Deleting order...'
                />
                <View style={{width:'100%',alignItems: 'center'}}>
                    <View style={{width:'95%',justifyContent:'center',paddingTop:10,marginBottom: 10}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon name="md-list-box" size={28} color="#000"/>
                        <Text style={{color:'#f9156c',fontSize:16,marginLeft:10,fontWeight: 'bold'}}>Orders Taken ( {moment().format("dddd, MMMM Do YYYY")})</Text>
                        </View>
                    </View>
                    <View style={{width:'95%',justifyContent:'center'}}>
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