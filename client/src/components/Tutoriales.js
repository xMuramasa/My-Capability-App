import React, { Component } from "react";
import {
  SafeAreaView,
  Animated,
  useWindowDimensions,
  StyleSheet,
  Modal, 
  Text, 
  TouchableOpacity,
  Image,
  View 
} from "react-native";

class Tutoriales extends Component {

    render() {
        return(
            <View style={styles.container}>
                <View>
                   <Text style={styles.headerStyle}>Titulo {"\n"}</Text>
                <View style={styles.dividerStyle}/> 
            </View>
                <View style={styles.rowView}>
                    <TouchableOpacity 
                        style={[styles.buttonStyle, { height: 100, width: 300}]}
                        onPress={() => console.log("aaaa")}
                    >
                        <View style={styles.buttonView}>
                            <Text style={styles.textStyle}> Medir </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.rowView}>

                    <TouchableOpacity 
                        style={[styles.buttonStyle, { height: 130, width: 130}]}
                        onPress={() => this.props.navigation.navigate('Calentamiento')}
                    >
                        <View style={styles.buttonView}>
                            <Text style={styles.textStyle}> Calentamiento </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.buttonStyle, { height: 130, width: 130}]}
                        onPress={()=>{console.log('aqui')}}
                    >
                        <View style={styles.buttonView}>
                            <Text style={styles.textStyle}> Tutorial </Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={styles.rowView2}>
                    <TouchableOpacity 
                        style={[styles.buttonStyle, { height: 50, width: 300,}]}
                        onPress={() => this.props.navigation.navigate('Calentamiento')}
                    >
                        <View style={styles.buttonView2}>
                            <Image style={styles.imageStyle2} source={require("../images/patras.png")} />
                            <Text style={styles.textStyle}> Atrás </Text>
                        </View>
                    </TouchableOpacity>
                </View>

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
		backgroundColor: "#FF9933",
		borderRadius: 10,
		padding: 5,
		margin: 20,	
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
    rowView2: {
		flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:"60%"
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

export default Tutoriales;

