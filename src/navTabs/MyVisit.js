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
import Icon from 'react-native-vector-icons/Ionicons'
import Notification from "../commons/Notification";
import SessionHelper from "../commons/SessionHelper";
import ErrorText from "../commons/ErrorText";
import NumberPicker from "../commons/NumberPicker";
import EmptyProducts from "../svg/EmptyProducts";
const options = {
    title: 'Select QR',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class MyListItem extends React.PureComponent {
    render() {
        let item = this.props.item;
        let backgroundColor = '#ff1f77';

        if(this.props.checkinId) {
            if(this.props.checkinId == item._id) {
                backgroundColor = '#ff650a';
            }
            else {
                backgroundColor = '#acacac'
            }
        }
        return (
            <View
                style={{marginBottom: 5, marginTop: 1, alignItems: 'center',}}
            >
                <TouchableHighlight
                    underlayColor={'#c3c3c3'}
                    style={{
                        flexDirection: 'row',
                        width: '95%',
                        backgroundColor: this.props.checkinId == item._id ?'#ff650a':'#ffffff',
                        elevation: 2,
                        padding: 10,
                        borderRadius: 5
                    }}
                    onPress={this.props.onPress}
                >
                    <View style={{}}>
                        <Text style={{fontSize: 14,color:this.props.checkinId == item._id ?'#fff':'#2a8ee5'}}>{item.name}</Text>
                        <Text style={{fontSize: 12,color:this.props.checkinId == item._id ?'#fff':'#1f1f1f'}}>{item.billing_address}</Text>
                        <Text style={{fontSize: 14,color:this.props.checkinId == item._id ?'#fff':'#1f1f1f'}}>{item.owner_contact_number}</Text>
                        <Text style={{fontSize: 14,color:this.props.checkinId == item._id ?'#fff':'#e6407f'}}>{item.customer_type}</Text>
                    </View>

                </TouchableHighlight>
            </View>
        );
    }
}

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
            modalVisible: false,
            customer:'',
            data:[],
            dataCategories:[],
            class:'',
            beat:'',
            dataBeat:[],
            shopName:'',
            checkinId:'',
            count:'',
            keyword:'',
            datafull:[]

        }
    }

    componentDidMount() {

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.checkGeom();
            this.loadCart();

        });
        this.getBeatFromAsyncStorage();

        this.getCustomers();

        // this.getCustomerFromApi();

    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    getBeatFromAsyncStorage = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/routes/today', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success='true') {
                    // alert(JSON.stringify(responseJson));
                    this.setState({
                        dataBeat: responseJson.data.routes,
                    });
                }
                else{
                    alert('Something went wrong.');return;
                }
            })
            .catch((error) => {

                alert('An error occurred');
            })
    };
    checkGeom= async () => {
        // const geom = await AsyncStorage.getItem('Geom');
        const id = await AsyncStorage.getItem('Id');
        // alert(JSON.stringify(id));return;
        if(id==''){
            this.setState({
            })
        }
        else{
            this.setState({
                // position:geom,
                checkinId:id
            })
        }
    }
    getCustomers = async () => {

        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/customers/today', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {
                    // alert(JSON.stringify(responseJson.data.customers));return;
                    this.setState({
                        showEmptyView: true,
                        data: responseJson.data.customers,
                        datafull:responseJson.data.customers,
                        count:responseJson.data.customers.length,

                        // vchrno:responseJson.result.VCHRNO?responseJson.result.VCHRNO:'New'
                    });
                }
                else{
                    this.setState({
                        showEmptyView: true,})
                    alert(responseJson.message);
                }

            })
            .catch((error) => {
                alert('An error occurred');
            })

    };
    updateValue(id){

// alert(id);
if(id==''){
    this.setState({
        data:this.state.datafull,

    })
}
else{
    let dataList= this.state.datafull.filter(cat=>cat.route_id===id);
    // alert(JSON.stringify(dataList));
    // alert(JSON.stringify(dataList));
    this.setState({
        data:dataList,

    })
}

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
                // this.setState({
                //     count:cart
                // });
                this.props.navigation.setParams({ Count: cart });
            });
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
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <EmptyProducts style={{width:200,height:200}}/>
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
                ListEmptyComponent={this.renderEmptyView()}
                data={this.state.data}
                maxToRenderPerBatch={10}
                windowSize={10}
                initialNumToRender={5}
                // extraData={this.state.data}
                keyExtractor={item => '' + item._id}
                renderItem={({item}) => this.renderItem(item)}


            />
        )

    }
    renderItem = (item) => {
        return (
            <MyListItem
                item={item}
                onPress={()=>this.props.navigation.navigate('ShopDetail',
                    {
                        Id:item._id
                    })}
                checkinId={this.state.checkinId}
            />
        );
    }
    searchIcon(){
        if(this.state.shopName=''){
            // alert('asadas');
            <Icon name="md-search" size={22} color="#000"/>
        }
        else return null;
    }

    render() {

        return (

            <View style={{flex:1,backgroundColor:'#ebeef3'}}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor='#1B7ED5'
                />



                <View style={{flex:1,width:'100%',marginTop:5}}>
                    {this.approvalList()}
                </View>
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