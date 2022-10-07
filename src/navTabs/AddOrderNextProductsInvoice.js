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
// import ImagePicker from 'react-native-image-picker';
import SessionHelper from '../commons/SessionHelper';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons'
import NumberPicker from '../commons/NumberPicker';
import {images} from "../constants/images";
import ErrorText from "../commons/ErrorText";
import Notification from "../commons/Notification";

class MyListItem extends React.PureComponent {
    render() {
        let item = this.props.item;
        return (
            <View>
                <View
                    style={{flexDirection:'row',marginTop: 5,width:'100%',borderRadius:5}}
                    // onPress={()=>this.props.navigation.navigate('AddOrderNext')}
                >
                    <View style={{width:'100%',}}>
                        <View style={{flexDirection:'row',width:'100%',padding:10,backgroundColor:item.is_featured?'#5ee6a3':'#ffffff',alignItems:'center' ,justifyContent:'space-between',borderRadius:5,elevation: 2}}>
                            <View  style={{padding:5,width:'60%'}}>
                                <Text style={{fontSize:14,color:item.is_featured?'#fff':'#000'}}>{item.name}</Text>
                                <Text style={{fontSize:12,color:item.is_featured?'#fff':'#268ae2'}}>Unit (pcs)</Text>
                                <Text style={{fontSize:12,color:item.is_featured?'#fff':'#268ae2'}}>SAP Code: {item.sap_code}</Text>
                            </View>
                            <View  style={{width:'40%'}}>
                                <Text style={{fontSize:14,color:'#DE0452',marginBottom: 5,textAlign: 'center'}}>AVI- 20 </Text>
                                <View style={{borderRadius:20,borderWidth:1,borderColor:'#dcdcdc',alignItems:'center',backgroundColor:'#fff'}}>
                                    <NumberPicker
                                        value={item.quantity}
                                        onValueChange={value => this.props.onValueChange(item._id, value)}
                                        style={styles.quantityPicker}
                                        buttonColor='#fff'
                                        iconColor="#DE0452"
                                        textColor='#000'
                                    />
                                    {/*<Button*/}
                                    {/*onPress={()=>{this.setState({counttest:2})}}*/}
                                    {/*title="Click Me"*/}
                                    {/*/>*/}
                                    {/*<Text>{this.state.counttest}</Text>*/}
                                </View>
                                {/*<TouchableHighlight onPress={this.addProduct(item)} style={{backgroundColor:'#ff1f77',borderRadius:3}}>*/}
                                {/*<Text style={{color:'#fff',padding:3}}>Add Order</Text>*/}
                                {/*</TouchableHighlight>*/}
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}

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
            showEmptyView: false,
            id: this.props.navigation.getParam('ID', ''),
            category:this.props.navigation.getParam('Category', ''),
            InvoiceId:this.props.navigation.getParam('InvoiceId', ''),
            dropdown:false,
            modalVisible: false,
            categories: [],
            products: [],
            data:[],
            schemes:[],
            count:'',

        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            const action = this.props.navigation.getParam('action', '');
            this.loadCart();
        });

        // alert('aaaa');
        this.getCategoriesFromAsyncStorage();

    }


    componentWillUnmount() {
        this.focusListener.remove();
    }

    loadCart = () => {
        // this.props.navigation.setParams({ Count: 15 });return;
        SessionHelper.getCartJson()
            .then(cartJson => {
                let cart = '';
                // let total = 0;

                if(cartJson) {
                    try {
                        cart = JSON.parse(cartJson).length;
                    }
                    catch(e) {
                    }
                }
                this.setState({
                    count:cart
                });
                this.props.navigation.setParams({ Count: cart });
            });
    }

    showLoader = () => {
        this.setState({ isLoading: true });
    };
    hideLoader = () => {
        this.setState({ isLoading: false });
    };

    getCategoriesFromAsyncStorage = async () => {

        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/brands/'+this.state.id+'/products', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {
                    // alert('An ed');return;
                    const products = responseJson.data.products.map(item => {
                        item.orderQuantity = 0;
                        item.quantity = 0;
                        return item;
                    });
                    this.setState({
                        // showEmptyView: true,

                        products,
                        // vchrno:responseJson.result.VCHRNO?responseJson.result.VCHRNO:'New'
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
    getSchemeFromAsyncStorage = async () => {

        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/schemes/'+this.state.id, {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {
                    const schemes = responseJson.data.schemes.map(item => {
                        item.quantity = 0;
                        return item;
                    });
                    this.setState({
                        // showEmptyView: true,
                        schemes,
                        // vchrno:responseJson.result.VCHRNO?responseJson.result.VCHRNO:'New'
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
    signOutAsync = async (navigation) => {
        await AsyncStorage.clear();
        navigation.navigate('Auth');
    };
    toggle(){
        this.props.navigation.toggleDrawer();
    };
    CountAdd(){
        this.setState({count: this.state.count + 1});
    };
    CountSubtract(){
        const count = this.state.count - 1;
        this.setState({count });
    };
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    addProduct=(item)=>{
        const product = {
            id: item._id,
            name: item.name,
            // quantity: this.state.qty,
            unit:item.unit
        };

        const data = [...this.state.data, product];

        this.setState({
            data,
        });
        this.addToCart();

    }

    addToAsyncStorage = () => {

        SessionHelper.getCartJsonInvoice(this.state.InvoiceId)
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
                        orderQuantity:0,
                        quantity:item.quantity
                    };

                    if(index == -1) {
                        cart.push(product);

                    }
                    else {
                        cart[index] = product;
                    }
                }


                let newCartJson = JSON.stringify(cart);
                // alert(newCartJson);return;
                SessionHelper.saveCartJsonInvoice(this.state.InvoiceId,newCartJson)
                    .then(() => {
                        Alert.alert('Success','Product added to the invoice');
                        this.props.navigation.navigate('InvoiceAdd',{
                            ID:this.state.InvoiceId
                        })

                    });
            });
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
    renderFooter() {
        if(this.state.products && (this.state.products.length >0)) {
            return (
                <View style={{flexDirection:'row',width:'100%',backgroundColor:'#fff',paddingTop:10,paddingBottom:10,alignItems:'center',justifyContent:'center'}}>
                    <TouchableHighlight onPress={this.addToAsyncStorage} style={{backgroundColor:'#de0452',padding:6,borderRadius:5,marginRight:10}}>
                        <Text style={{color:'#fff'}}>Add to Invoice</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>this.props.navigation.navigate('InvoiceAdd',{
                        ID:this.state.InvoiceId
                    })} style={{backgroundColor:'#de0452',padding:6,borderRadius:5}}>
                        <Text style={{color:'#fff'}}>Back to Invoice</Text>
                    </TouchableHighlight>
                </View>
            );
        }
        else {
            return null;
        }
    }
    renderHeader() {
        let ScreenWidth = Dimensions.get('window').width;
        let itemWidth = (ScreenWidth *75)/100;
        const { slider1ActiveSlide } = this.state;
        if(this.state.schemes && (this.state.schemes.length >0)) {
            return (
                <View style={{width:'100%',alignItems:'center'}}>
                    {/*<Text>{this.passwordRef ? 'yes' : 'no' }</Text>*/}
                    <View style={{width:'90%',marginTop:10}}>
                        <Text style={{fontSize:16,fontWeight: 'bold',color:'#000'}}>Scheme Products</Text>
                    </View>
                    <Carousel

                        extraData={this.state.schemes}
                        data={this.state.schemes}
                        renderItem={({item, index}) =>

                            <View style={{   height:150,alignItems:'center',borderRadius:15,width:'100%',backgroundColor:'#201744',justifyContent:'center'}}>

                                <View style={{width:'100%',flexDirection:'row',  height:120}}>

                                    <View style={{height: 120,width:'40%',alignItems:'center',borderRightWidth:1,borderRightColor:'#a854a1'}}>
                                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:10}}>MONTHLY SCHEME</Text>
                                        <Image source={item.length > 0 && item.items[0].item_image  ? {uri: item.items[0].item_image} :images.noimage } style={{width:50, height: 50,marginTop:10}} />
                                    </View>
                                    <View style={{height: 120,width:'60%',alignItems:'center'}}>
                                        {/*<Text style={{color:'#fff',fontWeight:'bold',fontSize:12}}>COMBO OFFER</Text>*/}
                                        <Text style={{fontSize:12, fontWeight:'bold',color:'#fff'}}>{item.product}</Text>

                                        <Text style={{fontSize:12,color:'#fff',marginTop:10}}>Start Date: {item.start_date}</Text>
                                        <Text style={{fontSize:12,color:'#fff'}}>End Date: {item.end_date}</Text>
                                        {/*<Text>{item.items[0].item_image}</Text>*/}

                                    </View>
                                </View>

                            </View>
                        }
                        sliderWidth={ScreenWidth}
                        itemWidth={itemWidth}
                        inactiveSlideScale={0.94}
                        inactiveSlideOpacity={0.7}
                        containerCustomStyle={{
                            marginTop: 15,
                            overflow: 'visible'
                        }}
                        contentContainerCustomStyle={{paddingVertical: 10 }}

                        onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                        // onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                    />
                </View>
            );
        }
        else {
            return null;
        }
    }
    updateCart = (_id, quantity) => {
        const products = this.state.products.map((item) => {
            if(item._id == _id) {
                item.quantity = quantity;
            }
            return item;
        });

        this.setState({
            products
        });
    }

    add(){
        this.setState({
            counttest:this.state.counttest+1
        })
    }

    approvalList(){

            return(
                <View>
                    <Text style={{marginTop: 10,marginBottom:5,fontSize:16,fontWeight: 'bold',color:'#000'}}>{this.state.category}</Text>
                    <FlatList
                        ListEmptyComponent={this.renderEmptyView()}
                        data={this.state.products}
                        extraData={this.state.products}
                        maxToRenderPerBatch={10}
                        windowSize={10}
                        initialNumToRender={5}
                        keyExtractor={item => '' + item.id}

                        renderItem={({item}) => this.renderItem(item)}
                    />
                </View>
            )
            }
    renderItem = (item) => {
        return (
            <MyListItem
                item={item}
                onValueChange={(_id, value) => this.updateCart(_id, value)}
            />
        );
    }
    render() {
        return (
            <View style={{flex:1}}>
                <ScrollView style={{backgroundColor:'#ebeef3'}}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor='#1B7ED5'
                    />

                    {this.renderHeader()}
                    <View style={{width:'100%',marginBottom:5,alignItems: 'center'}}>
                        <View style={{width:'95%'}}>
                            {this.approvalList()}
                        </View>
                    </View>
                </ScrollView>
                {this.renderFooter()}
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
    quantityPicker: {

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