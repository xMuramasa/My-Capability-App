import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Calendario from "./Calendario"
import Rutinas from "./Rutinas"

class Planificacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showState: [false, true],
        };
    }

    changeCalendaio = () => {
        this.setState({ showState: [false, true] })
    }

    changeRutina = () => {
        this.setState({ showState: [true, false] })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "row"}}>

                    <View style={{ flexDirection: "column", width: '50%' }}>
						<TouchableOpacity 
                            style={[styles.buttonStyle, {borderLeftWidth: 1}]}
                            onPress={() => this.changeCalendaio()}
						>
							<View>
								<Text style={styles.textStyle}> Calendario </Text>
							</View>
						</TouchableOpacity>
					</View>

                    <View style={{ flexDirection: "column", width: '50%'}}>
                        <TouchableOpacity
                            style={[styles.buttonStyle, { borderRightWidth: 1 }]}
                            onPress={() => this.changeRutina()}
						>
							<View>
								<Text style={styles.textStyle}> Rutinas </Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>

                {this.state.showState[0] ? <Rutinas/> : null}

                {this.state.showState[1] ? <Calendario /> : null}

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: "#E7E7E7",
        flexDirection: "column",
	},
    buttonStyle: {
        justifyContent: "center",
        alignItems: 'center',
		backgroundColor: "#FF9933",
        borderColor: "black",
        borderBottomWidth: 2,
		height: 70,
		width: "100%",
	},
    textStyle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        textTransform: "uppercase",
    },

});

export default Planificacion;