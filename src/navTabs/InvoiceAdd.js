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
// import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons'
import ErrorText from "../commons/ErrorText";
import SessionHelper from '../commons/SessionHelper';
import Notification from "../commons/Notification";


class New extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showEmptyView: false,
            avatarSource:'',
            shopName:'',
            ownerName:'',
            id:this.props.navigation.getParam('ID', 0),
            shop:'',
            dataShop:[],
            amtError:'',
            modalVisible: false,
            dataProduct:{},
            product:'',
            qty:'',
            unit:'',
            amt:'',
            data:[],
            customer:'',
            products:[]
        }
    }


    componentDidMount() {
        this.getFromAsyncStorage();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.loadAsyncStorage();
        });


    }

    addToAsyncStorage = () => {

        SessionHelper.getCartJsonInvoice(this.state.id)
            .then(cartJson => {
                let cart = [];
                if(cartJson) {
                    try {
                        cart = JSON.parse(cartJson);
                    }
                    catch(e) {
                    }
                }

                for(let item of this.state.products)  {
                    if(item.quantity == 0) {
                        continue;
                    }

                    let index = -1;
                    for(let i = 0; i < cart.length; i++) {
                        if(cart[i]._id == item._id) {
                            index = i;
                            break;
                        }
                    }

                    let product = {
                        _id: item._id,
                        name: item.name,
                        unit: item.unit,
                        orderQuantity: item.orderQuantity,
                        quantity:item.quantity,
                    };

                    if(index == -1) {
                        cart.push(product);

                    }
                    else {
                        cart[index] = product;
                    }
                }


                let newCartJson = JSON.stringify(cart);

                SessionHelper.saveCartJsonInvoice(this.state.id,newCartJson)
                    .then(() => {
                        this.setState({
                            products:cart
                        })

                      // this.loadAsyncStorage();
                        // Alert.alert('Success','Product added to cart');
                        // this.props.navigation.navigate('AddOrderEnd')

                    });
            });
    }
    loadAsyncStorage = () => {

        SessionHelper.getCartJsonInvoice(this.state.id)
            .then(cartJson => {
                let cart = [];
                if(cartJson) {
                    try {
                        cart = JSON.parse(cartJson);
                    }
                    catch(e) {

                    }
                }
                // alert(JSON.stringify(cart));return;

                this.setState({

                    products:cart,

                });

            });
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
                    let products = responseJson.data.products;

                    for(let product of products) {
                        product.orderQuantity = product.quantity;
                        product.quantity = 0;
                    }

                    let cartJson = JSON.stringify(products);

                    SessionHelper.saveCartJsonInvoice(this.state.id,cartJson)
                    .then(() => {
                        this.setState({
                            customer: responseJson.data.customer,
                            products
                        });

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

    showLoader = () => {
        this.setState({ isLoading: true });
    };
    hideLoader = () => {
        this.setState({ isLoading: false });
    };



    removeFromCart = (_id) => {
        SessionHelper.getCartJsonInvoice(this.state.id)
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
                SessionHelper.saveCartJsonInvoice(this.state.id,newCartJson)
                    .then(() => {
                        this.loadAsyncStorage();
                    });
            });
    }
    /*updateCart = (_id, quantity) => {
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
                        // this.loadCart();
                    });
            });
    }*/

    updateCart = (_id, quantity) => {
        let cart = this.state.products.map(item => {
            if(item._id == _id) {
                item.quantity = quantity;
            }
        });

        // alert(JSON.stringify(cart));

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
        let amt = this.state.amt;
        let amtError = '';

        if(amt==""){
            amtError = 'Please enter the amount';
        }

        this.setState({
            amtError: amtError,

        });

        if(amtError) {
            return;
        }
        // alert(JSON.stringify(this.state.products));return;
        this.showLoader();
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/invoices',{
            method:'POST',
            headers:{
                'x-auth': access_token,
                // 'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({

                order_id: this.state.id,
                products: JSON.stringify(this.state.products),
                total_amount:this.state.amt,

            })
        })
            .then((response)=> response.json())


            .then ((responseJson) => {

                if(responseJson.success){
                    Alert.alert('Success','Invoice Added Successfully..')
                    this.hideLoader();
                    this.props.navigation.navigate('TodayActivity');

                }
                else{
                    this.hideLoader();
                    alert(JSON.stringify(responseJson.errors.products));
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
                data={this.state.products}
                extraData={this.state.products}
                keyExtractor={item => '' + item._id}
                renderItem={({item})=>
                    <TouchableHighlight
                        style={{width:'100%',marginBottom:1,marginTop:13}}

                    >
                        <View style={{width:'100%'}}>

                            <View style={{position:'relative',width:'100%',padding:10,backgroundColor:'#ffffff',borderRadius:5,elevation:2}}>
                                <TouchableOpacity
                                    style={{position:'absolute',top:-13,right:0,}}
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

                                    <Icon name="md-close-circle-outline" color={"#DE0452"} size={24} style={{ zIndex:10,}} />
                                </TouchableOpacity>
                                <View style={{flexDirection:'row',width:'100%',padding:5,backgroundColor:'#ffffff',alignItems:'center' ,justifyContent:'space-between'}}>
                                    <View  style={{padding:5,width:'40%'}}>
                                        <Text style={{fontSize:14,color:'#000'}}>{item.name}</Text>
                                        <Text style={{fontSize:12,color:'#268ae2'}}>Unit ({item.unit})</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:'60%'}}>
                                        <View style={{borderRadius:10,marginRight:10,borderWidth:1,borderColor:'#dcdcdc',alignItems:'center',paddingRight: 5,paddingLeft: 5}}>
                                            <Text  style={styles.quantityPicker}>
                                               Ordered Qty:

                                            </Text>
                                            <Text  style={{color:'#000',padding:5,margin:5,width:50,borderWidth:1,borderColor:'#a9a9a9',textAlign: 'center'}}>
                                                {item.orderQuantity}
                                            </Text>

                                        </View>

                                        <View style={{borderRadius:10,borderWidth:1,borderColor:'#dcdcdc',alignItems:'center',}}>
                                            <Text  style={styles.quantityPicker}>
                                                Invoice Qty:

                                            </Text>
                                            <NumberPicker
                                                value={item.quantity}
                                                onValueChange={value => this.updateCart(item._id, value)}
                                                style={styles.quantityPicker}
                                                buttonColor='#fff'
                                                iconColor="#DE0452"
                                                textColor='#000'
                                            />

                                        </View>


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
            <View style={{flex:1}}>
            <ScrollView style={{backgroundColor:'#ebeef3'}}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor='#1B7ED5'
                />
                <View style={{width:'100%',marginBottom:10,marginTop:10,alignItems: 'center'}}>

                    <View style={{padding:5,justifyContent:'space-between',width:'95%',backgroundColor:'#fff',borderRadius:5,elevation:2}}>

                        <Text style={{padding:5,fontWeight:'bold',color:'#0a2dff'}}>Shop:</Text>
                        <Text style={{padding:5,fontWeight:'bold'}}>{this.state.customer}</Text>
                    </View>

                </View>

                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>
                    <Text style={{padding:5,fontSize:16,fontWeight: 'bold',color:'#000'}}>Added Products:</Text>
                    <View style={{width:'95%',marginBottom:1}}>

                        {this.approvalList()}
                    </View>

                    <View style={{width:'95%'}}>
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
                                <View style={{width:'100%',padding:10,backgroundColor:'#ffffff',borderRadius:5,elevation:2}}>
                                    <View style={{flexDirection:'row',width:'100%',padding:10,backgroundColor:'#ffffff',alignItems:'center' ,justifyContent:'space-between'}}>
                                        <View  style={{padding:5}}>

                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                            <Text>Total Amount: </Text>
                                            <View style={{borderWidth:1,borderColor:'#dcdcdc',alignItems:'center',}}>

                                                <TextInput style={{padding:2,width:100}}
                                                    // placeholder="amount"
                                                           keyboardType='numeric'
                                                           returnKeyType='done'
                                                           onSubmitEditing={this.Submit}
                                                           autoCapitalize = 'none'
                                                           underlineColorAndroid='transparent'
                                                           onChangeText={(amt) => this.setState({amt})}/>

                                            </View>

                                        </View>

                                    </View>
                                    <View style={{flexDirection:'row',width:'100%',backgroundColor:'#ffffff',alignItems:'center' ,justifyContent:'flex-end'}}>

                                    <ErrorText style={{padding:10,}} text={this.state.amtError} />
                                    </View>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.buttonWrapper}>
                        <TouchableHighlight onPress={this.Submit} style={{ backgroundColor:'#ff1f77',
                            paddingLeft:40,
                            paddingRight:40,
                            paddingTop:10,
                            borderRadius:20,
                            paddingBottom:10}}>
                            <Text style={styles.buttonText}>Save Invoice</Text>
                        </TouchableHighlight>
                    </View>
                </View>

            </ScrollView>
                <TouchableOpacity style={{position:'absolute',bottom:10,right:10,justifyContent:'center',width:60, height:60,}}
                    onPress={() => {
                        // alert('aaaaa');
                        this.addToAsyncStorage();
                        this.props.navigation.navigate('AddOrderInvoice',{
                            InvoiceId:this.state.id
                        });
                    }}
                >
                    <Icon name="md-add-circle" color={"#333333"} size={60}  />
                </TouchableOpacity>
            </View>
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