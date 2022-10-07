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
const options = {
    title: 'Select QR',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
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
            dataBeat:[],
            beat:''
        }
    }

    componentDidMount() {

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            const action = this.props.navigation.getParam('action', '');
            this.loadCart();

        });
        this.getBeatFromAsyncStorage();
        this.getCustomers();
        this.loadCart();
        // this.getCustomerFromApi();

    }
    getBeatFromAsyncStorage = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/routes', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success='true') {

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
    getCustomers = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/customers', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {
                    // alert(JSON.stringify(responseJson.data));return;
                    this.setState({
                        // showEmptyView: true,
                        data: responseJson.data.customers,

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
    qr=()=> {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {uri: response.uri};

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
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
                ListEmptyComponent={this.renderEmptyView()}
                data={this.state.data}

                // extraData={this.state.showCheckedOnly}
                keyExtractor={item => '' + item.id}
                renderItem={({item})=> {

                    return (
                        <View
                            style={{marginBottom: 10, marginTop: 1, alignItems: 'center',}}
                        >
                            <TouchableHighlight style={{

                                width: '95%',
                                backgroundColor: '#ffffff',

                                elevation: 1,
                                padding: 10,

                                borderRadius: 5
                            }}
                                // onPress={()=>this.props.navigation.navigate('ShopDetail',
                                // {
                                //     Id:item._id
                                // })}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent:'space-between',
                                    alignItems:'center'
                                  }}>
                                <View style={{}}>
                                    <Text style={{fontSize: 14,color:'#2a8ee5'}}>{item.name}</Text>
                                    <Text style={{fontSize: 12,color:'#1f1f1f'}}>{item.billing_address}</Text>
                                    <Text style={{fontSize: 14,color:'#1f1f1f'}}>{item.owner_contact_number}</Text>
                                    <Text style={{fontSize: 14,color:'#e6407f'}}>{item.customer_type}</Text>
                                </View>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <View
                                    style={{
                                        marginRight: 10,
                                        backgroundColor:'#2aab10',
                                        padding: 5,
                                        borderRadius: 5,
                                    }}
                                >
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: 12
                                    }}>Visited</Text>


                                </View>
                                        <Icon name="md-arrow-dropright" size={22} color="#000"/>
                                    </View>
                                </View>
                            </TouchableHighlight>
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
                <View style={{width:'100%',marginBottom:10,alignItems: 'center',marginTop:10,}}>
                    <View style={{width:'95%',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:14,fontWeight: 'bold'}}>Visited:<Text style={{color:'#2aab10'}}> 10</Text></Text>
                    <Text style={{fontSize:14,fontWeight: 'bold'}}>Not Visited:<Text style={{color:'#2aab10'}}> 30</Text></Text>
                    </View>
                </View>

                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%',backgroundColor:'#fff'}}>
                        <Picker
                            selectedValue={this.state.beat}
                            style={{width: '100%',}}

                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({beat: itemValue})
                            }>
                            <Picker.Item label="Select Beat" value="" />
                            {this.state.dataBeat.map(item => (<Picker.Item key={'' + item._id} label={item.name} value={item._id} />))}
                        </Picker>



                    </View>
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%',backgroundColor:'#fff'}}>
                        <Picker
                            selectedValue={this.state.class}
                            style={{width: '100%',}}

                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({class: itemValue})
                            }>
                            <Picker.Item label="All Shops" value="" />
                            <Picker.Item label="Visited" value="visited" />
                            <Picker.Item label="Not-Visited" value="not-visited" />
                        </Picker>
                    </View>
                </View>

                <View style={{width:'100%'}}>

                    {this.approvalList()}

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