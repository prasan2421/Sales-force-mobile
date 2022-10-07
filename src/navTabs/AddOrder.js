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
import ErrorText from "../commons/ErrorText";
import Notification from "../commons/Notification";
import SessionHelper from "../commons/SessionHelper";
import EmptyCart from "../svg/EmptyCart";
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
        }
    }


    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            const action = this.props.navigation.getParam('action', '');
            this.loadCart();
            this.checkGeom();

        });

        // this.loadCart();
        // this.getCustomerFromApi();
        // this.checkGeom();

    }

    checkGeom= async () => {
        // const geom = await AsyncStorage.getItem('Geom');
        const id = await AsyncStorage.getItem('Id');

        if(id==null){
// alert('qqqq');
            this.setState({
                refreshing: false,
                showEmptyView:true,
                dataCategories: [],
            })
        }
        else{
// alert('wwww');
            this.setState({
                showEmptyView:false,
            },()=> this.getCategoriesFromApi())
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



    getCategoriesFromApi = async () => {

        this.setState({refreshing: true});
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/verticals', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {
                    // alert(JSON.stringify(responseJson));
                    this.setState({
                        // showEmptyView: true,
                        refreshing: false,
                        dataCategories: responseJson.data.verticals,
                        // vchrno:responseJson.result.VCHRNO?responseJson.result.VCHRNO:'New'
                    });
                }
                else{
                    this.setState({refreshing: false});
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
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    renderEmptyView() {
        let ScreenHeight = (Dimensions.get('window').height)/4;
        if(this.state.showEmptyView) {
            return (
                <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:ScreenHeight}}>
                    <Text>NO Items...</Text>
                </View>
            )
        }
        else {
            return<ActivityIndicator size="small" color="#353535" />;
        }
    }
    ToggleDropDown(){
        // let { brands } = this.state;
        // brands[brand_Id].dropdown = !brands[brand_Id].dropdown;
        //
        // this.setState({
        //     brands
        // }, () => this.SubCategoryList(brand_Id));

        let dropdown = !this.state.dropdown;

        this.setState({
            dropdown
        }, () => {this.SubCategoryList()});
    }

    SubCategoryList(){
if(this.state.dropdown){
    return(
        <FlatList
            ListEmptyComponent={this.renderEmptyView()}
            data={this.state.data}
            // extraData={this.state.showCheckedOnly}
            keyExtractor={item => '' + item.id}
            renderItem={({item})=>
                <TouchableHighlight
                    style={{marginLeft:15,marginTop: 15,width:'100%',}}
                    // onPress={() => this.props.navigation.navigate('NewsDetail',
                    //     {
                    //         ID: item.id,
                    //     }
                    //
                    // )}
                >
                    <View style={{width:'100%',}}>
                        <View style={{flexDirection:'row',width:'100%',padding:10,backgroundColor:'#ffffff',alignItems:'center' }}>
                            {/*<View style={{marginRight:15}}>*/}
                            {/*<Icon name="md-add" size={22} color="#000"/>*/}
                            {/*</View>*/}
                            <View style={{}}>
                                <View  style={{padding:5,}}>
                                    <Text style={{fontSize:12}}><Text style={{color:'#2d91e9'}}>Product name: </Text>{item.name}</Text>
                                </View>
                                <View  style={{padding:5,}}>
                                    <Text style={{fontSize:12}}><Text style={{color:'#2d91e9'}}>Product Quantity:</Text>{item.quantity} {item.unit}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>}
        />
    )}
    else{
        return null;
    }
}

    approvalList(){

        return(
            <FlatList
                ListEmptyComponent={this.renderEmptyView()}
                data={this.state.dataCategories}
                extraData={this.state.dropdown}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={this.state.refreshing}
                //         onRefresh={this.getCategoriesFromApi}
                //     />
                // }
                keyExtractor={item => '' + item._id}
                renderItem={({item})=>
                    <View style={{}}>
                    <TouchableHighlight
                        underlayColor={'#c3c3c3'}
                        style={{marginTop: 5,width:'100%',borderRadius:5,backgroundColor:'#ffffff',elevation: 1 }}
                        onPress={()=>this.props.navigation.navigate('AddOrderNext',
                            {ID:item._id,Category:item.name})}
                    >
                        <View style={{width:'100%',}}>

                            <View style={{flexDirection:'row',width:'100%',padding:10,alignItems:'center' ,justifyContent:'space-between'}}>
                                <View style={{flexDirection:'row',alignItems:'center' }}>
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
        )

    }

    render() {
        let header=this.state.dataCategories.length>0?<View style={{marginTop: 10,marginBottom:5}}>
            <Text style={{fontSize:16,fontWeight: 'bold',color:'#000'}}>All Vertical</Text>
        </View>:null;
        return (
            <ScrollView style={{backgroundColor:'#ebeef3'}}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor='#1B7ED5'
                />

                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>
                    <View style={{width:'95%'}}>
                        {header}
                        {this.approvalList()}
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