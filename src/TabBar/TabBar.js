import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from "../HomeScreen/HomeScreen";
import SearchScreen from "../SearchScreen/SearchScreen";
import { createBottomTabNavigator  } from 'react-navigation';

export default createBottomTabNavigator (
  {
    Home: HomeScreen,
    Search: SearchScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Search') {
          iconName = `ios-search${focused ? '' : '-outline'}`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);