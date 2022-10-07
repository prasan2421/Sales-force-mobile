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
    ActivityIndicator, Keyboard, StatusBar
} from 'react-native';

import NumberPicker from '../commons/NumberPicker';
import EmptyCart from '../svg/EmptyCart';
// import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons'
import ErrorText from "../commons/ErrorText";
import SessionHelper from '../commons/SessionHelper';
import Notification from "../commons/Notification";

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
            showEmptyView: false,
            avatarSource:'',
            shopName:'',
            ownerName:'',

            shop:'',
            dataShop:[],
            shopError:'',
            modalVisible: false,
            dataProduct:{},
            product:'',
            qty:'',
            unit:'',
            cartCount:'',
            data:[],
            dataCustomer:[],
            customer:'',
            cart:[]
        }
    }


    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {

            this.loadCart();
            this.checkGeom();
        });



    }
    checkGeom= async () => {
        // const geom = await AsyncStorage.getItem('Geom');
        const id = await AsyncStorage.getItem('Id');

        if(id==''){
            this.setState({

            })
        }
        else{
            this.setState({
                // position:geom,
                shop:id
            },()=>  this.getCustomerFromApi())
        }
    }
    loadCart = () => {

        SessionHelper.getCartJson()
            .then(cartJson => {
                let cart = [];
                let cartCount = '';

                if(cartJson) {
                    try {

                        cart = JSON.parse(cartJson);
                        cartCount = JSON.parse(cartJson).length;
                    }
                    catch(e) {

                    }
                }

                this.setState({
                    showProductList: true,
                    cart,
                    cartCount,
                    showEmptyView: true

                });
                this.props.navigation.setParams({ Count: cartCount });
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
    getCustomerFromApi = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/customers', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {

                    let customer = {};
                    for(item of responseJson.data.customers) {
                        customer[item._id] = item.name;
                    }


                    this.setState({
                        dataCustomer: customer,

                    });

                }
                else{

                    alert(responseJson.message);
                }

            })
            .catch((error) => {

                alert('An error occurred');
            })

    };


    updateCart = (_id, quantity) => {

        SessionHelper.getCartJson()
            .then(cartJson => {
                let cart = [];

                if(cartJson) {
                    try {
                        cart = JSON.parse(cartJson);
                        for(let i = 0; i < cart.length; i++) {
                            if(cart[i]._id == _id) {
                                cart[i].quantity = quantity;
                            }
                        }
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

        let shopa = this.state.shop;

        let shopError = '';
        // alert(this.state.dataCustomer[shopa])

        if(!this.state.dataCustomer[shopa]){
            shopError = 'Please select the shop';
        }

        this.setState({
            shopError: shopError,

        });

        if(shopError) {
            return;
        }
        let abc=this.state.dataCustomer[shopa];
        this.props.navigation.navigate('AddOrderCheckOut',
            {
                Products:this.state.cart,
                Customer:abc,
                CustomerId:shopa
            });
    };
    renderEmptyView() {
        if(this.state.showEmptyView) {
            return (
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                      <EmptyCart style={{width:200,height:200}}/>
                    <Text>NO Items...</Text>
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
                ListEmptyComponent={this.renderEmptyView()}
                data={this.state.cart}
                extraData={this.state.cart}
                keyExtractor={item => '' + item._id}
                renderItem={({item})=>
                    <TouchableHighlight
                        style={{marginTop: 15,width:'100%',}}
                        // onPress={() => this.props.navigation.navigate('NewsDetail',
                        //     {
                        //         ID: item.id,
                        //     }
                        //
                        // )}
                    >
                        <View style={{width:'100%',}}>
                            <View style={{width:'100%',padding:10,backgroundColor:'#ffffff',borderRadius:5,elevation:1}}>
                                <View style={{flexDirection:'row',width:'100%',padding:10,backgroundColor:'#ffffff',alignItems:'center' ,justifyContent:'space-between'}}>
                                    <View  style={{padding:5,width:'50%'}}>
                                        <Text style={{fontSize:14,color:'#000'}}>{item.name}</Text>
                                        <Text style={{fontSize:12,color:'#268ae2'}}>Unit ({item.unit})</Text>

                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:'50%'}}>

                                        <View style={{borderRadius:20,borderWidth:1,borderColor:'#dcdcdc',alignItems:'center',}}>
                                            <NumberPicker
                                                value={item.quantity}
                                                onValueChange={value => this.updateCart(item._id, value)}
                                                style={styles.quantityPicker}
                                                buttonColor='#fff'
                                                iconColor="#DE0452"
                                                textColor='#000'
                                            />

                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                Alert.alert(
                                                    null,
                                                    'Are you sure you want to remove?',
                                                    [
                                                        {text: 'Cancel', onPress: () => {}},
                                                        {text: 'Remove', onPress: () => this.removeFromCart(item._id)}
                                                    ]
                                                );
                                            }} >

                                            <Icon name="md-close-circle-outline" color={"#DE0452"} size={24} style={{ paddingTop: 20,paddingBottom: 20,paddingLeft: 20 }} />
                                        </TouchableOpacity>

                                        {/*<TouchableHighlight onPress={this.addProduct(item)} style={{backgroundColor:'#ff1f77',borderRadius:3}}>*/}
                                        {/*<Text style={{color:'#fff',padding:3}}>Add Order</Text>*/}
                                        {/*</TouchableHighlight>*/}
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
                    <View style={{justifyContent:'space-between',width:'95%',backgroundColor:'#fff',borderRadius:5,elevation:1}}>
                        <Picker
                            selectedValue={this.state.shop}
                            style={{}}
                            enabled={false}
                            onValueChange={(itemValue, label) =>
                                this.setState({shop: itemValue})
                            }>
                            <Picker.Item label="Select a shop .." value="" />
                            {/*{this.state.dataCustomer.map(item => (<Picker.Item key={'' + item._id} label={item.name} value={item._id} />))}*/}
                            {Object.keys(this.state.dataCustomer).map(key => (
                                <Picker.Item key={'' + key}
                                    label={this.state.dataCustomer[key]}
                                    value={key}
                                />
                            ))}
                        </Picker>
                        <ErrorText text={this.state.shopError} />

                    </View>

                </View>

                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>
                    <Text style={{padding:5,fontSize:16,fontWeight: 'bold',color:'#000'}}>Added Products:</Text>
                    <View style={{width:'95%'}}>
                        {this.approvalList()}
                    </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableHighlight

                            onPress={this.state.cartCount>0?this.Submit:null} style={{ backgroundColor:this.state.cartCount>0?'#ff1f77':'#acacac',
                            paddingLeft:40,
                            paddingRight:40,
                            paddingTop:10,
                            borderRadius:20,
                            paddingBottom:10}}>
                            <Text style={styles.buttonText}>Save Order - Next</Text>
                        </TouchableHighlight>
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