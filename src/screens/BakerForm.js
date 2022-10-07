import React, {Component} from 'react';

import {
    AppRegistry,
    ImageBackground,
    Dimensions,
    Alert,
    TextInput,
    ScrollView,
    Keyboard,
    Button,
    FlatList,
    Image,
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    Animated,
    StyleSheet, AsyncStorage,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Checkbox from 'react-native-custom-checkbox';
import ErrorText from '../commons/ErrorText';
import Swiper from 'react-native-swiper';
import RadioButton from '../commons/RadioButton';
import {images} from "../constants/images";
import {Header} from "react-navigation";
import ActivityIcon from "../commons/ActivityIcon";
import CheckBox from "../commons/CheckBox";

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class BakerForm extends Component{
    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState({
            showPagination: false
        });
    }
    _keyboardDidHide = () => {
        this.setState({
            showPagination: true
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            showPagination: true,
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            cell_number: '',
            business_phone_number: '',
            business_legal_name: '',
            doing_business_as: '',
            business_address: '',
            city: '',
            zip_code: '',
            state: '',
            website: '',
            facebook: '',

            first_name_Error: '',
            last_name_Error: '',
            email_Error: '',
            password_Error: '',
            cell_number_Error: '',
            business_phone_number_Error: '',
            business_legal_name_Error: '',
            doing_business_as_Error: '',
            business_address_Error: '',
            city_Error: '',
            zip_code_Error: '',
            state_Error: '',
            website_Error: '',
            facebook_Error: '',
            avatarSource1: { uri: '' },
            avatarSource2: { uri: '' },
            avatarSource3: { uri: '' },
            check: false,
            check_Error: '',

        }
    }
    updateValue(text, field){
        if(field =='first_name'){
            this.setState({
                first_name:text,
            })
        }
        else if(field =='last_name'){
            this.setState({
                last_name:text,
            })
        }
        else if(field =='email'){
            this.setState({
                email:text,
            })
        } else if(field =='password') {
            this.setState({
                password: text,
            })
        }else if(field =='cell_number'){
            this.setState({
                cell_number:text,
            })
        }else if(field =='business_phone_number'){
            this.setState({
                business_phone_number:text,
            })
        }else if(field =='business_legal_name'){
            this.setState({
                business_legal_name:text,
            })
        }else if(field =='doing_business_as'){
            this.setState({
                doing_business_as:text,
            })
        }else if(field =='business_address'){
            this.setState({
                business_address:text,
            })
        }else if(field =='city'){
            this.setState({
                city:text,
            })
        }else if(field =='zip_code'){
            this.setState({
                zip_code:text,
            })
        }else if(field =='state'){
            this.setState({
                state:text,
            })
        }else if(field =='website'){
            this.setState({
                website:text,
            })
        }else if(field =='facebook'){
            this.setState({
                facebook:text,
            })
        }else if(field =='health_dept_permit'){
            this.setState({
                health_dept_permit:text,
            })
        }else if(field =='business_license'){
            this.setState({
                business_license:text,
            })
        }else if(field =='business_insurance'){
            this.setState({
                business_insurance:text,
            })
        }
    }
    submit() {

        let first_name = this.state.first_name.trim();
        let last_name = this.state.last_name.trim();
        let cell_number = this.state.cell_number.trim();
        let email = this.state.email.trim();
        let password = this.state.password;
        let check = this.state.check;
        let first_name_Error = '';
        let last_name_Error = '';
        let cell_number_Error = '';
        let email_Error = '';
        let password_Error = '';
        let check_Error = '';


        if(first_name==""){
            first_name_Error = 'Please fill the First Name';
        }

        if(last_name==""){
            last_name_Error = 'Please fill the Last Name';
        }


        if(cell_number==""){
            cell_number_Error = 'Please fill the Cell Number';
        }

        if(email==""){
            email_Error = 'Please fill the email';
        }

        if(!check){
            check_Error = 'Please check the box to agree terms and policy';
        }

        if(password==""){
            password_Error = 'Please fill the password';
        }
        else if(password.length <5){
            password_Error ='Password  must be more than 5';
        }

        this.setState({
            first_name_Error: first_name_Error,
            last_name_Error: last_name_Error,
            cell_number_Error: cell_number_Error,
            email_Error: email_Error,
            check_Error: check_Error,
            password_Error: password_Error
        });

        // alert(first_name + ' ' + last_name + ' ' + email + ' ' + password + ' ' + cell_number); return;
        if(first_name_Error || last_name_Error || cell_number_Error || email_Error || password_Error || check_Error) {

            this.refs.mySlide.scrollBy(-4,true);
            return;

        }
        const data = new FormData();

    data.append('first_name', first_name);
    data.append('last_name', last_name);
    data.append('email', email);
    data.append('password', password);
    data.append('cell_number', cell_number);
    data.append('business_phone_number', this.state.business_phone_number);
    data.append('business_legal_name', this.state.business_legal_name);
    data.append('doing_business_as', this.state.doing_business_as);
    data.append('business_address', this.state.business_address);
    data.append('city', this.state.city);
    data.append('zip_code', this.state.zip_code);
    data.append('state', this.state.state);
    data.append('website', this.state.website);
    data.append('facebook', this.state.facebook);
    data.append('status', 'UNVERIFIED');

    if(this.state.avatarSource1.uri) {
        data.append('health_dept_permit', {
            uri: this.state.avatarSource1.uri,
            type: 'image/jpeg',
            name: 'health_dept_permit'
        });
    }
        if(this.state.avatarSource2.uri) {
            data.append('business_insurance', {
                uri: this.state.avatarSource2.uri,
                type: 'image/jpeg',
                name: 'business_insurance'
            });
        }
    if(this.state.avatarSource3.uri) {
        data.append('business_license', {
            uri: this.state.avatarSource3.uri,
            type: 'image/jpeg',
            name: 'business_license'
        });
    }


// console.warn(data);

        let url = 'http://weddingcake.cyya.com/api/bakers/store';
        this.showLoader();
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: data, // data can be `string` or {object}!
            headers:{
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                // if (response.status === 422) {
                //     this.hideLoader();
                //     alert(response.errors);
                // }
                if(response.message) {
                    this.hideLoader();
                    alert('error testing');
                    // alert(response.message);

                }
                // else if(response.errors.email) {
                //     this.hideLoader();
                //     // alert('error testing');
                //     alert(response.errors.email);
                //
                // }
                else {
                    this.hideLoader();
                    // console.log('Success:', response);
                    // Alert.alert('Success!!!','Baker has been successfully created.');
                    this.props.navigation.navigate('signupBakerSubmitted');
                }

            })
            .catch(error => {
                console.error('Error:', error)
                this.hideLoader();
            });
    }

    onPress=()=>{
        this.refs.mySlide.scrollBy(-4,true);
    };
    _onSelect = ( item ) => {
        console.log(item);
    };

    permit=()=> {
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
                this.setState({
                    avatarSource1: source,
                });
            }
        });
    };
    insurance=()=> {
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
                this.setState({
                    avatarSource2: source,
                });
            }
        });
    };
    license=()=> {
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
                this.setState({
                    avatarSource3: source,
                });
            }
        });
    };
    showLoader = () => {
        this.setState({ isLoading: true });
    };

    hideLoader = () => {
        this.setState({ isLoading: false });
    };

    render(){
        let ScreenWidth = Dimensions.get('window').width;
        let ScreenHeight = Dimensions.get('window').height;

        return(
            <Swiper style={styles.wrapper}
                    showsPagination={this.state.showPagination}
                    activeDotColor='#ff4b98'
                    ref={"mySlide"}
                    scrollsToTop={true}
                    loop={false}>

                <ScrollView
                    style={styles.slide}
                    behavior="padding"
                    keyboardVerticalOffset = {Header.HEIGHT + 20}
                    enabled
                >


                    <View style={styles.container}>

                            <View style={styles.containerBox}>
                                <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center',fontWeight:'bold'}}>There are 3 ways to receive leads. They are through <Text style={{color:'#ff4b98'}}>Choice, Gold </Text>and <Text style={{color:'#ff4b98'}}>Diamond</Text> brides.</Text></View>
                                <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center',fontWeight:'bold',marginBottom:15,marginTop:15}}>Begin by applying for "Choice" status.</Text></View>
                                <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center',fontWeight:'bold'}}>When approved, you'll gain an opportunity to receive orders from Gold and Diamond brides</Text></View>
                            </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="First Name"
                                       returnKeyType='next'
                                       underlineColorAndroid='transparent'
                                       onSubmitEditing={() => this.last_name.focus()}
                                       onChangeText={(text) => this.updateValue(text,'first_name')}/>
                            <ErrorText text={this.state.first_name_Error} />

                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Last Name"
                                       ref={last_name => this.last_name = last_name}
                                       returnKeyType='next'
                                       onSubmitEditing={() => this.cell_number.focus()}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text,'last_name')}/>
                            <ErrorText text={this.state.last_name_Error} />

                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Cell Number"
                                       ref={cell_number => this.cell_number = cell_number}
                                       returnKeyType='next'
                                       keyboardType={'numeric'}
                                       autoCapitalize = 'none'
                                       onSubmitEditing={() => this.email.focus()}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text,'cell_number')}/>
                            <ErrorText text={this.state.cell_number_Error} />

                        </View><View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                                   placeholder="Email Address"
                                   onSubmitEditing={() => this.password.focus()}
                                   returnKeyType='next'
                                   autoCapitalize = 'none'
                                   underlineColorAndroid='transparent'
                                   ref={email => this.email = email}
                                   onChangeText={(text) => this.updateValue(text,'email')}/>
                        <ErrorText text={this.state.email_Error} />
                    </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Password"
                                       onSubmitEditing={Keyboard.dismiss}
                                       secureTextEntry={true}
                                       ref={password => this.password = password}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text,'password')}/>
                            <ErrorText text={this.state.password_Error} />
                        </View>
                    </View>
                </ScrollView>

                <ScrollView
                    style={styles.slide}
                    behavior="padding"
                    keyboardVerticalOffset = {Header.HEIGHT + 20}
                    enabled
                >
                    <View style={styles.container}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Legal Business name"
                                       onSubmitEditing={() => this.doing_business_as.focus()}
                                       returnKeyType='next'
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text,'business_legal_name')}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       ref={doing_business_as => this.doing_business_as = doing_business_as}
                                       returnKeyType='next'
                                       onSubmitEditing={() => this.business_address.focus()}
                                       placeholder="Doing business as"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text,'doing_business_as')}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Business address"
                                       ref={business_address => this.business_address = business_address}
                                       onSubmitEditing={() => this.city.focus()}
                                       returnKeyType='next'
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text,'business_address')}/>
                        </View>
                        <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                                   placeholder="City"
                                   ref={city => this.city = city}
                                   onSubmitEditing={() => this.stateProvince.focus()}
                                   returnKeyType='next'
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) => this.updateValue(text,'city')}/>
                        </View>
                        <View style={styles.inputContainer1}>
                            <TextInput style={styles.inputs1}
                                       placeholder="State"
                                       ref={stateProvince => this.stateProvince = stateProvince}
                                       onSubmitEditing={() => this.zip_code.focus()}
                                       returnKeyType='next'
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text,'state')}/>
                            <TextInput style={styles.inputs2}
                                       placeholder="Zip Code"
                                       ref={zip_code => this.zip_code = zip_code}
                                       onSubmitEditing={() => this.business_phone_number.focus()}
                                       returnKeyType='next'
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text,'zip_code')}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Business phone number"
                                       ref={business_phone_number => this.business_phone_number = business_phone_number}
                                       onSubmitEditing={() => this.website.focus()}
                                       returnKeyType='next'
                                       keyboardType={'numeric'}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text,'business_phone_number')}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Website"
                                       ref={website => this.website = website}
                                       returnKeyType='next'
                                       onSubmitEditing={() => this.facebook.focus()}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text,'website')}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Facebook"
                                       onSubmitEditing={Keyboard.dismiss}
                                       ref={facebook => this.facebook = facebook}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.updateValue(text,'facebook')}/>
                        </View>
                    </View>
                </ScrollView>

                <ScrollView
                    style={styles.slide}
                    behavior="padding"
                    keyboardVerticalOffset = {Header.HEIGHT + 20}
                    enabled
                >
                    <View style={styles.container}>

                                                    <View style={styles.containerFull}>

                                                        <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center',fontSize:16, color:'#fff',fontWeight:'bold',backgroundColor:'#ff4b98',paddingTop:20,paddingBottom:20}}>Read the terms to be a "Choice" baker.</Text></View>
                                                    </View>
                                <View style={styles.box}>
                                    <View style={styles.containerBox}>
                                        <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center',fontSize:16, color:'#ff4b98',fontWeight:'bold',marginBottom:20}}>Terms and benefits as a "Choice" baker:</Text></View>
                                        <View Style={{flex:1,flexDirection:"row"}}><Text style={{marginTop:5,marginBottom:10}}><Text style={{color:'#ff4b98',fontWeight:'bold'}}>1) </Text>You'll ONLY receive requests beginning at $250.</Text></View>
                                        <View Style={{flex:1,flexDirection:"row"}}><Text style={{marginTop:10,marginBottom:10}}><Text style={{color:'#ff4b98',fontWeight:'bold'}}>2) </Text>You'll receive unlimited requests in your geographic area.</Text></View>
                                        <View Style={{flex:1,flexDirection:"row"}}><Text style={{marginTop:10,marginBottom:10}}><Text style={{color:'#ff4b98',fontWeight:'bold'}}>3) </Text>You can choose which requests you reply to and how often.</Text></View>

                                    </View>
                                </View>
                                <TouchableHighlight style={[styles.bottomText]} onPress={() => this.props.navigation.navigate('BakerForm')}>
                                    <Text style={{fontSize:16,color:"#ff4b98"}} >Review the FAQs first</Text>

                                </TouchableHighlight>
                    </View>
                </ScrollView>
                <ScrollView
                    style={styles.slide}
                    behavior="padding"
                    keyboardVerticalOffset = {Header.HEIGHT + 20}
                    enabled
                ><View style={styles.container}>
                        <View style={styles.containerFull}>

                            <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center',fontSize:16, color:'#fff',fontWeight:'bold',backgroundColor:'#ff4b98',paddingTop:20,paddingBottom:20}}>Read the terms to be a "Choice" baker. Check the box below when you agree.</Text></View>
                        </View>
                        <View style={styles.box}>
                            <View style={styles.containerBox}>
                                <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center',fontSize:16, color:'#ff4b98',fontWeight:'bold',marginBottom:20}}>Terms and benefits as a "Choice" baker:</Text></View>
                                <View Style={{flex:1,flexDirection:"row"}}><Text style={{marginTop:5,marginBottom:10}}><Text style={{color:'#ff4b98',fontWeight:'bold'}}>4) </Text>You'll retain 89% of the revenue from each order and remit a 11% fee to Wedding Cake Wizard.</Text></View>
                                <View Style={{flex:1,flexDirection:"row"}}><Text style={{marginTop:10,marginBottom:10}}><Text style={{color:'#ff4b98',fontWeight:'bold'}}>5) </Text>Wedding Cake Wizard is a lead service. We only charge you when you make a sale.</Text></View>
                                <View Style={{flex:1,flexDirection:"row"}}><Text style={{marginTop:10,marginBottom:10}}><Text style={{color:'#ff4b98',fontWeight:'bold'}}>6) </Text>Wedding Cake Wizard makes no warranties nor guarentees the accuracy of the information provided by users.</Text></View>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center',width:'90%',marginTop:20,marginBottom:20}}>
                            <CheckBox
                                text={'Check the box agree to the "Select Baker\'s terms of service and privacy policy.'}
                                checked={this.state.check}
                                onPress={() => this.setState((state) => {
                                    return {check: !state.check};
                                })}
                                checkedColor={'#ff4b98'}
                                uncheckedColor={'#ff4b98'}
                            />


                        </View>
                    <ErrorText text={this.state.check_Error} />
                        <TouchableHighlight style={[styles.bottomText]} onPress={() => this.props.navigation.navigate('BakerForm')}>
                            <Text style={{fontSize:16,color:"#ff4b98"}} >Review the FAQs first</Text>
                        </TouchableHighlight>
                </View>


                </ScrollView>

                <ScrollView
                    style={styles.slide}
                    behavior="padding"
                    keyboardVerticalOffset = {Header.HEIGHT + 20}
                    enabled
                >

                        <View style={styles.containerFull}>
                            <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center',fontSize:16, color:'#fff',fontWeight:'bold',backgroundColor:'#ff4b98',paddingTop:20,paddingBottom:20}}>Provide Proof of Health Department Permit, Business License and Business Insurance</Text></View>
                        </View>
                        <View style={styles.box}>
                            <View style={styles.containerBox}>
                                <View Style={{flex:1,flexDirection:"row"}}><Text style={{textAlign:'center',fontSize:14, color:'#000',marginBottom:20}}>Use your phone's camera to take photos of your health department permit, business license and first page of your business insurance pollicy or their equivalents.</Text></View>
                            </View>
                        </View>
                        <View style={styles.box}>
                            <ScrollView
                                horizontal="true" >
                                <TouchableOpacity onPress={() => this.permit()}>
                                    <Text style={{textAlign:'center', fontWeight:'bold'}}>Permit</Text>
                                <View style={styles.boxImage}>

                                    <Image source={this.state.avatarSource1.uri ? this.state.avatarSource1 : images.iconimage } style={styles.imageUpload}  />
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.insurance()}>
                                    <Text style={{textAlign:'center', fontWeight:'bold'}}>License</Text>
                                    <View style={styles.boxImage}>
                                        <Image source={this.state.avatarSource2.uri ? this.state.avatarSource2 : images.iconimage} style={styles.imageUpload}  />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.license()}>
                                    <Text style={{textAlign:'center', fontWeight:'bold'}}>Insurance</Text>
                                    <View style={styles.boxImage}>
                                        <Image source={this.state.avatarSource3.uri ? this.state.avatarSource3 : images.iconimage} style={styles.imageUpload}  />
                                    </View>
                                </TouchableOpacity>
                            </ScrollView>

                        </View>
                    <TouchableOpacity style={[styles.bottomText]} onPress={() => this.submit()}>
                        <Text style={{fontSize:16,color:"#ff4b98"}} >Submit Application</Text>
                    </TouchableOpacity>

                </ScrollView>
            </Swiper>


        );

    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,

        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    containerBox:{

        justifyContent:'center',
        width: '70%',
        marginTop:30,
       marginBottom:30

    },


    bottomText:{
        marginTop:20,
        alignItems:'center',
        justifyContent: 'flex-end',
        marginBottom:20,
    },
    bottomText2:{
        width:'100%',
        position: 'absolute',
        justifyContent:'center',
        bottom:90,
paddingLeft:20,
    },

    box:{
        width:'100%',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:'#fff'

    },
    containerBox1:{
backgroundColor:'#fff',
        // justifyContent:'left',
        width: '100%',
        marginBottom:50

    },
    containerInside:{
        justifyContent:'center',
        width: '70%',

    },
    containerFull:{
        justifyContent:'center',
        width: '100%',
    },
    inputContainer: {
        marginBottom:20,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 3,
        borderBottomColor:'#ff4b98',
        width:'70%',

    },

    inputContainer1: {
        backgroundColor: '#f9f9f9',
        width:'70%',
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },

    inputContainerTop: {
        backgroundColor: '#f9f9f9',
        width:'70%',
        marginBottom:20,
        flexDirection: 'row',
        // alignItems:'center'
    },
    inputs:{
        // width:'100%',

        borderBottomColor: '#FFFFFF',

    },
    inputs1:{
        borderBottomWidth: 3,
        borderBottomColor:'#ff4b98',
        height:45,
        flex:1,
    },
    inputs2:{
        borderBottomWidth: 3,
        borderBottomColor:'#ff4b98',
        height:45,
        marginLeft:16,
        flex:1,
    },
    inputIcon:{
        marginTop:5,
        width:40,
        height:15,
        marginLeft:15,

        alignSelf: 'flex-end'
    },
    buttonContainer: {
        height:60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:200,

    },
    loginButton: {
        position: 'absolute',
        top:0,
        right:0,
        backgroundColor: "#ff4b98",
    },
    contentContainer: {
        paddingVertical: 20
    },
    forgotText:{
        width:'70%',
        alignItems: 'flex-end'
    },
    loginText: {
        color: 'white',
    },
    boxImage:{
        margin: 5,
        borderStyle: 'dotted',
        borderRadius : 1,
        borderWidth: 3,
        borderColor:'#aaa'
    }
    ,
    imageUpload:{
        height:200,
        width:200,
    },

    wrapper: {
    },
    slide1: {
      // width:ScreenWidth,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    slide: {

        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    slide3: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    slide4: {
        flex: 1,

        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    slide5: {
        flex: 1,

        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    }


});

export default BakerForm;