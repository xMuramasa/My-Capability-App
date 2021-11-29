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

import YoutubePlayer from 'react-native-youtube-iframe';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import GLOBAL from './global.js'

class TutorialTrote extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
			activeIndex:0,
			activeSlide:0,
			dat: [
				{
					title:"Comenzar A Trotar",
					text: 
					`Selecciona este botón para ingresar a medir tu velocidad
					`,
					image: require("../images/tutoriales/velocidad/1.png"),
					url: '84WIaK3bl_s',
					id: 1,
				},
				{
					title:"Ubicar Posición",
					text: `Usa este botón para centrarte en el mapa, es muy importante hacerlo antes de comenzar a medir.             
					`,
					image: require("../images/tutoriales/velocidad/2.png"),
					url: '84WIaK3bl_s',
					id: 2
				},
				{
					title:"Iniciar Recorrido",
					text: `Este botón permite iniciar tu recorrido. Púlsalo para comenzar a medir.`,
					image: require("../images/tutoriales/velocidad/3.png"),
					url: '84WIaK3bl_s',
					id: 3
				},
				{
					title:"Finalizar Medición",
					text: `Con este botón terminas de medir, es importante apretarlo después de haber parado de correr.`,
					image: require("../images/tutoriales/velocidad/4.png"),
					url: '84WIaK3bl_s',
					id: 4
				},
				{
					title:"Confirma Tu Resultado",
					text: `Confirma tus resultados de la medición con este botón`,
					image: require("../images/tutoriales/velocidad/5.png"),
					url: '84WIaK3bl_s',
					id: 5
				}
			],
        }
    }
    
    _renderItem({item,index}){
        return (
          <View style={{
              backgroundColor:'floralwhite',
              height: 600,
              marginTop: "0%",
              marginLeft: "2%",
              marginRight: "5%", }}>

            <Text style={styles.headerStyle}>{item.title}</Text>

            <View style={{paddingTop: '10%', alignItems: "center"}}>
                <Image style={{height: 250, width: 150, padding: '10%'}} source={item.image} />
                <View style={{width:250, PaddingTop: '10%'}}>
                    <Text style={{
                        fontSize: 13,
                        marginLeft: "3%",
                        color: "black",
                        marginTop: "2%",
                        textAlign: "left",
                        textAlign: 'justify'}}
                    >
                        {item.text}
                    </Text>
                </View>
            </View>

          </View>
        )
    };
    get pagination () {
        return (
            <Pagination
              dotsLength={this.state.dat.length}
              activeDotIndex={this.state.activeSlide}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    } 


    render() {
        return(
            <View style={styles.container}>
                <View>
                   <Text style={styles.headerStyle}>Compañero de Trote {"\n"}</Text>
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
                        
                        {/* <CarouselTutorial type={2}/> */}

                        <SafeAreaView style={{flex: 1, backgroundColor:"#FF9933", paddingTop:"3%", }}>
                            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                                <Carousel
                                layout={"default"}
                                ref={ref => this.carousel = ref}
                                data={this.state.dat}
                                sliderWidth={300}
                                itemWidth={300}
                                renderItem={this._renderItem}
                                onSnapToItem = { (index) => this.setState({activeSlide:index}) } />
                            </View>
                            { this.pagination }
                        </SafeAreaView>


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
                        onPress={() => this.props.navigation.navigate('Running')}
                    >
                        <View style={styles.buttonView}>
                            <Image style={{height: 90, width: 90}} source={require("../images/Medir.png")} />
                            <Text style={styles.textStyle}> Comenzar a Trotar </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.rowView}>

                    <TouchableOpacity 
                        style={[styles.buttonStyle, { height: 150, width: 150}]}
                        onPress={() => this.props.navigation.navigate('CalentamientoTrote')}
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

export default TutorialTrote;

