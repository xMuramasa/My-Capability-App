import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';


class Consejos extends Component {

    render() {
        return (
            <View style={styles.container}>


                <View style={styles.rowView}>

                    <View>
                        <TouchableOpacity 
							onPress={() => this.props.navigation.navigate('ConsejosN')}
							style={styles.buttonStyle}
						>
                            <View style={styles.buttonView}>
                                <Image style={styles.imageStyle} source={require("../images/consejosNutricion.png")}/>
                                <Text style={styles.textStyle}> Nutrición </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

				<View style={styles.rowView}>

                    <View>
                        <TouchableOpacity 
							onPress={() => this.props.navigation.navigate('ConsejosF')}
							style={styles.buttonStyle}
						>
                            <View style={styles.buttonView}>
                                <Image style={styles.imageStyle} source={require("../images/consejosFisicos.png")}/>
                                <Text style={styles.textStyle}> Entrenamiento </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* <View style={styles.rowView}>
                    <View>
                        <TouchableOpacity 
                            style={styles.buttonStyle2}
                            onPress={() => this.props.navigation.navigate('Inicio')}
                        >
                            <View style={styles.buttonView2}>
                                <Image style={styles.imageStyle2} source={require("../images/patras.png")} />
                                <Text style={styles.textStyle}>Atrás </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> */}

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

export default Consejos;
