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
import {images} from "../constants/images";
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
            avatarSource:'',
            name:'',
            email:'',
            id:''
        }
    }


    componentDidMount() {

        this.getFromAsyncStorage();
    }


    getFromAsyncStorage = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://14.192.18.73/api/users/profile', {
            headers: {
                'x-auth': access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success) {

                    this.setState({
                        // showEmptyView: true,
                        name: responseJson.data.name,
                        email: responseJson.data.email,
                        id: responseJson.data.id
                        // vchrno:responseJson.result.VCHRNO?responseJson.result.VCHRNO:'New'
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

    render() {
        return (
            <ScrollView style={{backgroundColor:'#ebeef3'}}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor='#1B7ED5'
                />
                <View style={{width:'100%',marginBottom:10,marginTop:10,alignItems: 'center'}}>
                    <View style={{position:'relative',width:'95%',flexDirection: 'row',alignItems:'center',justifyContent:'center',backgroundColor:'#fff',padding:20,borderRadius:5}}>
                        <View style={{height:90,width:90,backgroundColor:'#aa3f00',borderRadius:90,justifyContent:'center',borderColor:'#298ade',borderWidth:3,marginRight:20}}>
                            <Image style={{height:84,width:84,backgroundColor:'#aa3f00',borderRadius:84,justifyContent:'center',borderColor:'#f3f7ec',borderWidth:2}}  source={images.face}/>
                        </View>
                        <View>
                        <Text style={{color:'#f9156c',fontSize:16}}>{this.state.name}</Text>
                            <Text style={{color:'#262626',fontSize:12}}>District Sales Manager</Text>
                        </View>
                        <TouchableHighlight onPress={()=>this.props.navigation.navigate('ChangePassword')} style={{position:'absolute',backgroundColor:'#1bb601',bottom:0,right:0,alignItems:'center',justifyContent:'center',borderBottomRightRadius:5}}>

                           <Text style={{color:'#fff',padding:4,fontSize:12}}>Change Password</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{width:'95%',marginTop:20,backgroundColor:'#fff',padding:10,borderRadius:5}}>
                        <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#e6e6e6',padding:10}}>
                            <Text style={{color:'#f9156c',width:150}}>Employee Code</Text>
                            <Text style={{color:'#262626'}}>25</Text>
                        </View>
                        <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#e6e6e6',padding:10}}>
                            <Text style={{color:'#f9156c',width:150}}>Mobile</Text>
                            <Text style={{color:'#262626'}}>12345678</Text>
                        </View>
                        <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#e6e6e6',padding:10}}>
                            <Text style={{color:'#f9156c',width:150}}>Email</Text>
                            <Text style={{color:'#262626'}}>{this.state.email}</Text>
                        </View><View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#e6e6e6',padding:10}}>
                        <Text style={{color:'#f9156c',width:150}}>Address</Text>
                        <Text style={{color:'#262626'}}>chandani chowk</Text>
                    </View><View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#e6e6e6',padding:10}}>
                        <Text style={{color:'#f9156c',width:150}}>Gender</Text>
                        <Text style={{color:'#262626'}}>Male</Text>
                    </View><View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#e6e6e6',padding:10}}>
                        <Text style={{color:'#f9156c',width:150}}>Date Of Birth</Text>
                        <Text style={{color:'#262626'}}>01/02/1980</Text>
                    </View><View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#e6e6e6',padding:10}}>
                        <Text style={{color:'#f9156c',width:150}}>Allotted Vertical</Text>
                        <Text style={{color:'#262626'}}></Text>
                    </View><View style={{flexDirection:'row',padding:10}}>
                        <Text style={{color:'#f9156c',width:150}}>Allotted Division</Text>
                        <Text style={{color:'#262626'}}></Text>
                    </View>


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