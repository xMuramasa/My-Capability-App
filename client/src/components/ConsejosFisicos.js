import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView  } from 'react-native';
import getNewResults from "../API/getNewResults.js";
import GLOBAL from './global.js'
import {principiante} from '../ejercicios/principiante.js'
import {intermedio} from '../ejercicios/intermedio.js'
import {avanzado} from '../ejercicios/avanzado.js'


class ConsejosF extends Component {

    constructor(props) {
        super(props);
        this.state = {
            puntuacion: 0,
            passData: [],
            flage: [false, false, false]
        };
    }


    //la puntuación debería depender del sexo
    componentDidMount() {
        getNewResults(GLOBAL.user_id).then((data) => {
            data.forEach(element => {
                this.setState({
                    puntuacion: this.state.puntuacion + (parseFloat(element.result) * 330)
                })
            })
        })
    }
    
    componentDidUpdate(_, prevState){
        if(this.state.puntuacion != prevState.puntuacion){
            if (this.state.puntuacion < 1001 ){
                this.setState({ flage: [true, false, false]})
            }
            else if (this.state.puntuacion < 2001 ){
                this.setState({ flage: [false, true, false]})
            }
            else if (2001 < this.state.puntuacion){
                this.setState({ flage: [false, false, true] })
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.textStyleBold, {textAlign: 'center', fontSize: 20}]}>
                    Tus consejos se generarán en base a tu puntuación de estado físico:
                </Text>
                <Text style={[styles.textStyleBold, {textAlign: 'center', fontSize: 25}]}>
                    {this.state.puntuacion.toFixed(0)}
                </Text>

                {this.state.flage[0] &&
                    <View style={styles.rowView}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('MejorarSalto', {
                                    dat: principiante
                                })}
                                style={styles.buttonStyle}
                            >
                                <View style={styles.buttonView}>
                                    <Text style={styles.textStyle}> Mejorar salto</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {this.state.flage[1] &&
                    <View style={styles.rowView}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('MejorarSalto', {
                                    dat: intermedio
                                })}
                                style={styles.buttonStyle}
                            >
                                <View style={styles.buttonView}>
                                    <Text style={styles.textStyle}> Mejorar salto</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                }
                {this.state.flage[2] &&
                    <View style={styles.rowView}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('MejorarSalto', {
                                    dat: avanzado
                                })}
                                style={styles.buttonStyle}
                            >
                                <View style={styles.buttonView}>
                                    <Text style={styles.textStyle}> Mejorar salto</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                }

                {   this.state.flage[0] &&
                    <View style={styles.rowView}>
                        <View>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('MejorarVelocidad', {
                                    dat: principiante
                                })}
                                style={styles.buttonStyle}
                            >
                                <View style={styles.buttonView}>
                                    <Text style={styles.textStyle}> Mejorar velocidad </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {   this.state.flage[1] &&
                    <View style={styles.rowView}>
                        <View>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('MejorarVelocidad', {
                                    dat: intermedio
                                })}
                                style={styles.buttonStyle}
                            >
                                <View style={styles.buttonView}>
                                    <Text style={styles.textStyle}> Mejorar velocidad </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {   this.state.flage[2] &&
                    <View style={styles.rowView}>
                        <View>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('MejorarVelocidad', {
                                    dat: avanzado
                                })}
                                style={styles.buttonStyle}
                            >
                                <View style={styles.buttonView}>
                                    <Text style={styles.textStyle}> Mejorar velocidad </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

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
		height: 50,
		width: 200,
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
	},
    textStyleBold: {
		fontSize: 18,
		fontWeight: "bold",
		margin: 5,
		color: "black"
	}
});

export default ConsejosF;
