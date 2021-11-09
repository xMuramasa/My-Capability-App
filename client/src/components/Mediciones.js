import React, { Component } from "react";
import { NativeModules, Text, View, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import GLOBAL from './global.js'

//import { withNavigation } from 'react-navigation/native';

const { ConnectionModule } = NativeModules;

const styles = StyleSheet.create({
	container: {
        flex: 1,
		backgroundColor: "#E7E7E7",
        flexDirection: "column",
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
		height: 35,
		width: 35,
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
		marginBottom: 5,
		color: "black"
	},
	buttonView: {
		justifyContent: 'center',
        alignItems: 'center'
	},
	buttonView2: {
		justifyContent: 'center',
        alignItems: 'center',
		flexDirection: "row",
	},
	rowView: {
		flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -10
	},
    columnView: {
        flexDirection: "column",
    },
    headerStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: 20,
        marginLeft: 30,
    },
    dividerStyle: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginLeft: 20,
        marginRight: 20,
    },
});

const { height } = Dimensions.get('window');

const saltoVertical = () => {
    console.log('vertical ', GLOBAL.height );
    //calcular salto en Java
    ConnectionModule.startSaltoVertical(GLOBAL.user_id, GLOBAL.height);       // IMPLEMENTAR OBTENER ALTURA DE USUARIO
}

const saltoHorizontal = () => {
    console.log('horizontal', GLOBAL.height );
    //calcular salto en Java
    ConnectionModule.startSaltoHorizontal(GLOBAL.user_id, GLOBAL.height);       // IMPLEMENTAR OBTENER ALTURA DE USUARIO
}

class Mediciones extends Component {
    state = {
        screenHeight: height,
    };

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight });
    };

    render() {
        const scrollEnabled = this.state.screenHeight > height;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollview}
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={this.onContentSizeChange}
                >
                    <View>
                        <Text style={styles.headerStyle}>Medición individual {"\n"}</Text>
                        <View style={styles.dividerStyle}/> 
                    </View>

                    <View style={styles.rowView}>
                        <View>
                            <TouchableOpacity 
                                onPress={()=> {saltoVertical()}}
                                style={styles.buttonStyle}
                            >
                                <View style={styles.buttonView}>
                                    <Image style={styles.imageStyle} source={require("../images/saltovertical.png")} />
                                    <Text style={styles.textStyle}> Salto vertical </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity 
                                onPress={()=> {saltoHorizontal()}} 
                                style={styles.buttonStyle}>
                                <View style={styles.buttonView}>
                                    <Image style={styles.imageStyle} source={require("../images/saltohorizontal.png")} />
                                    <Text style={styles.textStyle}> Salto horizontal </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.rowView}>
                        <View>
                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('Velocidad')}
                            style={styles.buttonStyle}>
                                <View style={styles.buttonView}>
                                    <Image style={styles.imageStyle} source={require("../images/sprint.png")} />
                                    <Text style={styles.textStyle}> Velocidad </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.buttonStyle}
                            onPress={() => this.props.navigation.navigate('Calentamiento')}>
                                <View style={styles.buttonView}>
                                    <Image style={styles.imageStyle} source={require("../images/calentamiento.png")} />
                                    <Text style={styles.textStyle}> Calentamiento </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View>
                        <Text style={styles.headerStyle}>Medición grupal {"\n"}</Text>
                        <View style={styles.dividerStyle}/>
                    </View>

                    <View style={styles.rowView}>
                        <View>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <View style={styles.buttonView}>
                                    <Image style={styles.imageStyle} source={require("../images/saltoverticalgrupal.png")} />
                                    <Text style={styles.textStyle}> Salto vertical</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <View style={styles.buttonView}>
                                    <Image style={styles.imageStyle} source={require("../images/saltohorizontalgrupal.png")} />
                                    <Text style={styles.textStyle}> Salto horizontal</Text>
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
                </ScrollView>
                
            </SafeAreaView>
        );
    }

}

export default Mediciones;