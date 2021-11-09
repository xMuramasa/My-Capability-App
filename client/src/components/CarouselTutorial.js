import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';

import YoutubePlayer from 'react-native-youtube-iframe';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { marginBottom, paddingTop, textAlign } from 'styled-system';

export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
			activeIndex:0,
			activeSlide:0,
			carouselVertical: [
				{
					title:"Comenzar Medición",
					text: 
					`Selecciona el botón marcado para ingresar a medir tu salto vertical
					`,
					image: require("../images/tutoriales/vertical/1.png"),
					url: '84WIaK3bl_s',
					id: 1,
				},
				{
					title:"Quedate Quieto",
					text: `Para que midas tu salto con la mayor precisión posible, debes quedarte quieto antes de saltar`,
					image: require("../images/tutoriales/vertical/inicio2.jpg"),
					url: '84WIaK3bl_s',
					id: 2
				},
				{
					title:"Iniciar Medición de Salto Vertical",
					text: `Presiona el botón para comenzar a medir tu salto, recuerda esperar al menos un segundo después de haberlo apretado`,
					image: require("../images/tutoriales/vertical/start.png"),
					url: '84WIaK3bl_s',
					id: 3
				},
				{
					title:"Finalizar Medición",
					text: `Presiona el botón rojo para detener tu medición, es importante quedarse quieto después de haber saltado.`,
					image: require("../images/tutoriales/vertical/stop.png"),
					url: '84WIaK3bl_s',
					id: 4
				},
				{
					title:"Ver y Publicar Resultado",
					text: `Confirma la altura de tu salto presionando "ok"`,
					image: require("../images/tutoriales/vertical/final2.png"),
					url: '84WIaK3bl_s',
					id: 5
				},
				{
					title: 'Video Tutorial',
					text: 'Este es un video tutorial de como realizar correctamente el salto vertical',
                    image: '',
					url: 'hENr1eodjHM',
					id: 6
				}
			],
			carouselSprint: [
				{
					title:"Comenzar Medición",
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
					title:"Publicar Resultado",
					text: `Confirma tus resultados de la medición con este botón`,
					image: require("../images/tutoriales/velocidad/5.png"),
					url: '84WIaK3bl_s',
					id: 5
				},
				{
					title: 'Video Tutorial',
					text: 'Este es un video tutorial de como realizar el ejercicio que quieres medir',
                    image: '',
					url: '84WIaK3bl_s',
					id: 6
				}
			],
			carouselHorizontal: [
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
			dat : []
    	}
    }
    componentDidMount(){
		if (this.props.type === 0){
			this.setState({dat: this.state.carouselVertical});
		} else if(this.props.type === 1){
			this.setState({dat: this.state.carouselHorizontal});
		} else {
			this.setState({dat: this.state.carouselSprint});
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
            
            {
               	index === 5 ?
                <View style={{paddingTop: '10%'}}>
                    
                    <View style={{width: 280, paddingBottom: '20%'}}>
                        <Text style={styles.textStyle}>{item.text}</Text>
                    </View>

					<YoutubePlayer
                        height={400}
                        play={true}
                        videoId={item.url}
                	/>
                </View>
                :

                <View style={{paddingTop: '10%', alignItems: "center"}}>
                    <Image style={{height: 250, width: 150, padding: '10%'}} source={item.image} />
                    <View style={{width:250, PaddingTop: '10%'}}>
                        <Text style={styles.textStyle}>{item.text}</Text>
                    </View>
                </View>
            }
            

          </View>
        )
    }
    
    get pagination () {
      return (
          <Pagination
            dotsLength={this.state.carouselVertical.length}
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
        return (
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
        );
    }
}


const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: "#E7E7E7",
        flexDirection: "column",
	},
	imageStyle: {
		width: 300,
		padding: '10%',
		//resizeMode: 'cover'
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