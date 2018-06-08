import React from "react";
import { StatusBar, Dimensions, StyleSheet, ScrollView, Image, View, TouchableOpacity, AsyncStorage } from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, StyleProvider,H1, H3 } from "native-base";
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

export default class Search extends React.Component {

    constructor() {
        super();
        this.state = {
            username:'',
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
                            <Title>Glutton Monster</Title>
                        </Body>
                        <Right>
                        	<Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='md-options' />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <View>
                        </View>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

var styles = StyleSheet.create({

});