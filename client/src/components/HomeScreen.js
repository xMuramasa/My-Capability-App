import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image,ScrollView } from 'react-native';
import getUserData from "../API/getUserData.js";
import GLOBAL from './global.js'


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#E7E7E7",
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: "column"
	},
	buttonStyle: {
		backgroundColor: "#FF9933",
		borderRadius: 10,
		padding: 5,
		margin: 20,
		height: 150,
		width: 150,
		
	},
	buttonStyle2: {
		backgroundColor: "#FF9933",
		borderRadius: 10,
		padding: 5,
		margin: 20,
		height: 50,
		width: 250,
	},
	imageStyle: {
		height: 100,
		width: 100,
	},
	imageStyle2: {
		height: 40,
		width: 40,
	},
	logosStyle:{
		height: 300,
		width: 300,
		marginTop:-80,
		marginBottom:-30
	},
	textStyle: {
		fontSize: 16,
		fontWeight: "bold",
		margin: 5,
		color: "black"
	},
	textStyle2: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 10,
		color: "black"
	},
	buttonView: {
		justifyContent: 'center',
        alignItems: 'center'
	},
	buttonView2: {
		justifyContent: 'center',
        alignItems: 'center',
		flexDirection: "row"
	},
	rowView: {
		flexDirection: "row",
	}
});


class HomeScreen extends Component {
	constructor(props) {
        super(props);
    }
	async componentDidMount() {
        getUserData(GLOBAL.user_id).then((data) => {
        	GLOBAL.h = parseFloat(data.height);
        })       
    }

    render() {
        return (
		<ScrollView>
			<View style={styles.container}>

				<Image style={styles.logosStyle} source={require("../images/logohome.png")} />

				<View style={styles.rowView}>

					<View>
						<TouchableOpacity 
							style={styles.buttonStyle}
							onPress={() => this.props.navigation.navigate('Perfil')}
						>
							<View style={styles.buttonView}>
								<Image style={styles.imageStyle} source={require("../images/perfil.png")}/>
								<Text style={styles.textStyle}> Perfil </Text>
							</View>
						</TouchableOpacity>
					</View>

					<View>
						<TouchableOpacity 
							style={styles.buttonStyle}
							onPress={() => this.props.navigation.navigate('Mediciones')}
						>
							<View style={styles.buttonView}>
								<Image style={styles.imageStyle} source={require("../images/realizarmedicion.png")} />
								<Text style={styles.textStyle}> Medir</Text>
							</View>
						</TouchableOpacity>
					</View>

				</View>

				<View style={styles.rowView}>
					<View>
						<TouchableOpacity 
							style={styles.buttonStyle}
							onPress={() => this.props.navigation.navigate('Ranking')}
						>
							<View style={styles.buttonView}>
								<Image style={styles.imageStyle} source={require("../images/ranking.png")} />
								<Text style={styles.textStyle}> Ranking </Text>
							</View>
						</TouchableOpacity>
					</View>

					<View>
						<TouchableOpacity 
							style={styles.buttonStyle}
							onPress={() => this.props.navigation.navigate('Historiales')}
						>
							<View style={styles.buttonView}>
								<Image style={styles.imageStyle} source={require("../images/historial.png")} />
								<Text style={styles.textStyle}> Historial </Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>

				<View>
					<TouchableOpacity 
						style={styles.buttonStyle}
						onPress={() => this.props.navigation.navigate('Consejos')}
					>
						<View style={styles.buttonView}>
							<Image style={styles.imageStyle} source={require("../images/consejos.png")} />
							<Text style={styles.textStyle}> Consejos </Text>
						</View>
					</TouchableOpacity>
				</View>

				<View style={styles.rowView}>
					<View>
							<TouchableOpacity 
								style={styles.buttonStyle2}
								onPress={() => this.props.navigation.navigate('Iniciar sesion')}
							>
							<View style={styles.buttonView2}>
								<Image style={styles.imageStyle2} source={require("../images/logout.png")} />
								<Text style={styles.textStyle}> Cerrar sesión </Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>

			</View>
		</ScrollView>
	);
    }

}

export default HomeScreen;
