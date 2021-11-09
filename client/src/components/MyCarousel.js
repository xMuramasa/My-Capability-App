import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { marginBottom } from 'styled-system';

export default class App extends React.Component {

    
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          activeSlide:0,
          carouselVertical: [
          {
              title:"Hip Bridge",
              text: 
              `Apóyate de espalda en el suelo, y eleva el torso y tus caderas hasta alcanzar la posición indicada, manteniéndote erguido en esa posición.
              `,
              text2:`Tiempo: 30 segundos.`,
              image: require("../images/calentamiento/vertical/bridge.png"),
          },
          {
              title:"Hip Bridge March",
              text: `Apóyate de espalda en el suelo, eleva el torso y tus caderas hasta alcanzar la posición indicada y levanta una pierna a la vez, formando un ángulo de 90 grados con respecto al torso.
              `,
              text2:"Tiempo: 30 segundos.",
              image: require("../images/calentamiento/vertical/bridgeMarch.png"),
          },
          {
              title:"Hip Rotations",
              text: `Apóyate de costado en el suelo y eleva repetidamente la pierna superior. Luego cambia de lado y repite con la otra pierna.
              `,
              text2:"Tiempo: 30 segundos.",
              image: require("../images/calentamiento/vertical/hipRots.png"),
          },
          {
              title:"Frankenstein",
              text: `Párate erguido y levanta los brazos de forma que queden paralelos al piso, luego levanta cada pie hasta llegar a la altura de las manos, manteniendo la postura. Si no puedes llegar hasta las manos, llega lo más alto que puedas.
              `,
              text2:"Tiempo: 30 segundos.",
              image: require("../images/calentamiento/vertical/frank.png"),
          },
          {
              title:"Straight Leg Skips",
              text: `Párate erguido e inmediatamente avanza levantando una pierna a la vez, intentando llegar lo más alto posible. Procura levantar las piernas utilizando los glúteos.
              `,
              text2:"Tiempo: 30 segundos.",
              image: require("../images/calentamiento/vertical/legs.png"),
          },
          {
            title:"Front/back Fascia Line",
            text: `Párate erguido, coloca tu pierna izquierda ligeramente detrás y levanta tus brazos sobre tu cabeza lo más alto que puedas. Luego, ubica tu otro pie ligeramente delante y estírate hacia abajo, intentando alcanzarlo. Después repite el pie opuesto.
            `,
            text2:"Tiempo: 15 segundos cada pie.",
            image: require("../images/calentamiento/vertical/fascia.png"),
        },
          ],
          carouselSprint: [
          {
              title:"Knee Hug",
              text: 
              `Levanta una rodilla y llévala con las manos lo más alto posible, de manera breve. Haz lo mismo con ambas piernas de manera rápida y alternada.              
              `,
              text2:"Tiempo: 30 segundos.",
              image: require("../images/calentamiento/Sprint/kneeHug.png"),
          },
          {
              title:"Quad Stretch",
              text: `Dobla una pierna, elevando tu pie por detrás, intentando alcanzar tu glúteo, y tíralo con tu mano para tocarlo y estirar brevemente. Haz lo mismo con ambas piernas de manera rápida y alternada.             
              `,
              tex2:"Tiempo: 30 segundos.",
              image: require("../images/calentamiento/Sprint/quad.png"),
          },
          {
              title:"Leg Pull",
              text: `Levanta una de tus piernas por delante, levantando la zona de la pierna entre la rodilla y el pie de manera horizontal y estirando brevemente. Haz lo mismo con ambas piernas de manera rápida y alternada.`,
              text2: "Tiempo: 30 segundos.",
              image: require("../images/calentamiento/Sprint/pull.png"),
          },
          {
              title:"Leg Sweeps",
              text: `Apóyate en un objeto con una mano, y comienza a balancear con la pierna opuesta de atrás hacia delante, alcanzando una posición horizontal a cada lado. Luego haz lo mismo con la otra pierna.`,
              text2: "Tiempo: 15 segundos cada pierna.",
              image: require("../images/calentamiento/Sprint/sweep.png"),
          },
          {
              title:"Reverse Lunges With Twist",
              text: `Da un paso atrás con una de tus piernas, hasta quedar con esa rodilla en el piso, y gira tu torso hacia el lado de tu otra pierna, juntando tus manos delante tuyo para mayor estabilidad. Haz lo mismo con ambas piernas de manera alternada.`,
              text2: "Tiempo: 30 segundos.",
              image: require("../images/calentamiento/Sprint/lunges.png"),
          },
          {
            title:"Upper Body Stretches",
            text: `Realiza distintos tipos de estiramiento con tus brazos, con tal de estirar tu torso.`,
            text2: "Tiempo: 30 segundos.",
            image: require("../images/calentamiento/Sprint/stretch.png"),
        },
          ],
          carouselHorizontal: [
            {
                title:"XDDDDDDDDDD",
                text: 
                `Levanta una rodilla y llévala con las manos lo más alto posible, de manera breve. Haz lo mismo con ambas piernas de manera rápida y alternada.\nTiempo: 30 segundos              
                `,
                image: require("../images/calentamiento/Sprint/kneeHug.png"),
            },
            {
                title:"Quad Stretch",
                text: `Dobla una pierna, elevando tu pie por detrás, intentando alcanzar tu glúteo, y tíralo con tu mano para tocarlo y estirar brevemente. Haz lo mismo con ambas piernas de manera rápida y alternada.\nTiempo: 30 segundos              
                `,
                image: require("../images/calentamiento/Sprint/quad.png"),
            },
            {
                title:"Leg Pull",
                text: `Levanta una de tus piernas por delante, levantando la zona de la pierna entre la rodilla y el pie de manera horizontal y estirando brevemente. Haz lo mismo con ambas piernas de manera rápida y alternada.\nTiempo: 30 segundos`,
                image: require("../images/calentamiento/Sprint/pull.png"),
            },
            {
                title:"Leg Sweeps",
                text: `Apóyate en un objeto con una mano, y comienza a balancear con la pierna opuesta de atrás hacia delante, alcanzando una posición horizontal a cada lado. Luego haz lo mismo con la otra pierna.\nTiempo: 15 segundos cada pierna`,
                image: require("../images/calentamiento/Sprint/sweep.png"),
            },
            {
                title:"Reverse Lunges With Twist",
                text: `Da un paso atrás con una de tus piernas, hasta quedar con esa rodilla en el piso, y gira tu torso hacia el lado de tu otra pierna, juntando tus manos delante tuyo para mayor estabilidad. Haz lo mismo con ambas piernas de manera alternada.\nTiempo: 30 segundos`,
                image: require("../images/calentamiento/Sprint/lunges.png"),
            },
            {
              title:"Upper Body Stretches",
              text: `Realiza distintos tipos de estiramiento con tus brazos, con tal de estirar tu torso.\nTiempo: 30 segundos. `,
              image: require("../images/calentamiento/Sprint/stretch.png"),
          },
            ],
          dat : []
      }
    }
    componentDidMount(){
      if (this.props.type === 0){
        this.setState({dat: this.state.carouselVertical});
      }else if (this.props.type === 1){
        this.setState({dat: this.state.carouselHorizontal});
      } else if (this.props.type === 2){
        this.setState({dat: this.state.carouselSprint});
      }
    }
    _renderItem({item,index}){
        return (
          <View style={{
              backgroundColor:'floralwhite',
              height: 450,
              marginTop: "0%",
              marginLeft: "2%",
              marginRight: "5%", }}>

            <Text style={styles.headerStyle}>{item.title}</Text>
            <Image style={styles.imageStyle} source={item.image} />
            <View style={{width: 280}}>
            <Text style={styles.textStyle}>{item.text}</Text>
            <Text style={styles.textStyle2}>{item.text2}</Text>
            </View>
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
		height: 200,
		width: 150,
    marginLeft: "25%",
    marginRight: "25%",
    marginTop:"3%"
	},
  headerStyle: {
    fontSize: 20,
    marginLeft: "5%",
    fontWeight: "bold",
    color: "black",
    marginTop: "5%",
  },
  textStyle: {
		fontSize: 14,
    marginLeft: "3%",
		color: "black",
    marginTop: "5%",
    textAlign: "left"
  },
  textStyle2:{
    fontSize: 14,
    marginLeft: "3%",
		color: "black",
    marginTop: "2%",
    textAlign: "left",
    fontWeight: "bold",
    marginBottom:"5%"
  }
})