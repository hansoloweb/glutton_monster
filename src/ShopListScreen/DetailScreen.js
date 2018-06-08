import React from "react";
import { AppRegistry, View, StatusBar, AsyncStorage, RefreshControl, Alert, StyleSheet, Image } from "react-native";
import { Container, Body, Content, Thumbnail, Header, Left, Right, Icon, Title, Input, Item, Label, Button, Text, List, ListItem, StyleProvider, Card, CardItem, H1, H3 } from "native-base";
import getTheme from './../../native-base-theme/components';
import material from './../../native-base-theme/variables/material';
import { Transition } from "react-navigation-fluid-transitions";

export default class Detail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			shop_id: '',
			shop_data: '',
			total_stars: '0',
		};
	}

	componentWillMount(){
		const shop_id = this.props.navigation.getParam('shop_id', 'shop_id');
		const shop_name = this.props.navigation.getParam('shop_name', 'shop_name');

		this.setState({shop_id: shop_id});
		this.setState({shop_name: shop_name});
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

		var shop_data = {total_reviews:"2", total_rating:"9"};

		this.setState({shop_data:shop_data});

		if(shop_data){
			var total_stars = shop_data.total_rating / shop_data.total_reviews;
			this.setState({total_stars:total_stars});
		}

	}

	rating_stars(){
		var total_stars = this.state.total_stars;

		if(!total_stars){
			return (<Text>No Reviews</Text>);
		}else{
			var stars = [];

			for(let i = 1; i < 6; i++){
				if(total_stars >= i){
					stars.push(
						<Icon name="ios-star" key={i} style={styles.rating_icon} />
					)
				}else if(total_stars >= (i-0.5)){
					stars.push(
						<Icon name="ios-star-half" key={i} style={styles.rating_icon} />
					)
				}else{
					stars.push(
						<Icon name="ios-star-outline" key={i} style={styles.rating_icon} />
					)
				}

				if(i == 5){
					stars.push(
						<Text note key={i}> {total_stars} Reviews</Text>
					)
				}
			}
			return (stars);
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
						<Title>{this.state.shop_name}</Title>
						</Body>
						{/*<Right />*/}
					</Header>
					<Content padder>
						<View style={{flexDirection:"row"}}>
							<View style={{flex:1}}>
								<Thumbnail large source={{uri: 'http://cdn.realscreen.com/wp/wp-content/uploads/2017/08/Gordon-Ramsay.jpg?d4781b'}} />
							</View>
							<View style={{flex:2}}>
								<Text style={{fontWeight:"bold"}}>{this.state.shop_name.toUpperCase()}</Text>
								<Text note>Lunch, Dinner</Text>
								<View style={{flexDirection:"row", alignItems: 'center'}}>{this.rating_stars()}</View>
							</View>
						</View>
						<View>

						</View>
					</Content>
				</Container>
			</StyleProvider>
		);
	}
}

var styles = StyleSheet.create({
    rounded_container: {
        flex: 1,
        width: 120,
        height: 120,
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 120/2,
        overflow:"hidden",
    },
    rounded_image: {
    	flex: 1,
        width:null,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rating_icon:{
    	fontSize:22,
    }
});