import React from "react";
import { AppRegistry, View, StatusBar, AsyncStorage, RefreshControl, Alert, StyleSheet, Image } from "react-native";
import { Container, Body, Content, Thumbnail, Header, Left, Right, Icon, Title, Input, Item, Label, Button, Text, List, ListItem, StyleProvider, Card, CardItem, H1, H3 } from "native-base";
import getTheme from './../../native-base-theme/components';
import material from './../../native-base-theme/variables/material';
import { FluidNavigator, Transition } from "react-navigation-fluid-transitions";

export default class Stories extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			category: '',
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
							<Card>
					            <CardItem>
									<Left>
										<Thumbnail source={{uri: 'http://cdn.realscreen.com/wp/wp-content/uploads/2017/08/Gordon-Ramsay.jpg?d4781b'}} />
									<Body>
										<Text>Gordon Ramsay</Text>
										<Text note>Hell Chef</Text>
									</Body>
									</Left>
								</CardItem>
								<CardItem cardBody>
									<Image source={{uri: 'https://crescentfoods.com/wp-content/uploads/2014/07/succulent-portion-of-grilled-beef-steak.jpg'}} style={{height: 200, width: null, flex: 1}}/>
								</CardItem>
								<CardItem>
									<Text>The Perfect Steak.</Text>
								</CardItem>
								<CardItem>
									<Left>
										<Button transparent>
										<Icon active name="thumbs-up" />
										<Text>12 Likes</Text>
									</Button>
									</Left>
									<Body>
										<Button transparent>
										<Icon active name="chatbubbles" />
										<Text>4 Comments</Text>
									</Button>
									</Body>
									<Right>
										<Text>11h ago</Text>
									</Right>
					            </CardItem>
				          	</Card>
						</Transition>
					</Content>
				</Container>
			</StyleProvider>
		);
	}
}