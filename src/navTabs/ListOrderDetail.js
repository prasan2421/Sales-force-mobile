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
const options = {
    title: 'Select QR',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
class New extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showEmptyView: false,
            avatarSource:'',
            data:'',
            orderId:this.props.navigation.getParam('ID', 0),

        }
    }
    showLoader = () => {
        this.setState({ isLoading: true });
    };
    hideLoader = () => {
        this.setState({ isLoading: false });
    };

    componentDidMount() {

        this.getOrdersFromAsyncStorage();
    }


    getOrdersFromAsyncStorage = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/orders/'+this.state.orderId, {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {

                    this.setState({
                        // showEmptyView: true,
                        data: responseJson.data.products,

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
                keyExtractor={item => '' + item._id}
                renderItem={({item})=>
                    <TouchableHighlight
                        style={{marginTop: 15,alignItems:'center'}}
                        // onPress={() => this.props.navigation.navigate('NewsDetail',
                        //     {
                        //         ID: item.id,
                        //     }
                        //
                        // )}
                    >


                            <View style={{width:'90%', height:80,backgroundColor:'#ffffff', justifyContent:'center'}}>
                                <View  style={{padding:5,}}>
                                    <Text style={{fontSize:12}}><Text style={{fontSize:12,color:'#ff1f77'}}>Name:</Text>{item.name}</Text>
                                    <Text style={{fontSize:12}}><Text style={{fontSize:12,color:'#ff1f77'}}>Quantity:</Text>{item.quantity}</Text>
                                    <Text style={{fontSize:12}}><Text style={{fontSize:12,color:'#ff1f77'}}>Unit:</Text>{item.unit}</Text>
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
                <View style={{width:'100%',}}>

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
        marginTop:20,
        alignItems:'center',
    },
    buttonText: {
        color: '#fff',


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