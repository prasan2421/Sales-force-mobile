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
            id: this.props.navigation.getParam('ID', ''),
            category:this.props.navigation.getParam('Category', ''),
            dropdown:false,
            modalVisible: false,
            categories: [],
            products: [],
            data:[],
            schemes:[],
            count:''
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            const action = this.props.navigation.getParam('action', '');
            this.loadCart();
        });
        this.loadCart();
        // alert('aaaa');
        this.getCategoriesFromAsyncStorage();
        // this.getSchemeFromAsyncStorage();
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
        fetch('http://14.192.18.73/api/verticals/'+this.state.id+'/brands', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {
                    // alert('Aned');

                    this.setState({
                        // showEmptyView: true,
                        categories: responseJson.data.brands,
                        // products,
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
                <View>
                    <Text style={{fontSize:16,marginTop: 10,marginBottom:5,fontWeight: 'bold',color:'#000'}}>{this.state.category}</Text>
                    <FlatList
                        ListEmptyComponent={this.renderEmptyView()}
                        data={this.state.categories}

                        extraData={this.state.categories}
                        keyExtractor={item => '' + item._id}
                        renderItem={({item})=>
                            <View>
                                <TouchableHighlight
                                    underlayColor={'#c3c3c3'}
                                    style={{padding:10,elevation:1,backgroundColor:'#ffffff',marginTop: 5,width:'100%',borderRadius:5}}
                                    onPress={()=>this.props.navigation.push('AddOrderNextProducts',
                                        {ID:item._id,Category:item.name})}
                                >
                                    <View style={{width:'100%',}}>

                                        <View style={{flexDirection:'row',width:'100%',alignItems:'center' ,justifyContent:'space-between'}}>
                                            <View  style={{flexDirection:'row',alignItems:'center' }}>
                                                <View style={{marginLeft:10,marginRight:10}}>
                                                    <Icon name="md-apps" size={24} color="#268AE2"/>
                                                </View>
                                                <View  style={{padding:5,}}>
                                                    <Text style={{fontSize:16}}>{item.name}</Text>
                                                </View>
                                            </View>
                                            <View style={{marginRight:10}}>
                                                <Icon name="md-arrow-dropright" size={24} color="#ff1f77"/>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>

                            </View>}
                    />
                </View>
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
                    <View style={{width:'100%',marginBottom:15,alignItems: 'center'}}>
                        <View style={{width:'95%'}}>
                            {this.approvalList()}
                        </View>
                    </View>
                </ScrollView>

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