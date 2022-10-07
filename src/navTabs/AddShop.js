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

import Icon from 'react-native-vector-icons/Ionicons'
import {images} from "../constants/images";
import ErrorText from "../commons/ErrorText";
class New extends Component {

    constructor(props) {
        super(props);
        this.state = {
            TownName:'',

            avatarSource:'',
            shopName:'',
            BeatName:'',
            ownerName:'',
            ShopType:'',
            ShopTypeError:'',
            BeatNameError:'',
            ShopCategory:'',
            ShopCategoryError:'',
            dataBeat:[],
            dataCustomerType:[],
            dataCustomerClass:[]

        }
    }


    componentDidMount() {

        this.getBeatFromAsyncStorage();
        this.getCustomerClass();
        this.getCustomerType();
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
    getCustomerClass = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/customer-classes', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success='true') {

                    this.setState({
                        dataCustomerClass: responseJson.data.customer_classes,
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
    getCustomerType = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/customer-types', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success='true') {

                    this.setState({
                        dataCustomerType: responseJson.data.customer_types,
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


    next = () => {

        let shopName = this.state.shopName;
        let ownerName = this.state.ownerName;
        let ShopType = this.state.ShopType;
        let BeatName = this.state.BeatName;
        let ShopCategory = this.state.ShopCategory;
        let shopNameError = '';
        let ownerNameError = '';
        let ShopTypeError='';
        let ShopCategoryError='';
        let BeatNameError:'';

        if(shopName==""){
            shopNameError = 'Please enter the shop name';
        }

        if(ownerName==""){
            ownerNameError = 'Please enter the owner name';
        }
        if(ShopType==""){
            ShopTypeError = 'Please select the shop type';
        }
        if(ShopCategory==""){
            ShopCategoryError = 'Please select the shop class';
        }
        if(BeatName==""){
            BeatNameError = 'Please select the beat name';
        }


        this.setState({
            shopNameError: shopNameError,
            ownerNameError: ownerNameError,
            ShopTypeError:ShopTypeError,
            ShopCategoryError:ShopCategoryError,
            BeatNameError:BeatNameError

        });

        if(shopNameError ||  ownerNameError || ShopTypeError ||ShopCategoryError || BeatNameError ) {
            return;
        }
        this.props.navigation.navigate('AddShopNext',{
            shopName: this.state.shopName,
            ownerName:this.state.ownerName,
            BeatName:this.state.BeatName,
            TownName:this.state.TownName,
            ShopType:this.state.ShopType,
            ShopCategory:this.state.ShopCategory

        });


    };
    signOutAsync = async (navigation) => {
        await AsyncStorage.clear();
        navigation.navigate('Auth');
    };
    toggle(){
        this.props.navigation.toggleDrawer();
    };


    render() {
        return (
            <ScrollView style={{backgroundColor:'#ebeef3'}}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor='#1B7ED5'
                />
                <View style={{width:'100%',marginBottom:10,marginTop:10,alignItems: 'center'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <TextInput style={{paddingLeft:10,width:'100%'}}
                                   placeholder="Town"
                                   returnKeyType='done'
                                   onSubmitEditing={Keyboard.dismiss}
                                   onChangeText={(TownName) => this.setState({TownName})}
                        />

                    </View>
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <Picker
                            selectedValue={this.state.BeatName}
                            style={{width: '100%',}}

                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({BeatName: itemValue})
                            }>
                            <Picker.Item label="Select Beat" value="" />
                            {this.state.dataBeat.map(item => (<Picker.Item key={'' + item._id} label={item.name} value={item._id} />))}
                        </Picker>
                    </View>
                    <ErrorText text={this.state.BeatNameError} />
                </View>

                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>

                    <View style={{justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <TextInput style={{paddingLeft:10,width:'100%'}}
                                   placeholder="Shop Name (Required)"
                                   returnKeyType='done'
                                   onSubmitEditing={Keyboard.dismiss}
                                   onChangeText={(shopName) => this.setState({shopName})}
                        />


                    </View>
                    <ErrorText text={this.state.shopNameError} />
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>

                    <View style={{justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <TextInput style={{paddingLeft:10,width:'100%'}}
                                   placeholder="Owner Name (Required)"
                                   returnKeyType='done'
                                   onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(ownerName) => this.setState({ownerName})}
                        />


                    </View>
                    <ErrorText text={this.state.ownerNameError} />
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <Picker
                            selectedValue={this.state.ShopType}
                            style={{width: '100%',}}

                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ShopType: itemValue})
                            }>
                            <Picker.Item label="Shop Type" value="" />
                            {this.state.dataCustomerType.map(item => (<Picker.Item key={'' + item._id} label={item.name} value={item._id} />))}

                        </Picker>
                    </View>
                    <ErrorText text={this.state.ShopTypeError} />
                </View>
                <View style={{width:'100%',marginBottom:10,alignItems: 'center'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',backgroundColor:'#fff',borderRadius:5,elevation: 1}}>
                        <Picker
                            selectedValue={this.state.ShopCategory}
                            style={{width: '100%',}}

                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ShopCategory: itemValue})
                            }>
                            <Picker.Item label="Shop Class" value="" />
                            {/*<Picker.Item label="Wholesaler" value="Wholesaler" />*/}
                            {this.state.dataCustomerClass.map(item => (<Picker.Item key={'' + item._id} label={item.name} value={item._id} />))}

                        </Picker>
                    </View>
                    <ErrorText text={this.state.ShopCategoryError} />
                </View>

                <View style={styles.buttonWrapper}>

                    <TouchableHighlight onPress={this.next} style={{  paddingLeft:40,
                        paddingRight:40,
                        paddingTop:10,
                        borderRadius:20,  backgroundColor:'#ff1f77',}}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableHighlight>


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