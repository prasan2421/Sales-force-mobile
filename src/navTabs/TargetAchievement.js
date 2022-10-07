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
    processColor,
    ActivityIndicator, Keyboard, StatusBar
} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';
// import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons'

class New extends Component {


    constructor(props) {
        super(props);
        this.state = {
            legend: {
                enabled: true,
                textSize: 14,
                form: "SQUARE",
                formSize: 14,
                xEntrySpace: 10,
                yEntrySpace: 5,
                wordWrapEnabled: true
            },
            data: {
                dataSets: [{
                    values: [5, 40, 77, 81],
                    label: 'Target in CLD',
                    config: {
                        drawValues: false,
                        colors: [processColor('red')],
                    }
                }, {
                    values: [40, 5, 50, 23],
                    label: 'Target in Value',
                    config: {
                        drawValues: false,
                        colors: [processColor('blue')],
                    }
                }],
                config: {
                    barWidth: 0.35,
                    group: {
                        fromX: 0,
                        groupSpace: 0.1,
                        barSpace: 0.1,
                    },
                }
            },
            xAxis: {
                valueFormatter: ['Target', 'Achievements', 'Difference', 'Achievement'],
                granularityEnabled: true,
                granularity: 1,
                axisMaximum: 5,
                axisMinimum: 0,
                centerAxisLabels: true
            },

            marker: {
                enabled: true,
                markerColor: processColor('#F0C0FF8C'),
                textColor: processColor('white'),
                markerFontSize: 14,
            },

        };



    }


    componentDidMount() {
        this.setState({...this.state, highlights: [{x: 1, y:40}, {x: 2, y:50}]})
    }


    // getFromAsyncStorage = async () => {
    //
    //
    //     const access_token = await AsyncStorage.getItem('access_token');
    //
    //     fetch('http://weddingcake.cyya.com/api/brides/bid-requests?service=select&service_type=free&bid_request_type=new', {
    //         headers: {
    //             Authorization: 'Bearer ' + access_token
    //         }
    //     })
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         if(responseJson.errors) {
    //
    //             alert(responseJson.errors);
    //         }
    //         else if(responseJson.data) {
    //
    //         }
    //     })
    //     .catch((error) => {
    //
    //         alert('An error occurred');
    //     })
    //
    // };
    signOutAsync = async (navigation) => {
        await AsyncStorage.clear();
        navigation.navigate('Auth');
    };
    toggle(){
        this.props.navigation.toggleDrawer();
    };

    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            this.setState({...this.state, selectedEntry: null})
        } else {
            this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
        }

        console.log(event.nativeEvent)
    }


    render() {
        return (
            <View style={{flex: 1}}>

                <View style={{height:10,backgroundColor: '#F5FCFF'}}>

                </View>

                <View style={styles.container}>
                    <BarChart
                        style={styles.chart}
                        xAxis={this.state.xAxis}
                        data={this.state.data}
                        legend={this.state.legend}
                        drawValueAboveBar={false}
                        onSelect={this.handleSelect.bind(this)}
                        onChange={(event) => console.log(event.nativeEvent)}
                        highlights={this.state.highlights}
                        marker={this.state.marker}
                    />
                </View>

            </View>
        );
    }
}

export default New;
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    }
});