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
  View,
  NativeModules
} from "react-native";

import  CarouselTutorial from './CarouselTutorial';
import GLOBAL from './global.js'

const { ConnectionModule } = NativeModules;

const saltoVertical = () => {
    console.log('vertical ', GLOBAL.h );
    //calcular salto en Java
    //startSaltoVertical(int user_id, int group_id, int student_id, int height, int tipo)
    ConnectionModule.startSaltoVertical(GLOBAL.user_id, 0, 0, GLOBAL.h, 1);  // IMPLEMENTAR OBTENER ALTURA DE USUARIO
}

class TutorialVertical extends Component {
    state={
        modalVisible: false,
    };

    render() {
        return(
            <View style={styles.container}>
                <View>
                   <Text style={styles.headerStyle}>Medición Salto Vertical {"\n"}</Text>
                <View style={styles.dividerStyle}/> 
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={()=> { this.setState({ modalVisible: false }); }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}> 
                        <SafeAreaView style={styles.container2}>
                        <View style={styles.scrollContainer}>
                            
                            <CarouselTutorial type={0}/>

                        </View>
                        </SafeAreaView> 
                        <View style={styles.rowView}>
                            <View>
                                <TouchableOpacity 
                                    style={styles.buttonStyle2}
                                    onPress={()=> { this.setState({ modalVisible: false }); }}
                                >
                                    <View style={styles.buttonView2}>
                                        <Image style={styles.imageStyle2} source={require("../images/patras.png")} />
                                        <Text style={styles.textStyle}>Atrás </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View> 
                        </View>
                    </View>
                </Modal>

                <View style={styles.rowView}>
                    <TouchableOpacity 
                        style={[styles.buttonStyle, { height: 150, width: 340, paddingTop:'5%'}]}
                        onPress={() => {saltoVertical()}}
                    >
                        <View style={styles.buttonView}>
                            <Image style={{height: 90, width: 90}} source={require("../images/Medir.png")} />
                            <Text style={styles.textStyle}> Medir mi Vertical</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.rowView}>

                    <TouchableOpacity 
                        style={[styles.buttonStyle, { height: 150, width: 150}]}
                        onPress={() => this.props.navigation.navigate('CalentamientoVertical')}
                    >
                        <View style={styles.buttonView}>
                            <Image style={styles.imageStyle} source={require("../images/calentamiento2.png")} />
                            <Text style={styles.textStyle}> Calentamiento </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.buttonStyle, { height: 150, width: 150}]}
                        onPress={()=>{this.setState({modalVisible: true})}}
                    >
                        <View style={styles.buttonView}>
                            <Image style={styles.imageStyle} source={require("../images/tutorial.png")} />
                            <Text style={styles.textStyle}> Tutorial </Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={styles.rowView2}>
                    <TouchableOpacity 
                        style={[styles.buttonStyle, { height: 50, width: 300,}]}
                        onPress={() => this.props.navigation.navigate('Mediciones')}
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
        marginTop:"40%"
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
    imageStyle: {
		height: 100,
		width: 100,
	},
    container: {
        flex: 1,
        backgroundColor: "#E7E7E7",
        flexDirection: "column",
        alignItems:'center',
        justifyContent:'center'    
      },
    container3: {
        flex: 1,
        backgroundColor: "#E7E7E7",
        flexDirection: "column",
    },
    container2: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection:'column',
    },
    scrollContainer: {
        height: 500,
        alignItems: "center",
        justifyContent: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        backgroundColor: "#FF9933",
        borderRadius: 10,
        padding: 5,
        margin: 20,
        height: '10%',
        width: '30%',
    },
    buttonOpen: {
        backgroundColor: "#FF9933",
    },
    buttonClose: {
        backgroundColor: "#FF9933",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    buttonStyle2: {
        backgroundColor: "#FF9933",
        borderRadius: 10,
        padding: 5,
        margin: 20,
        height: 50,
        width: 250,
    },
    textStyle: {
        fontSize: 16,
        fontWeight: "bold",
        margin: 5,
        color: "black"
    },
});

export default TutorialVertical;

