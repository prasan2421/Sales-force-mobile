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
    PermissionsAndroid,
    Modal,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    TouchableHighlight,
    Dimensions,
    Image,
    ActivityIndicator, Keyboard, StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

import SessionHelper from '../commons/SessionHelper';

import NetInfo from "@react-native-community/netinfo";
import RNFetchBlob from "rn-fetch-blob";
class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEmptyView: false,
            avatarSource:'',
            shopName:'',
            ownerName:'',
            shop:this.props.navigation.getParam('Customer', ''),
            shopId:this.props.navigation.getParam('CustomerId', ''),
            dataShop:[],
            shopError:'',
            modalVisible: false,
            dataProduct:{},
            product:'',
            qty:'',
            network:'',
            unit:'',
            data:[],
            dataCustomer:[],
            customer:'',
            cart:[this.props.navigation.getParam('Products', '')]
        }
    }

    componentDidMount() {
        this.networkStatus();
    }

    networkStatus = () =>{
        NetInfo.fetch().then(state => {
            if(state.isConnected){
                this.setState({
                    network:true,
                });
                this.loadCart();
            }
            else{
                this.loadCart();
            }

        });


    }


    loadCart = () => {
        SessionHelper.getCartJson()
            .then(cartJson => {
                let cart = [];
                // let total = 0;

                if(cartJson) {
                    try {
                        cart = JSON.parse(cartJson);

                    }
                    catch(e) {

                    }
                }
                // alert(JSON.stringify(cart));return;

                this.setState({
                    showProductList: true,
                    cart,
                    // total
                });
            });
    }

    showLoader = () => {
        this.setState({ isLoading: true });
    };
    hideLoader = () => {
        this.setState({ isLoading: false });
    };
    removeFromCart = (_id) => {
        SessionHelper.getCartJson()
            .then(cartJson => {
                let cart = [];

                if(cartJson) {
                    try {
                        cart = JSON.parse(cartJson);
                        cart = cart.filter(item => item._id != _id);
                    }
                    catch(e) {

                    }
                }

                let newCartJson = JSON.stringify(cart);
                SessionHelper.saveCartJson(newCartJson)
                    .then(() => {
                        this.loadCart();
                    });
            });
    }

    onDownloadImagePress= async (id)=> {
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
                    title: 'PatanjaliOrders.xlsx',

                    mediaScannable : true,
                    path : `${dirs.DownloadDir}/PatanjaliOrders.xlsx`,
                }

            })
            .fetch('GET', 'http://14.192.18.73/api/orders/'+id+'/download-excel', {

                    'x-auth': access_token

            })
            .then((res) => {
                // the temp file path
                android.actionViewIntent(`${dirs.DownloadDir}/PatanjaliOrders.xlsx`)
            })
        // .catch((errorMessage, statusCode) => {
        //     alert(errorMessage)
        // })


    };
    mail= async (id)=> {
        const access_token = await AsyncStorage.getItem('access_token');

        fetch('http://14.192.18.73/api/orders/'+id+'/send-email-excel', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {

                }
                else{
                    alert(responseJson.message);
                }

            })
            .catch((error) => {

                alert('An error occurred');
            })

    };


    EmptyCart(){
        SessionHelper.removeCartJson();
    }

    signOutAsync = async (navigation) => {
        await AsyncStorage.clear();
        navigation.navigate('Auth');
    };
    toggle(){
        this.props.navigation.toggleDrawer();
    };
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    Submit = async() => {

        this.showLoader();
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/orders',{
            method:'POST',
            headers:{
                'x-auth': access_token,
                // 'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                customer_id: this.state.shopId,
                products: JSON.stringify(this.state.cart),

            })
        })
            .then((response)=> response.json())
            .then ((responseJson) => {
                if(responseJson.success){
                    this.hideLoader();
                    this.props.navigation.navigate('DisplaySaved');
                    this.mail(responseJson.data._id);
                    // Alert.alert('Success','Order placed successfully.')
                    this.EmptyCart();
                    this.setState({
                        data: [],
                    });
                }
                else{
                    this.hideLoader();
                    alert(JSON.stringify(responseJson.errors));
                }
            })
            .catch((error) => {
                this.hideLoader();
                alert('An error occurred');
            })
            .done();

    };
    saveOffline = () => {
        // SessionHelper.removeCartOfflineJson();return;
        SessionHelper.getCartJsonOffline()
            .then(cartJsonOffline => {
                let data=[];
                if(cartJsonOffline) {
                    // alert(cartJsonOffline);return;
                    try {
                        data = JSON.parse(cartJsonOffline);
                    }
                    catch(e) {
                    }
                }
                // alert(JSON.stringify(cart));return;
                    data.push({
                        data:this.state.cart,
                        shop:this.state.shop,
                        id:this.state.shopId
                    });
                    // data[this.state.shopId] = {data:this.state.cart,shop:this.state.shop};

                // alert(JSON.stringify(data));return;
                let newCartJson = JSON.stringify(data);
                // alert(newCartJson);return;
                SessionHelper.saveCartJsonOffline(newCartJson)
                    .then(() => {
                        SessionHelper.removeCartJson();
                        // this.loadCart();
                        alert('Product added to cart offline');

                    });
            });
    }
    Submit1 = async() => {
        let shop = this.state.shop;
        let shopError = '';

        if(shop==""){
            shopError = 'Please select the shop';
        }

        this.setState({
            shopError: shopError,

        });

        if(shopError) {
            return;
        }
        // alert(JSON.stringify(this.state.cart));return;
        this.showLoader();
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/orders',{
            method:'POST',
            headers:{
                'x-auth': access_token,
                // 'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                customer_id: this.state.shopId,
                products: JSON.stringify(this.state.cart),

            })
        })
            .then((response)=> response.json())


            .then ((responseJson) => {

                if(responseJson.success){
                    this.hideLoader();
                    this.props.navigation.navigate('DisplaySaved');

                    // Alert.alert('Success','Order placed successfully.')
                    this.EmptyCart();
                    this.setState({
                        data: [],
                    });
                }
                else{
                    this.hideLoader();
                    alert(JSON.stringify(responseJson.errors));
                }
            })
            .catch((error) => {
                this.hideLoader();
                alert('An error occurred');
            })
            .done();

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



    approvalList(){
        return(
            <FlatList
                data={this.state.cart}
                extraData={this.state.cart}
                keyExtractor={item => '' + item.id}
                renderItem={({item})=>
                    <TouchableHighlight
                        style={{marginTop: 15,width:'100%',padding:10,backgroundColor:'#ffffff',borderRadius:5,elevation:1}}

                    >
                        <View style={{width:'100%',}}>
                            <View style={{width:'100%',}}>
                                <View style={{flexDirection:'row',width:'100%',padding:10,backgroundColor:'#ffffff',alignItems:'center' ,justifyContent:'space-between'}}>
                                    <View  style={{padding:5,width:'70%',}}>
                                        <Text style={{fontSize:14,color:'#000'}}>{item.name}</Text>
                                        <Text style={{fontSize:12,color:'#268ae2'}}>Unit ({item.unit})</Text>
                                    </View>
                                    <View style={{width:'30%',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                        <View style={{borderWidth:1,alignItems:'center',padding:7,borderColor:'#9a9a9a'}}>
                                            <Text>QTY: {item.quantity}</Text>
                                        </View>
                                    </View>
                                </View>

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


                <View style={{width:'100%',marginBottom:10,marginTop:10,alignItems: 'center'}}>
                    <View style={{justifyContent:'space-between',width:'90%',backgroundColor:'#fff',padding:5,borderRadius:5,elevation:1}}>

                      <Text style={{fontWeight:'bold'}}>Shop:</Text>
                        <Text style={{fontSize:16,fontWeight:'bold',color:'#268ae2',marginTop:5}}>{this.state.shop}</Text>
                    </View>

                </View>

                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>
                    <Text style={{padding:5,fontSize:16,fontWeight: 'bold',color:'#000'}}>Added Products:</Text>
                    <View style={{width:'90%'}}>

                        {this.approvalList()}
                    </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableHighlight onPress={this.saveOffline}
                                            style={{ backgroundColor:this.state.network==true?'#ff1f77':'#ff8400',
                                                padding:10,
                                                borderRadius:20,
                                            }}>
                            <Text style={styles.buttonText}>Save(Offline)</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.state.network==true?this.Submit:this.saveOffline}
                         style={{ backgroundColor:this.state.network==true?'#ff1f77':'#ff8400',
                          padding:10,
                            borderRadius:20,
                           }}>
                            <Text style={styles.buttonText}>{this.state.network==true?'Save & Send Mail':'Save & Send Mail (Offline)'}</Text>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={this.state.network==true?this.Submit1:this.saveOffline} style={{ backgroundColor:this.state.network==true?'#ff1f77':'#ff8400',
                            marginLeft:10,
                            padding:10,
                            borderRadius:20,
                        }}>
                            <Text style={styles.buttonText}>{this.state.network==true?'Save Order':'Save Order (Offline)'}</Text>
                        </TouchableHighlight>

                        {/*<TouchableHighlight onPress={this.checkOut} style={{ backgroundColor:'#ff1f77',*/}
                            {/*marginLeft:10,*/}
                            {/*marginRight:10,*/}
                            {/*borderRadius:20,*/}
                            {/*padding:7,}}>*/}
                            {/*<Text style={styles.buttonText}>Check Out - Save</Text>*/}
                        {/*</TouchableHighlight>*/}

                        {/*<TouchableHighlight onPress={this.requestStoragePermission} style={{ backgroundColor:'#ff1f77',*/}

                            {/*borderRadius:20,*/}
                            {/*padding:7,}}>*/}
                            {/*<Text style={styles.buttonText}>Download File</Text>*/}
                        {/*</TouchableHighlight>*/}

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
        flexDirection:'row',
        marginTop:20,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText: {
        color: '#fff',
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