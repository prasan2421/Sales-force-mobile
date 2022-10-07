import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    AsyncStorage,
    Button,
    TextInput,
    Alert,
    StyleSheet,
    Modal,
    SectionList,
Picker,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    TouchableHighlight,
    Dimensions,
    Image,

    ActivityIndicator, Keyboard
} from 'react-native';
import ActivityIcon from "../commons/ActivityIcon";
import Icon from 'react-native-vector-icons/Ionicons'
class New extends Component {


    constructor(props) {
        super(props);
        this.state = {
            VCHRNO:this.props.navigation.getParam('VCHRNO', 0),
            REFNO:this.props.navigation.getParam('REFNO', 0),
            VENDOR:this.props.navigation.getParam('VENDOR', 0),

            // VCHRNO:'SA1-002-7576',
            // REFNO:this.props.navigation.getParam('REFNO', 0),
            // VENDOR:this.props.navigation.getParam('VENDOR', 0),
            showEmptyView: false,
            isLoading:'false',
            modalVisible: false,
            dataPvc:[],
            dataRexin:[],
            prodList:[]
        }
    }


    componentDidMount() {

        this.getApprovalFromAsyncStorage();
    }


    getApprovalFromAsyncStorage = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        fetch('http://imsnepal.com:1660/api/so/getsodetails?refno='+this.state.REFNO, {
            headers: {
                Authorization: access_token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.status!='ok') {
                    this.setState({
                        showEmptyView: true
                    });
                    alert(responseJson.message);
                }
                else if(responseJson.status=='ok') {
                    let dataPvc = [];
                    let dataRexin =[];


                    for(item of responseJson.result.filter(cat=>cat.category_Id===1)) {
                        dataPvc.push({
                            id: item.brand_Id,
                            brand: item.brand,
                            orderQty: '' + item.orderQty,
                            approvedQty: '' + item.approvedQty,
                            rate: item.rate?''+ item.rate:'0',
                            approvalRemarks: item.remarks?item.remarks:' ',
                            ROWID: ''+item.ROWID,
                        });
                    }
                    for(item of responseJson.result.filter(cat=>cat.category_Id===2)) {
                        dataRexin.push({
                            id: item.brand_Id,
                            brand: item.brand,
                            orderQty: '' + item.orderQty,
                            approvedQty: '' + item.approvedQty,
                            rate: item.rate?''+ item.rate:'0',
                            approvalRemarks: item.remarks?item.remarks:' ',
                            ROWID: ''+item.ROWID,
                        });
                    }

                    this.setState({
                        dataPvc,
                        dataRexin,

                        showEmptyView: true

                    });
                }
            })
            .catch((error) => {
                this.setState({
                    showEmptyView: true
                });
                alert('An error occurred');
            })

    };
    submitPost = async ()=> {
        const data = JSON.stringify({
            vchrno: this.state.VCHRNO,
            refno : this.state.REFNO
        })


// console.warn(data);

        const access_token = await AsyncStorage.getItem('access_token');
        let url = 'http://imsnepal.com:1660/api/so/postSalesApprove';
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
                    alert(responseJson.message);
                    this.hideLoader();
                }
                else if(responseJson.status=='ok') {
                    this.hideLoader();
                    Alert.alert('Response',responseJson.message);
                    // this.hideLoader();
                    this.props.navigation.navigate('SalesOrderApproval', { action: 'refresh' })
                }
            })
            .catch((error) => {
                // console.error(error);
                this.hideLoader();
                Alert.alert(null, error);
            })

    }
    submitCancel = async ()=> {
        const data = JSON.stringify({
            refno : this.state.REFNO
        })


// console.warn(data);

        const access_token = await AsyncStorage.getItem('access_token');
        let url = 'http://imsnepal.com:1660/api/so/declinePO';
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
                    alert(responseJson.message);
                    this.hideLoader();
                }
                else if(responseJson.status=='ok') {
                    // this.hideLoader();
                    Alert.alert('Response',responseJson.message);
                    this.hideLoader();
                    this.props.navigation.navigate('SalesOrderApproval', { action: 'refresh' })
                }
            })
            .catch((error) => {
                // console.error(error);
                this.hideLoader();
                Alert.alert(null, error);
            })

    };
    submitSave = async ()=> {

        let prodList =[];
        for(item of this.state.dataPvc.concat(this.state.dataRexin)) {
            prodList.push({
                brand_id: item.id,
                qty: item.approvedQty,
                rate:item.rate,
                ROWID: item.ROWID,
                remarks:item.approvalRemarks
            });
        }
        // alert(JSON.stringify(prodList));return;
        const data = JSON.stringify({
            prodList,
            guid: "aaaaaaaa-bbbbbbbb-cccccccc",
            vendor: this.state.VENDOR,
            refno:this.state.REFNO,
        });

// console.warn(data);

        const access_token = await AsyncStorage.getItem('access_token');
        let url = 'http://imsnepal.com:1660/api/so/saveSalesApprove';
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
                    // Alert.alert('Response','Success saving');
                    Alert.alert('Response',responseJson.message);
                    this.hideLoader();
                    this.props.navigation.navigate('SalesOrderApproval', { action: 'refresh' })

                }
            })
            .catch((error) => {
                // console.error(error);
                this.hideLoader();
                Alert.alert(null, error);
            })

    }
    submitUpdate = async ()=> {

        let prodList =[];
        for(item of this.state.dataPvc.concat(this.state.dataRexin)) {
            prodList.push({
                brand_id: item.id,
                qty: item.approvedQty,
                rate:item.rate,
                ROWID: item.ROWID,
                remarks:item.approvalRemarks
            });
        }
        // alert(JSON.stringify(prodList));return;
        const data = JSON.stringify({
            prodList,
            vendor: this.state.VENDOR,
            vchrno:this.state.VCHRNO,
        });

// console.warn(data);

        const access_token = await AsyncStorage.getItem('access_token');
        let url = 'http://imsnepal.com:1660/api/so/updateSalesApprove';
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
                    // alert(JSON.stringify(responseJson));
                    Alert.alert('Response',responseJson.message);
                    this.hideLoader();
                }
                else if(responseJson.status=='ok') {
                    this.hideLoader();
                    Alert.alert('Response',responseJson.message);
                    // this.hideLoader();
                    this.props.navigation.navigate('SalesOrderApproval', { action: 'refresh' })


                }
            })
            .catch((error) => {
                // console.error(error);
                this.hideLoader();
                Alert.alert(null, error);
            })

    }
    signOutAsync = async (navigation) => {
        await AsyncStorage.clear();
        navigation.navigate('Auth');
    };
    showLoader = () => {
        this.setState({ isLoading: true });
    };
    hideLoader = () => {
        this.setState({ isLoading: false });
    };
    updateValue1 = (index, text) => {
        let dataPvc = this.state.dataPvc.map((v, i) => {
            if(i == index) {
                v.approvalRemarks = text;
            }

            return v;
        });

        this.setState({
            dataPvc
        });
    }
    updateValue2 = (index, text) => {
        let dataRexin = this.state.dataRexin.map((v, i) => {
            if(i == index) {
                v.approvalRemarks = text;
            }

            return v;
        });

        this.setState({
            dataRexin
        });
    }
    updateQtyValue1 = (index, text) => {
        let dataPvc = this.state.dataPvc.map((v, i) => {
            if(i == index) {
                v.approvedQty = text;
            }

            return v;
        });

        this.setState({
            dataPvc
        });
    }
    updateQtyValue2 = (index, text) => {
        let dataRexin = this.state.dataRexin.map((v, i) => {
            if(i == index) {
                v.approvedQty = text;
            }

            return v;
        });

        this.setState({
            dataRexin
        });
    }
    toggle(){
        this.props.navigation.toggleDrawer();
    };
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    renderItem= (item, index, val) =>{
        return<View style={{alignItems:'center',
            width:'100%',
            borderRadius:3,
            marginBottom:10
        }}>
            <View style={{width:'85%'}}>
                <View style={{alignItems:'center',marginBottom:15,marginTop:15}}>
                    <View style={{marginLeft:20,width:'100%'}}>
                        <Text style={{color:'#000',fontWeight:'bold',fontSize:16}}>{item.brand}</Text>
                        <View style={{flexDirection:'row',}}>
                            <Text style={{fontSize:12,width:'35%'}}>Order Qty:{item.orderQty} </Text><Text style={{fontSize:12}}> Order Value: Rs. {item.rate}</Text>
                        </View>

                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontSize:12,width:'35%'}}>Approved Qty: </Text>
                            <TextInput
                                keyboardType={'numeric'}
                            value={item.approvedQty}
                            onChangeText={text => val=='a'?
                                this.updateQtyValue1(index, text):this.updateQtyValue2(index,
                                    text)}
                            // editable={item.checked}
                            style={{backgroundColor: '#ffffff',paddingLeft:5,paddingRight:5, padding:0,margin:0, borderWidth:0.5,borderColor:'#858585'}}
                            />
                        </View>
                        <View style={{borderWidth:0.5,borderColor:'#000',marginTop:5,backgroundColor:'#ececec'}}>
                            <View>
                            <Text style={{fontSize:12,width:'35%',padding:5}}>Remarks: </Text>
                                <TextInput
                                    value={item.approvalRemarks}
                                    onChangeText={text => val=='a'?
                                        this.updateValue1(index, text):this.updateValue2(index, text)}
                                    // editable={item.checked}
                                    style={{backgroundColor: '#fff'}}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
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
    approvalList1(){
        const overrideRenderItem1 = ({ item, index, section }) => this.renderItem
        (item, index, 'a');
        const overrideRenderItem2 = ({ item, index, section }) => this.renderItem
        (item, index, 'b');


            return(
                <SectionList
                    renderItem={this.renderEmptyView()}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={{fontWeight: 'bold',textAlign:'center',marginTop:10}}>{title}</Text>
                    )}

                    keyExtractor={item => '' + item.id}
                    sections={[
                        {title: 'PVC FLOORING', data: this.state.dataPvc, renderItem: overrideRenderItem1 },
                        {title: 'REXIN', data: this.state.dataRexin,renderItem: overrideRenderItem2},

                    ]}
                    style={{height:'90%'}}
                    // keyExtractor={(item, index) => item + index}
                />

            )

    }


    render() {
        return (
            <View style={{flex:1}}>
                <ActivityIcon visible={this.state.isLoading}
                              message={'Please wait'}
                />
            <View>
              {/*<View style={styles.heading}>*/}
                  {/*<Text style={styles.text}>PVC Flooring</Text>*/}
              {/*</View>*/}

                {this.approvalList1()}
            </View>
            {/*<View>*/}
                {/*<View style={styles.heading}>*/}
                    {/*<Text style={styles.text}>Rexin</Text>*/}
                {/*</View>*/}

                {/*{this.approvalList2()}*/}
            {/*</View>*/}
                <View style={{flexDirection:'row',width:'100%',justifyContent:'center',marginTop:10}}>

                    <TouchableOpacity style={styles.Button} onPress={this.submitPost}>
                        <Text style={{color:'#fff',textAlign:'center'}}>Post</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Button} onPress={this.state.VCHRNO=='New'?this.submitSave:this.submitUpdate}>
                        <Text style={{color:'#fff',textAlign:'center'}}>{this.state.VCHRNO=='New'?'Save':'Update'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Button} onPress={this.submitCancel}>
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
    heading: {
        marginTop: 5,
        marginBottom: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:22,
        fontWeight:'bold',
        color:'#000',

    },
    Button: {
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