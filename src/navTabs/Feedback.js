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
import ActivityIcon from "../commons/ActivityIcon";
const options = {
    title: 'Select QR',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
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
            isLoading: false,
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
            datafull:[],
            feedback_Error:'',
            feedback:''

        }
    }

    componentDidMount() {


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
    updateValue(text, field){
        if(field =='feedback'){
            this.setState({
                feedback:text,
            })
        }

    }

    Submit = async() => {

        let feedback = this.state.feedback;
        let feedback_Error='';

        if(feedback==""){
            feedback_Error = 'Please enter the Feedback';
        }

        this.setState({
            feedback_Error: feedback_Error,
        });
        if(feedback_Error) {
            return;
        }
        // alert(JSON.stringify(this.state.cart));return;
        this.showLoader();
        const access_token = await AsyncStorage.getItem('access_token');
        // alert(access_token);return;
        fetch('http://14.192.18.73/api/feedbacks',{
            method:'POST',
            headers:{
                'x-auth': access_token,
                // 'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                message: this.state.feedback,
            })
        })
        // .then(response => response.text())
        // .then(text => alert(text))
            .then((response)=> response.json())


            .then ((responseJson) => {

                if(responseJson.success){
                    this.hideLoader();
                    this.props.navigation.goBack();

                    Alert.alert('Success','Feedback Sent successfully.')

                    this.setState({
                        feedback: '',
                    });
                }
                else{
                    this.hideLoader();
                    alert(JSON.stringify(responseJson.errors));
                }
            })
            .catch((error) => {
                this.hideLoader();
                // console.error(error)
                alert('An error occurred');
            })
            .done();

    };

    render() {

        return (
            <ScrollView style={{backgroundColor:'#ebeef3'}}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor='#1B7ED5'
                />
                <ActivityIcon visible={this.state.isLoading}
                              indicatorColor={'#333333'}
                              messageColor={'#afafaf'}
                              message='Please wait, Sending feedback...'
                />

                <View style={{width:'100%',marginBottom:10,alignItems: 'center',marginTop:10,}}>
                    <View style={{flexDirection:'row',width:'95%',backgroundColor:'#fff',borderRadius:5,elevation:1}}>
                        <TextInput style={{paddingLeft:10,width:'100%',textAlignVertical: "top"}}
                                   multiline = {true}
                                   numberOfLines = {7}
                                   editable = {true}
                                   maxLength = {100}
                                   placeholder="Leave Feedback ..."
                                   returnKeyType='done'
                                   onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(feedback) => this.setState({feedback})}
                            // onChangeText={(shopName) => this.setState({shopName})}
                        />
                    </View>

                    <ErrorText text={this.state.feedback_Error} />
                    <TouchableHighlight onPress={() => this.Submit()} style={{padding:5,borderRadius:15,backgroundColor:'#1B7ED5',marginTop:20}}>
                        <Text style={{color:'#fff',fontWeight: 'bold',fontSize:18,marginLeft:5,marginRight:5}}>Submit</Text>
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