import React, { Component } from 'react';
import {
    Alert,
    AsyncStorage,
    Button,
    Dimensions,
    FlatList,
    Modal,
    Picker,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    Switch,
    TouchableOpacity,
    RefreshControl,
    TouchableHighlight,
    Image,
    View,
    ActivityIndicator, Keyboard
} from 'react-native';
import RadioButton from '../commons/RadioButton';
import ActivityIcon from "../commons/ActivityIcon";

class New extends Component {


    constructor(props) {
        super(props);
        this.state = {

            isLoading:'false',
            _title:'check',
            showCheckedOnly: false,
            vchrno:this.props.navigation.getParam('vchrno', 0),
            vendor: this.props.navigation.getParam('vendor', 0),
            data: [],
            dataRexin:[],
            prodList:[]
        }
    }


    componentDidMount() {
        this.getPoDetailsFromAsyncStorage();
    }


    getPoDetailsFromAsyncStorage = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://imsnepal.com:1660/api/po/getPoDetails?vchrno='+this.state.vchrno+'&vendor='+this.state.vendor, {
            headers: {
                Authorization: access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.status!='ok') {

                    alert(responseJson.errors);
                }
                else if(responseJson.result) {

                    let data = [];
                    let dataRexin =[];

                    for(item of responseJson.result.filter(cat=>cat.category_Id===1)) {
                        data.push({
                            id: item.brand_Id,
                            name: item.brand,
                            checked: true,
                            value: '' + item.quantity,
                            rate:item.rate ? item.rate : 0,
                            rowid:item.ROWID
                        });
                    }
                    for(item of responseJson.result.filter(cat=>cat.category_Id===2)) {
                        dataRexin.push({
                            id: item.brand_Id,
                            name: item.brand,
                            checked: true,
                            value: '' + item.quantity,
                            rate:item.rate ? item.rate : 0,
                            rowid:item.ROWID
                        });
                    }


                    this.setState({
                        data,
                        dataRexin,

                    });
                    // this.addCheckedValue();
                }
            })
            .catch((error) => {

                alert('An error occurred');
            })

    };

    submitPost = async ()=> {
        const data = JSON.stringify({
            vchrno:this.state.vchrno
        })


// console.warn(data);

        const access_token = await AsyncStorage.getItem('access_token');
        let url = 'http://imsnepal.com:1660/api/po/postpo';
        this.showLoader();
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: data, // data can be `string` or {object}!
            headers:{
                Authorization: access_token,
                'Content-Type':'application/json',

                // 'Accept': 'application/json'
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.status!='ok') {
                    alert(JSON.stringify(responseJson));
                    // alert(responseJson.message);
                    this.hideLoader();
                }
                else if(responseJson.status=='ok') {
                    this.hideLoader();
                    Alert.alert('Response',responseJson.message);
                    this.hideLoader();
                    this.props.navigation.navigate('PurchaseOrder', { action: 'refresh' })
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoader();
                // Alert.alert(null, 'An error occurred');
            })

    }
    submitCancel = async ()=> {
        const data = JSON.stringify({
            vchrno:this.state.vchrno
        })


// console.warn(data);

        const access_token = await AsyncStorage.getItem('access_token');
        let url = 'http://imsnepal.com:1660/api/po/cancelpo';
        this.showLoader();
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: data, // data can be `string` or {object}!
            headers:{
                Authorization: access_token,
                'Content-Type':'application/json',

                // 'Accept': 'application/json'
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.status!='ok') {
                    alert(JSON.stringify(responseJson));
                    // alert(responseJson.message);
                    this.hideLoader();
                }
                else if(responseJson.status=='ok') {
                    this.hideLoader();
                    Alert.alert('Response',responseJson.message);
                    this.hideLoader();
                    this.props.navigation.navigate('PurchaseOrder', { action: 'refresh' })
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoader();
                // Alert.alert(null, 'An error occurred');
            })

    }
    addCheckedValue(){
        let prodList =[];
        for(item of this.state.data.concat(this.state.dataRexin).filter(chk=>chk.checked===true)) {
            prodList.push({
                mcode: item.id,
                qty:item.value,
                rate:item.rate
            });
        }
        this.setState({
            prodList
        });
    }
    submitSave = async ()=> {
        let prodList =[];
        for(item of this.state.data.concat(this.state.dataRexin).filter(chk=>chk.checked===true)) {
            prodList.push({
                mcode: item.id,
                qty:item.value,
                rate:item.rate,
                rowid:item.rowid
            });
        }

        // alert(JSON.stringify(prodList));return;
        const data = JSON.stringify({
            prodList,
            guid:"unique-guid",
            vendor:this.state.vendor
        });

// console.warn(data);

        const access_token = await AsyncStorage.getItem('access_token');
        let url = 'http://imsnepal.com:1660/api/po/savepo';
        this.showLoader();
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: data, // data can be `string` or {object}!
            headers:{
                Authorization: access_token,
                'Content-Type':'application/json',

                // 'Accept': 'application/json'
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.status!='ok') {
                    alert(JSON.stringify(responseJson));
                    this.hideLoader();
                }
                else if(responseJson.status=='ok') {
                    this.hideLoader();
                    Alert.alert('Response',responseJson.message);
                    this.hideLoader();
                    this.props.navigation.navigate('PurchaseOrder', { action: 'refresh' })


                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoader();
                // Alert.alert(null, 'An error occurred');
            })

    }
    submitUpdate = async ()=> {
        let prodList =[];
        for(item of this.state.data.concat(this.state.dataRexin).filter(chk=>chk.checked===true)) {
            prodList.push({
                mcode: item.id,
                qty:item.value,
                rate:item.rate,
                rowid:item.rowid
            });
        }

        // alert(JSON.stringify(prodList));return;
        const data = JSON.stringify({
            prodList,
            vchrno: this.state.vchrno,
            vendor:this.state.vendor
        });

// console.warn(data);

        const access_token = await AsyncStorage.getItem('access_token');
        let url = 'http://imsnepal.com:1660/api/po/updatepo';
        this.showLoader();
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: data, // data can be `string` or {object}!
            headers:{
                Authorization: access_token,
                'Content-Type':'application/json',

                // 'Accept': 'application/json'
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.status!='ok') {
                    alert(JSON.stringify(responseJson));
                    this.hideLoader();
                }
                else if(responseJson.status=='ok') {
                    this.hideLoader();
                    Alert.alert('Response',responseJson.message);
                    this.hideLoader();
                    this.props.navigation.navigate('PurchaseOrder', { action: 'refresh' })


                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoader();
                // Alert.alert(null, 'An error occurred');
            })

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

    toggleCheckbox = (index) => {
        let data = this.state.data.map((v, i) => {
            if(i == index) {
                v.checked = !v.checked;

                if(!v.checked) {
                    v.value = '';
                }
            }
            return v;
        });

        this.setState({
            data
        });
        // this.addCheckedValue();
    }
    toggleCheckbox2 = (index) => {
        let dataRexin = this.state.dataRexin.map((v, i) => {
            if(i == index) {
                v.checked = !v.checked;

                if(!v.checked) {
                    v.value = '';
                }
            }

            return v;
        });

        this.setState({
            dataRexin
        });
        // this.addCheckedValue();
    }

    updateValue1 = (index, text) => {
        let data = this.state.data.map((v, i) => {
            if(i == index) {
                v.value = text;
            }

            return v;
        });

        this.setState({
            data
        });
    }
    updateValue2 = (index, text) => {
        let dataRexin = this.state.dataRexin.map((v, i) => {
            if(i == index) {
                v.value = text;
            }

            return v;
        });

        this.setState({
            dataRexin
        });
    }



    renderItem = (item, index,val) => {
        if(!this.state.showCheckedOnly || item.checked) {
            return (
                <View style={{width: '100%', borderBottomWidth: 2, borderColor: '#dddddd', alignItems: 'center'}}>
                    <View style={styles.inputContainerTopWrapper}>
                        <View style={styles.inputContainerTopLeft}>
                            {/*<Text>vchrno: {this.state.vchrno}</Text>*/}
                            {/*<Text>vendor: {this.state.vendor}</Text>*/}
                            <RadioButton
                                checked={item.checked}
                                onPress={() => val=='a'? this.toggleCheckbox(index): this.toggleCheckbox2(index)}
                                checkedColor={'#0400ff'}
                                uncheckedColor={'#8ea4ac'}
                            />
                            <Text style={{fontSize: 16, color: '#000', marginLeft: 10}}>{item.name}</Text>
                        </View>

                        <View style={styles.inputContainerTopRight}>
                            <TextInput
                                keyboardType={'numeric'}
                                value={item.value}
                                onChangeText={text => val=='a'? this.updateValue1(index, text):this.updateValue2(index, text)}
                                editable={item.checked}
                                style={{backgroundColor: item.checked ? '#fff' : '#acacac', color: '#808080', textAlign: 'center'}}
                            />
                        </View>
                    </View>
                </View>
            );
        }
        else {
            return null;
        }
    }


    render() {
        return (
            <View style={{flex:1,}}>
                <ActivityIcon visible={this.state.isLoading}
                              message={'Please wait'}
                />
                <View  style={{alignItems:'flex-start',marginLeft:20,marginTop:20,flexDirection:'row'}}>
                <Switch
                    value={this.state.showCheckedOnly}
                    onValueChange={value => this.setState({showCheckedOnly: value})}
                />
                    <Text>Show Checked Items Only</Text>
                </View>
                    <View style={{width:'100%',borderBottomWidth:2,borderColor:'#dddddd',alignItems:'center',marginTop:30}}>

                    <Text style={{fontSize:20,width:'90%',fontWeight:'bold',color:'#000',marginBottom:5}}>PVC Flooring</Text>
                    </View>
                        <View>
                            <FlatList
                                data={this.state.data}
                                extraData={this.state.showCheckedOnly}
                                keyExtractor={item => '' + item.id}
                                renderItem={({item, index}) => this.renderItem(item, index, 'a')}
                            />
                        </View>

                <View style={{width:'100%',borderBottomWidth:2,borderColor:'#dddddd',alignItems:'center',marginTop:30}}>

                    <Text style={{fontSize:20,width:'90%',fontWeight:'bold',color:'#000',marginBottom:5}}>Rexin</Text>
                </View>
                <View>
                    <FlatList
                        data={this.state.dataRexin}
                        extraData={this.state.showCheckedOnly}
                        keyExtractor={item => '' + item.id}
                        renderItem={({item, index}) => this.renderItem(item, index, 'b')}
                    />
                </View>
                <View style={{flexDirection:'row',width:'100%',justifyContent:'center',marginTop:30}}>

                        <TouchableOpacity style={styles.nextButton} onPress={this.submitPost}>
                            <Text style={{color:'#fff',textAlign:'center'}}>Post</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.nextButton} onPress={this.state.vchrno=='New'?this.submitSave:this.submitUpdate}>
                            <Text style={{color:'#fff',textAlign:'center'}}>{this.state.vchrno=='New'?'Save':'Update'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.nextButton} onPress={this.submitCancel}>
                            <Text style={{color:'#fff',textAlign:'center'}}>Cancel</Text>
                        </TouchableOpacity>


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
        flexDirection:'row',
        justifyContent:'space-between',
        width:'85%'

    },
    inputContainerTopLeft: {
        height:50,
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center'
    },
    inputContainerTopRight: {
        marginTop:5,
        marginBottom:5,
        borderColor:'#9f9f9f',
        borderWidth:1.5,
        width:100,
        borderRadius:10,
        height:45,
        justifyContent:'center',
        overflow: 'hidden'
    },
    nextButton: {
        marginTop:5,
        // borderColor:'#dbdbdb',
        backgroundColor: '#3f74db',
        width:'30%',
        borderRadius:10,
        height:50,
        justifyContent:'center',
        marginLeft:5,
        marginRight:5

    },

});