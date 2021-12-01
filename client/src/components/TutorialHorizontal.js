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
  NativeModules, 
} from "react-native";

import YoutubePlayer from 'react-native-youtube-iframe';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import  CarouselTutorial from './CarouselTutorial';
import GLOBAL from './global.js'

const { ConnectionModule } = NativeModules;

const saltoHorizontal = () => {
    console.log('horizontal', GLOBAL.h );
    //calcular salto en Java
    //startSaltoHorizontal(int user_id, int group_id, int std_id, int height, int tipo)
    ConnectionModule.startSaltoHorizontal(GLOBAL.user_id, 0, 0, GLOBAL.h, 1); 
}

class TutorialHorizontal extends Component {
    constructor(props){
        super(props);
        this.state = {
			activeIndex:0,
			activeSlide:0,
            modalVisible: false,
			dat: [
				{
					title:"Comenzar Medición",
					text: 
					`Selecciona el botón marcado para ingresar a medir tu salto horizontal`,
					image: require("../images/tutoriales/horizontal/1.png"),
					url: '84WIaK3bl_s',
					id: 1,
				},
				{
					title:"Quedate Quieto",
					text: `Para que midas tu salto con la mayor precisión posible, debes quedarte quieto antes de saltar`,
					image: require("../images/tutoriales/horizontal/inicio.jpg"),
					url: '84WIaK3bl_s',
					id: 2
				},
				{
					title:"Iniciar Medición de Salto Horizontal",
					text: `Desactiva la rotación de tu smartphone y colócalo de forma horizontal, deben quedar los botones en la parte superior de tu pantalla.
Presiona el botón verde para comenzar a medir tu salto, recuerda esperar al menos un segundo después de haberlo apretado`,
					image: require("../images/tutoriales/horizontal/start.png"),
					url: '84WIaK3bl_s',
					id: 3
				},
				{
					title:"Finalizar Medición",
					text: `Finaliza la medición pulsando el botón rojo, es importante apretarlo después de haber saltado.`,
					image: require("../images/tutoriales/horizontal/stop.png"),
					url: '84WIaK3bl_s',
					id: 4
				},
				{
					title:"Confirmar y Publicar Resultado",
					text: `Confirma y publica tu resultado de la medición en tu perfil presionando 'ok'`,
					image: require("../images/tutoriales/horizontal/final.jpg"),
					url: '84WIaK3bl_s',
					id: 5
				},
				{
					title: 'Video Tutorial',
					text: 'Este es un video tutorial de como realizar el ejercicio que quieres medir',
                    image: '',
					url: 'PMApLbnFC54',
					id: 6
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

            <Text style={styles1.headerStyle}>{item.title}</Text>
            
            {
               	index === 5 ?
                <View style={{paddingTop: '10%'}}>
                    
                    <View style={{width: 280, paddingBottom: '20%'}}>
                        <Text style={styles1.textStyle}>{item.text}</Text>
                    </View>

					<YoutubePlayer
                        height={400}
                        play={true}
                        videoId={item.url}
                	/>
                </View>
                :
                <View style={{padding: 10, alignItems: "center", flexDirection:'column'}}>
                    <View style={{width:250, PaddingTop: '10%'}}>
                        <Text style={styles1.textStyle}>{item.text}</Text>
                    </View>

                    <View style={{flex:1,paddingTop:1,transform: [{scale: 0.55}], position: 'relative'}}>
                        <Image style={{height:500, width: 450, resizeMode:'contain',}} source={item.image} />
                    </View>

                </View>
            }
          </View>
        )
    }
    
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
                   <Text style={styles.headerStyle}>Medicion Salto Horizontal {"\n"}</Text>
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
                        style={[styles.buttonStyle, { height: 150, width: 340,paddingTop:'5%'}]}
                        onPress={() => {saltoHorizontal()}}
                    >
                        <View style={styles.buttonView}>
                            <Image style={{height: 90, width: 90}} source={require("../images/Medir.png")} />
                            <Text style={styles.textStyle}> Medir mi Horizontal </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.rowView}>

                    <TouchableOpacity 
                        style={[styles.buttonStyle, { height: 150, width: 150}]}
                        onPress={() => this.props.navigation.navigate('CalentamientoHorizontal')}
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

const styles1 = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: "#E7E7E7",
        flexDirection: "column",
	},
	imageStyle: {
		width: 280,
        height:300,
		padding: '10%',
		resizeMode: 'cover'
	},
    headerStyle: {
        fontSize: 20,
        marginLeft: "5%",
        fontWeight: "bold",
        color: "black",
        marginTop: "5%",
  },
  textStyle: {
		fontSize: 13,
        marginLeft: "3%",
        color: "black",
        marginTop: "2%",
        textAlign: "left",
		textAlign: 'justify'
  },
  textStyle2:{
        fontSize: 13,
        marginLeft: "3%",
        color: "black",
        marginTop: "2%",
        textAlign: "left",
        fontWeight: "bold",
        marginBottom:"5%",
		textAlign: 'justify'

  }
})
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

export default TutorialHorizontal;

