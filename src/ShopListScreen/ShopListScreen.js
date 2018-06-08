import React from "react";
import { AppRegistry, View, StatusBar, AsyncStorage, RefreshControl, Alert, StyleSheet, FlatList } from "react-native";
import { Container, Body, Content, Header, Left, Right, Icon, Title, Input, Item, Label, Button, Text, List, ListItem, StyleProvider, Card, CardItem, Thumbnail } from "native-base";
import getTheme from './../../native-base-theme/components';
import material from './../../native-base-theme/variables/material';
import { Transition } from "react-navigation-fluid-transitions";

class ListingItem extends React.Component {
    render() {
        return [
            <ListItem key={this.props} onPress={this.props.onDetailPress}>
				<Thumbnail square size={80} source={{ uri: this.props.img }} />
				<Body>
					<Text>{this.props.name}</Text>
					<View style={{flexDirection: 'row'}}>
						{this.props.tags.map((obj) => <Text note key={obj}>{obj}</Text>)}
					</View>
				</Body>
            </ListItem>
        ];
    }
}

export default class ShopList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			category: '',
			shop_listing: '',
		};
	}

	componentWillMount(){
		const category = this.props.navigation.getParam('category', 'Category');

		if(category){
			this.setState({category: category});
		}
	}

	async componentDidMount() {
		try {
			var user_data = await AsyncStorage.getItem('user_data:key');

			if(user_data){
				user_data = JSON.parse(user_data);

				this.setState({ username: user_data['username'] });
			}
		} catch (error) {
    		// Error retrieving data
		}

		var shop_list = [{key:"1", name:"Aoki Tei", tags:["#Japanese", "#Buffet"], img:"http://www.sunwaynexis.com.my/wp-content/uploads/2015/07/aoki-tei.jpg"}, {key:"2", name:"Tony Roma", tags:["#Western", "#Steak"], img:"http://www.freestufffinder.ca/wp-content/uploads/2013/11/tony-roma.jpg"} ];
		this.setState({shop_listing : shop_list});
	}

	render() {
		return (
			<StyleProvider style={getTheme(material)}>
				<Container>
					<Header>
						<Left>
							<Button transparent onPress={() => this.props.navigation.goBack()}>
								<Icon name="arrow-back" />
							</Button>
						</Left>
						<Body>
						<Transition shared={this.state.category}><Title> {this.state.category}</Title></Transition>
						</Body>
						{/*<Right />*/}
					</Header>
					<Content padder>
						<Transition appear="horizontal">
							<View>
								<FlatList
									data={this.state.shop_listing}
						          	renderItem={({item}) => <ListingItem name={item.name} keys={item.key} tags={item.tags} img={item.img} onDetailPress={() => this.props.navigation.navigate('Details', {
					                shop_id: item.key,
					                shop_name: item.name,
					                })}/>}
						        />
							</View>
						</Transition>
					</Content>
				</Container>
			</StyleProvider>
		);
	}
}