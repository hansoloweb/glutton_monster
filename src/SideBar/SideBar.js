import React from "react";
import { AppRegistry, Image, StatusBar, AsyncStorage } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";

const routes = ["Home", "Logout"];
export default class SideBar extends React.Component {

  _logout(){
    this.props.logout_now();
  }

  _navigate(data){
    if(data == 'Logout'){
      this._logout();
    }else{
      this.props.navigation.navigate(data);
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Image
            style={{
              height: 250,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}
            source={{
              uri: "https://imgflip.com/s/meme/Smiling-Cat.jpg"
            }}
            />
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this._navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}