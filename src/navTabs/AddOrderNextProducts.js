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
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons'
import NumberPicker from '../commons/NumberPicker';
import {images} from "../constants/images";
import { TabView, SceneMap } from 'react-native-tab-view';
import ErrorText from "../commons/ErrorText";
import Notification from "../commons/Notification";
import { createMaterialTopTabNavigator } from 'react-navigation'

const SCREEN_WIDTH = Dimensions.get('window').width;



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
            refreshing:false,
            showEmptyView: false,
            id: this.props.navigation.getParam('ID', ''),
            category:this.props.navigation.getParam('Category', ''),
            dropdown:false,
            modalVisible: false,
            categories: [],
            products: [],
            data:[],
            schemes:[],
            list: new DataProvider((r1, r2) => r1 !== r2),
            count:'',
            counttest:0,
        };
        this.layoutProvider = new LayoutProvider((i) => {
            return this.state.list.getDataForIndex(i).type;
        }, (type, dim) => {
            switch (type) {
                case 'NORMAL':
                    dim.width = SCREEN_WIDTH;
                    dim.height =100;
                    break;
                case 'SCHEME':
                    dim.width = SCREEN_WIDTH;
                    dim.height =180;
                    break;
                default:
                    dim.width = SCREEN_WIDTH;
                    dim.height = 20;
                    break;
            };
        })
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            const action = this.props.navigation.getParam('action', '');
            this.loadCart();
        });
        this.loadCart();
        this.getSchemeFromAsyncStorage();


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
    getSchemeFromAsyncStorage = async () => {

        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/brands/'+this.state.id+'/schemes', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // alert(JSON.stringify(responseJson));return;
                if(responseJson.success) {

                    this.setState({
                        // showEmptyView: true,
                        schemes:responseJson.data.schemes,
                        // vchrno:responseJson.result.VCHRNO?responseJson.result.VCHRNO:'New'
                    },()=>this.getCategoriesFromAsyncStorage());
                }
                else{
                    alert(responseJson.message);
                }
            })
            .catch((error) => {

                alert(error);
            })

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
                    let items=[];
                    let itemheader = {};
                    itemheader.type = 'ABNORMAL';
                    itemheader.item = {'name':this.state.category,'header':true,'quantity':0};
                    items.push(itemheader);

                        if(this.state.schemes.length>=1){
                            let itemScheme = {};
                            itemScheme.type = 'SCHEME';
                            itemScheme.item = {'name':'SCHEME','scheme':true,'quantity':0};
                            items.push(itemScheme);
                        }

                    for(let product of responseJson.data.products) {
                        let item = {};
                        item.type = 'NORMAL';
                        // item.type = 'ABNORMAL';
                        item.item=product;
                        item.item.quantity = 0;
                        item.item.header = false;
                        items.push(item);
                    }
                    this.setState({
                        showEmptyView: true,
                        list:this.state.list.cloneWithRows(items),
                    });
                }
                else{

                    alert(responseJson.message);
                }
            })
            .catch((error) => {

                alert(error);
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

    addToCart = () => {
        // this.setState({
        // 	showLoadingDialog: true
        // });
        // this.state.list._data.shift();
        SessionHelper.getCartJson()
            .then(cartJson => {
                let cart = [];
                if(cartJson) {
                    try {
                        cart = JSON.parse(cartJson);
                    }
                    catch(e) {
                    }
                }

// alert(JSON.stringify(this.state.list._data));return;
                for(let item of this.state.list._data)  {
                    if(item.item.quantity == 0) {
                        continue;
                    }

                    let index = -1;
                    for(let i = 0; i < cart.length; i++) {
                        if(cart[i]._id == item.item._id) {
                            index = i;
                            break;
                        }
                    }


                    let product = {
                        _id: item.item._id,
                        name: item.item.name,
                        unit: item.item.unit,
                        quantity:item.item.quantity
                    };

                    if(index == -1) {
                        cart.push(product);

                    }
                    else {
                        cart[index] = product;
                    }
                }

                let newCartJson = JSON.stringify(cart);
                SessionHelper.saveCartJson(newCartJson)
                    .then(() => {
                        this.loadCart();
                        Alert.alert('Success','Product added to cart');
                        this.props.navigation.navigate('AddOrderEnd')

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

        return (
            <View style={{flexDirection:'row',width:'100%',backgroundColor:'#fff',paddingTop:10,paddingBottom:10,alignItems:'center',justifyContent:'center'}}>
                <TouchableHighlight onPress={this.addToCart} style={{marginRight:10,backgroundColor:'#de0452',padding:6,borderRadius:5}}>
                    <Text style={{color:'#fff'}}>Add to Cart</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=>this.props.navigation.navigate('Home')} style={{backgroundColor:'#de0452',padding:6,borderRadius:5}}>
                    <Text style={{color:'#fff'}}>Back to Home</Text>
                </TouchableHighlight>
            </View>
        );

    }

    updateCart = (_id, quantity) => {
        const list = this.state.list._data.map((item) => {
            if(item.item._id == _id) {
                item.item.quantity = quantity;
            }
            return item;
        });

        this.setState({
            list:this.state.list.cloneWithRows(list)
        });
    }

    add(){
        this.setState({
            counttest:this.state.counttest+1
        })
    }


    rowRenderer = (type, data) =>{

        const { _id, unit,name, quantity,is_featured,code,header,scheme,sap_code } = data.item;
        let ScreenWidth = Dimensions.get('window').width;
        let itemWidth = (ScreenWidth *75)/100;
        const { slider1ActiveSlide } = this.state;
        if(header){
            return (
                <View style={{marginTop:10,marginLeft:10}}>
                            <Text style={styles.nameHeader}>{name}</Text>
                </View>
            );
        }
        if(scheme){
            return (
                <View>
                    <Carousel

                        extraData={this.state.schemes}
                        data={this.state.schemes}
                        renderItem={({item, index}) =>

                            <View style={{alignItems:'center',borderRadius:15,width:'100%',backgroundColor:'#201744',justifyContent:'center'}}>

                                <View style={{width:'100%',}}>

                                    <View style={{marginHorizontal:10,alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderBottomColor:'#a854a1'}}>
                                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:12,marginVertical:10}}>MONTHLY SCHEME</Text>
                                    </View>
                                    <View style={{alignItems:'center',marginVertical:10}}>
                                        {/*<Text style={{color:'#fff',fontWeight:'bold',fontSize:12}}>COMBO OFFER</Text>*/}
                                        <Text style={{fontSize:12, fontWeight:'bold',color:'#fff'}}>{item.product_name}</Text>
                                        <Text style={{fontSize:12,color:'#fff',marginTop:10}}>SAP Code: {item.product_sap_code}</Text>
                                        <Text style={{fontSize:12,color:'#fff',}}>Unit: {item.product_unit}</Text>
                                        <Text style={{fontSize:12,color:'#fff',}}>Discount: {item.discount}</Text>
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

        else{
            return (
                <View style={styles.listItem}>
                    <View style={styles.body}>
                        <View style={{padding:10,width:'60%'}}>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.description}>Unit: {unit}</Text>
                            <Text style={styles.description}>SAP Code: {sap_code}</Text>
                        </View>
                        <View style={{padding:5,width:'40%'}}>
                            <Text style={{fontSize:14,color:'#DE0452',marginBottom: 5,textAlign: 'center'}}>AVI- 20 </Text>
                            <View style={{borderRadius:20,borderWidth:1,borderColor:'#dcdcdc',backgroundColor:'#fff',alignItems:'center'}}>
                                <NumberPicker
                                    value={quantity}
                                    onValueChange={(value) => this.updateCart(_id, value)}
                                    style={{alignItems:'center'}}
                                    buttonColor='#fff'
                                    iconColor="#DE0452"
                                    textColor='#000'
                                />
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
    }

    renderItems(){
        if(this.state.list._data.length>=2){
            return(
                <RecyclerListView
                    style={{flex: 1,backgroundColor:'#ebeef3'}}
                    rowRenderer={this.rowRenderer}
                    dataProvider={this.state.list}
                    layoutProvider={this.layoutProvider}

                    disableRecycling={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={ this.state.refreshing }
                            onRefresh={ async () => {
                                await this.getCategoriesFromAsyncStorage();

                            }}
                        />
                    }
                />


            )
        }
        else{
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

    }

    render() {
                return (
                    <View style={{flex:1}}>
                        {this.renderItems()}
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
    listItem: {
        backgroundColor:'#fff',
        elevation:2,
        borderRadius:5,
        height:90,
        flexDirection: 'row',
        margin: 10,
    },
    listItemHeader: {
        margin: 10,
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
    body: {
        flexDirection:'row',
        alignItems:'center',
        width: '100%',
    },
    nameHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#000'
    },
    name: {

        color:'#000'
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