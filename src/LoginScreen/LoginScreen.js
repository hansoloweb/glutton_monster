import React from "react";
import { StatusBar, Dimensions, StyleSheet, Image, View, Linking, ActivityIndicator, AsyncStorage, Alert } from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Footer, Content, Text, Picker, Form, Item, Input, Label, StyleProvider} from "native-base";
import getTheme from './../../native-base-theme/components';
import material from './../../native-base-theme/variables/material';
import { StackNavigator, NavigationActions  } from "react-navigation";

const endpoint = 'https://login.php';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            username: '',
            password: '',
        };
    }

    async _login(){
        this.setState({
            loading: true
        });

        var error = false;
        const { username } = this.state;
        const { password } = this.state;

        if(username.trim() == ""){
            error = true;
            Alert.alert('Please Enter Login Username');
            this.refs.username._root.focus();
        }
        else if(password.trim() == ""){
            error = true;
            Alert.alert('Please Enter Login Password');
            this.refs.password._root.focus();
        }

        if(error){
            this.setState({
                loading: false
            });
            return;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 
                    Accept: 'application/json',
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    'username':username,
                    'password':password,
                }),
            });

            const result = await response.json();

            var data_arr = result;

            if (data_arr['status'] == 'true') {

                var user_data = data_arr['data'];

                try {
                    await AsyncStorage.setItem('user_data:key', JSON.stringify(user_data));
                } catch (error) {
                    // Error saving data
                }

                this.setState({
                    loading: false
                });

                this.props.onLoginPress();

            } 
            else {
                Alert.alert('Your username and password does not match.');
                this.setState({
                    loading: false
                });
            }

        } catch (error) {
            console.error(error);
        }

    }
    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Content padder>
                        <View style={{justifyContent: 'center',alignItems:'center'}}>
                            <Image source={require('./../../img/login-logo2.png')}
                                style={{ resizeMode: 'stretch'}} 
                            />
                        </View>
                        <Item style={{marginTop:30}}>
                            <Icon active name='md-contact' />
                            <Input placeholder={`Email`}
                                returnKeyType='next'
                                ref='username'
                                onChangeText={(username) => this.setState({username})}
                                value={this.state.username}
                                onSubmitEditing={(event) => {this.refs.password._root.focus();}}
                            />
                        </Item>
                        <Item>
                            <Icon active name='md-lock' />
                            <Input placeholder={`Password`} secureTextEntry
                                ref='password'
                                onChangeText={(password) => this.setState({password})}
                                value={this.state.password}
                                onSubmitEditing={(event) => {this._login();}}
                            />
                        </Item>
                        <Text style={{'textAlign':'right', marginTop: 10}} } >{`Forgot Password`}</Text>
                        
                        <Button full block primary
                            style={{ marginTop: 50 }}
                            onPress={() =>  this._login()}
                        >
                            <Text>Login</Text>
                        </Button>

                        
                    </Content>
                    <View style={{height: 30}}>
                        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}} >
                            <Text style={{color:'gray', fontSize: 13}}>Copyright © 2018 Hansolo. All rights reserved.</Text>
                        </View>
                    </View>
                    {this.state.loading &&
                        <View style={styles.loading}><ActivityIndicator size="large" color="#0000ff" /></View>
                    }
                </Container>
            </StyleProvider>
        );
    }
}

var styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF88'
    }
});