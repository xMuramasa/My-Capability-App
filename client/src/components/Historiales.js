import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';

class HomeScreen extends Component {

    render() {
        return (
            <View style={styles.container}>


                <View style={styles.rowView}>

                    <View>
                        <TouchableOpacity 
							onPress={() => this.props.navigation.navigate('HistorialIndividual')}
							style={styles.buttonStyle}
						>
                            <View style={styles.buttonView}>
                                <Image style={styles.imageStyle} source={require("../images/individualmedicion.png")}/>
                                <Text style={styles.textStyle}> Individual </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

				<View style={styles.rowView}>

                    <View>
                        <TouchableOpacity 
							onPress={() => this.props.navigation.navigate('Graficos')}
							style={styles.buttonStyle}
						>
                            <View style={styles.buttonView}>
                                <Image style={styles.imageStyle} source={require("../images/graficos.png")}/>
                                <Text style={styles.textStyle}> Gráficos Individuales </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                

            </View>
	);
    }
}


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

export default HomeScreen;