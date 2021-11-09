import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';

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
	imageStyle: {
		height: 100,
		width: 100,
	},
	textStyle: {
		fontSize: 16,
		fontWeight: "bold",
		margin: 5,
		color: "black"
	},
	buttonView: {
		justifyContent: 'center',
        alignItems: 'center'
	},
	rowView: {
		flexDirection: "row",
	}
});

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

            </View>
		);
    }

}

export default Consejos;