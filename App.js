import React, { Component } from "react";
import { AppRegistry, AsyncStorage } from "react-native";
import HomeScreen from "./src/HomeScreen/index";
export default class AwesomeApp extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn:false
    };
  }

  signOut() {
    AsyncStorage.clear();

    this.setState({
      isLoggedIn: false
    })
  }
  async componentWillMount() {

    try {
      const user_data = await AsyncStorage.getItem('user_data:key');
      if (user_data){
        this.setState({ isLoggedIn: true });
        // console.error(user_data);
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  render() {
     return <HomeScreen onLogoutPress={() => this.signOut()}/>;
    
  }
}

AppRegistry.registerComponent('AwesomeApp', () => AwesomeApp);