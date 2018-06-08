import React from "react";
import ShopListScreen from "../ShopListScreen/ShopListScreen.js";
import DetailScreen from "../ShopListScreen/DetailScreen.js";
import StoriesScreen from "../StoriesScreen/StoriesScreen.js";
import SideBar from "../SideBar/SideBar.js";
import TabBar from "../TabBar/TabBar.js";
import { DrawerItems, SafeAreaView, createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { View } from "react-native";
import { Button, Text, Icon, Footer, FooterTab} from "native-base";
import { FluidNavigator, Transition } from "react-navigation-fluid-transitions";


export default class HomeRouter extends React.Component {
  constructor(props) {
    super(props);
  };
  render(){

    const HomeScreenStack = FluidNavigator(
      {
        Home: { screen: TabBar },
        ShopList: { screen: ShopListScreen },
        Details: { screen: DetailScreen },
        Stories: { screen: StoriesScreen },
      },
    );

    const HomeScreenRouter = createDrawerNavigator(
      {
        Home: { screen: HomeScreenStack },
      },
      {
        contentComponent: props => <SideBar {...props} logout_now={this.props.onLogoutPress}/>,
        drawerPosition: 'left',
      }
    );

    return(
      <HomeScreenRouter/>
    )
  }
}
// export default HomeScreenRouter;