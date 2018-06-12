import React from "react";
import { StatusBar, Dimensions, StyleSheet, ScrollView, Image, View, TouchableOpacity, AsyncStorage } from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, StyleProvider,H1, H3, Picker } from "native-base";
import getTheme from './../../native-base-theme/components';
import material from './../../native-base-theme/variables/material';
import { NavigationActions  } from "react-navigation";
import { FluidNavigator, Transition } from "react-navigation-fluid-transitions";

class Point extends React.Component {
    render() {
        return [
            <Text style={{textAlign:'right', flex: 1}} key={this.props}>{this.props.name}</Text>,
            <Text style={{flex: 1}} key={this.props}>{this.props.value}</Text>
        ];
    }
}

export default class HomeScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            username:'',
            location:'1',
        };
    }

    money_format(amount) {
        var p = parseFloat(amount).toFixed(2).split(".");
        return p[0].split("").reverse().reduce(function(acc, amount, i, orig) {
            return  amount=="-" ? acc : amount + (i && !(i % 3) ? "," : "") + acc;
        }, "") + "." + p[1];
    }

    async componentWillMount() {
        try {
            var user_data = await AsyncStorage.getItem('user_data:key');
            
            if(user_data){
                user_data = JSON.parse(user_data);
                this.setState({ username: user_data['username'] });

            }
        } catch (error) {
        // Error retrieving data
        }
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Header>
                        <Left>
                            <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name="menu" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Glutton Cat</Title>
                        </Body>
                        {/*<Right />*/}
                    </Header>
                    <Content>
                        <View style={{paddingLeft:10, paddingRight:10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Icon name='ios-pin-outline'/>
                            <Picker
                                selectedValue={this.state.location}
                                style={{ flex:1 }}
                                iosHeader="Select one"
                                mode="dropdown"
                                onValueChange={(itemValue, itemIndex) => this.setState({location: itemValue})}>
                                <Picker.Item label="Kuala Lumpur" value="1" />
                                <Picker.Item label="Selangor" value="2" />
                                <Picker.Item label="Penang" value="3" />
                                <Picker.Item label="Melaka" value="4" />                                
                            </Picker>
                        </View>
                        <View>
                            <TouchableOpacity 
                                style={[styles.item]}
                                onPress={() => this.props.navigation.navigate('ShopList',{category:'NEW & HOT'})}
                            >
                                <Image source={require('../../img/trendy_food.jpg')} style={styles.bgImg} />
                                <View style={styles.overlay} />
                                <Transition shared="NEW & HOT">
                                    <Text style={[styles.colorWhite, styles.bold]}>{`NEW & HOT`}</Text>
                                </Transition>
                                <Text style={[styles.colorWhite]}>{`1 Restaurant(s)`}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.item]}
                                onPress={() => this.props.navigation.navigate('ShopList',{category:'NEAR ME NOW'})}
                            >   
                                <Image source={require('../../img/healthy_food.jpg')} style={styles.bgImg} />
                                <View style={styles.overlay} />
                                <Transition shared="NEAR ME NOW">
                                    <Text style={[styles.colorWhite, styles.bold]}>{`NEAR ME NOW`}</Text>
                                </Transition>
                                <Text style={[styles.colorWhite]}>{`2 Restaurant(s)`}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.item]}
                                onPress={() => this.props.navigation.navigate('ShopList',{category:'OFFERS & DEALS'})}
                            >   
                                <View style={{height:"100%", width:"100%", position:"absolute"}}><Image source={{uri: 'https://s-media-cache-ak0.pinimg.com/originals/bf/79/30/bf79308f01a478e25f469df25e88b4bf.jpg'}} style={{flex:1, alignSelf: "stretch", justifyContent: "center", alignItems: "center", resizeMode:"stretch"}} /></View>
                                <View style={styles.overlay} />
                                <Transition shared="OFFERS & DEALS">
                                    <Text style={[styles.colorWhite, styles.bold]}>{`OFFERS & DEALS`}</Text>
                                </Transition>
                                <Text style={[styles.colorWhite]}>{`1 Restaurant(s)`}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.item]}
                                onPress={() => this.props.navigation.navigate('Stories',{category:'STORIES'})}
                            >   
                                <Image source={require('../../img/food_stories.jpg')} style={styles.bgImg} />
                                <View style={styles.overlay} />
                                <Transition shared="STORIES">
                                    <Text style={[styles.colorWhite, styles.bold]}>{`STORIES`}</Text>
                                </Transition>
                            </TouchableOpacity>
                        </View>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

var styles = StyleSheet.create({
    item: {
        flex: 1,
        height: Dimensions.get('window').height * 0.5 * 0.37,
        // borderWidth: 1,
        // borderColor: "lightgray",
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#635DB7'
        overflow:'hidden',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    colorWhite:{
        color: 'white'
    },
    bgImg:{
        // flex:1,
        position:'absolute',
        resizeMode:'stretch',
    },
    bold:{
        fontWeight: 'bold',
        fontSize: 30,
    }
});