import React, { Component } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, ScrollView} from 'react-native';
import { CheckBox,Overlay } from 'react-native-elements'
import {PieChart} from "react-native-chart-kit";

import Card from "./Card";
import GLOBAL from './global.js'
import {comidas} from './comida'
import Carousel from 'react-native-snap-carousel';

var winHeight = Dimensions.get("window").height;
var winWidth = Dimensions.get("window").width;


/*
utilizando estudios de Harris-Benedict y Mifflin-St Jeor se obtiene información y ecuaciones

Aumentar masa muscular:
250-500 kcal en hombres
150-300 kcal en mujeres

Disminuir grasa corporal (no bajar musculatura):
250 – 500 kcaL


Bajar de peso (bajar todo):

(diaria)
carbs: 
    1g -> 4 cal
    3 - 4 g / kg
    activo: 5 g / kg

prots:
    1g -> 4 cal
    1.5 - 2 g / kg

fat:
    1 g -> 9 cal
    0.3 - 0.5 / kg

Rango óptimo de pérdida de grasa: ~800 gr, unos 3-4 kg al mes
Pérdida por semana:
    Obeso: 1.4 - 2.3 kg
    Sobrepeso: 0.9 - 1.4 kg
    Normal: 0.5 - 0.9 kg
    Limpio (poca grasa): 0.2 - 0.5 kg
    Muy limpio (muy poca grasa): 0.1 - 0.2 kg


Mantener:
0.4 carbs / 0.3 prots / 0.3 fat
carbs:
    activo: 3 - 5 g / kg * día
    4 - 6 dia/sem (1 - 2 h/dia) 5 - 8 g / kg | 1 - 1.5 g / kg post ejercicio
    
prots:
    activo: 0.8 - 1 g / kg

fat:
    activo: 0.5 - 1 g / kg 
*/

const styles = StyleSheet.create({
    textStyle: {
		fontSize: 18,
		margin: 5,
		color: "black"
	},
    textStyleBold: {
		fontSize: 18,
		fontWeight: "bold",
		margin: 5,
		color: "black"
	},
	buttonStyle2: {
		backgroundColor: "#FF9933",
		borderRadius: 10,
		padding: 5,
		margin: 20,
		height: .075*winHeight,
		width: .45*winWidth, 
	},
	buttonView2: {
		justifyContent: 'center',
        alignItems: 'center',
		flexDirection: "row"
	},
    buttonText:{
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
        textTransform: "uppercase",
        color: "black"
    },
    questionButton: {
        borderRadius: 8,
        paddingVertical: 3,
        paddingHorizontal: 3,
        backgroundColor: "#FF9933",
    },
    overlayText: {
        fontSize: 16,
        textAlign: "justify",
        color: "black"
    },

    modalView: {
        height: '33%',
        width: '90%',
        marginLeft: '1%',
        backgroundColor: "white",
        borderRadius: 6,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3
    },
    container2: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection:'column',
    },
    scrollContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
});

const MyPieChart = (gProt, gFat, gCarb, caloriasFinal) => {

    // var calProt = 4 * gProt
    // var calFat = 9 * gFat
    // var calCarb = 4 * gCarb

    var gTot = gProt + gFat + gCarb
    
    if (caloriasFinal > 0){
        var ratioProt = gProt / gTot * 100
        var ratioFat = gFat / gTot * 100
        var ratioCarb = gCarb / gTot * 100
    } else return null // (?)

    return (
        <>
        <PieChart
            data={[
                {
                    name: 'Carbs',
                    ratio: ratioCarb,
                    color: '#5BC0EB',
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 16,
                },
                {
                    name: 'Prots',
                    ratio: ratioProt,
                    color: '#FF9933',
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 16,
                },
                {
                    name: 'Grasas',
                    ratio: ratioFat,
                    color: '#666666',
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 16,
                },
            ]}
            width={Dimensions.get('window').width * 0.85}
            height={150}
            chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                    borderRadius: 12,
                },
            }}
            style={{
                marginVertical: 8,
                borderRadius: 12,
            }}
            accessor="ratio"
            backgroundColor="transparent"
            //absolute //for the absolute number remove if you want percentage
        />
        </>
    );
};


class ConsejosN extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sex: -1,
            weight: 0,
            height: 0,
            age: 0,

            dieta: [[],[]],
            flagDieta: false,

            visible: true,
            visibleOverlay: false,
            visibleOverlay2: false,
            visibleOverlay3: false,
            visibleOverlay4: false,
            visibleAlert: false,

            check1: false, check2: false, check3: false, check4: false,
            check12: false, check22: false, check32: false, check42: false, check52: false,
        };
    }

    toggleOverlay = () => {
        this.setState({ visibleOverlay: !this.state.visibleOverlay })
    };
    toggleOverlay2 = () => {
        this.setState({ visibleOverlay2: !this.state.visibleOverlay2})
    };
    toggleOverlay3 = () => {
        this.setState({ visibleOverlay3: !this.state.visibleOverlay3})
    };
    toggleOverlay4 = () => {
        this.setState({ visibleOverlay4: !this.state.visibleOverlay4})
    };

	onCheck1 = () =>{
		if (!this.state.check1){
			this.setState({ check1: true, check2: false, check3: false, check4: false
    })}}
	onCheck2 = () =>{
		if (!this.state.check2){
			this.setState({ check1: false, check2: true, check3: false, check4: false
    })}}
	onCheck3 = () =>{
		if (!this.state.check3){
			this.setState({ check1: false, check2: false, check3: true, check4: false
    })}}
	onCheck4 = () =>{
		if (!this.state.check4){
			this.setState({check1: false, check2: false, check3: false, check4: true
    })}}
    onCheck12 = () =>{  
		if (!this.state.check12){
			this.setState({ check12: true, check22: false, check32: false, check42: false, check52: false
    })}}
    onCheck22 = () =>{
		if (!this.state.check22){
			this.setState({ check12: false, check22: true, check32: false, check42: false, check52: false
    })}}
    onCheck32 = () =>{
		if (!this.state.check32){
			this.setState({ check12: false, check22: false, check32: true, check42: false, check52: false
    })}}
    onCheck42 = () =>{
		if (!this.state.check42){
			this.setState({ check12: false, check22: false, check32: false, check42: true, check52: false
    })}}
    onCheck52 = () =>{
		if (!this.state.check52){
			this.setState({ check12: false, check22: false, check32: false, check42: false, check52: true
    })}}

    
    generarDieta(caloriasFinal, gProt){
        //escoger comidas random de cada macronutriente
        var dieta = []
        var cantAlimentos = Object.keys(comidas).length;
        var CurrentCal = 0
        var CurrentProt = 0
        var CurrentCarb = 0
        var CurrentFat = 0
        //random comidas necesarias (4)

        // frutas: 15 - 20
        // verduras: 21 - 24
        //frutas
        let frutas = comidas.slice(24, 29)
        let verd = comidas.slice(29, 34)
        let newComidas = comidas.slice(0, 24)

        for (let f = 0; f < 2; f++){
            let randFrut = Math.floor(Math.random() * (frutas.length))
            dieta.push(frutas[randFrut])
            CurrentCal += frutas[randFrut].cal
            CurrentProt += frutas[randFrut].prot
            CurrentCarb += frutas[randFrut].carb
            CurrentFat += frutas[randFrut].grasa
            let frutas1 = frutas.splice(randFrut,1) //no borrar
        }
        for (let v = 0; v < 2; v++){
            let randVerd = Math.floor(Math.random() * (verd.length))
            dieta.push(verd[randVerd])
            CurrentCal += verd[randVerd].cal
            CurrentProt += verd[randVerd].prot
            CurrentCarb += verd[randVerd].carb
            CurrentFat += verd[randVerd].grasa
            let verd1 = verd.splice(randVerd, 1) //no borrar
        }
        console.log("aaa: ", CurrentCal, CurrentCarb, CurrentFat, CurrentProt)
        //programar mochila
        
        for (let i = 0; CurrentCal <= (caloriasFinal-120); i++){
            let randComida = Math.floor(Math.random() * (newComidas.length))
            dieta.push(newComidas[randComida])
            CurrentCal += newComidas[randComida].cal
            CurrentProt += newComidas[randComida].prot
            CurrentCarb += newComidas[randComida].carb
            CurrentFat += newComidas[randComida].grasa
            let verd2 = newComidas.splice(randComida, 1) //no borrar
        }
        console.log("bbbb: ", CurrentCal, CurrentCarb, CurrentFat, CurrentProt)
        var aporte = [CurrentCal, CurrentCarb, CurrentFat, CurrentProt]
        return [dieta, aporte]
    }


    _renderItem({item,index}){
        return (
            <View style={{
                backgroundColor:'#ff9933',
                height: '85%',
                borderRadius: 8,
                marginTop: '5%',
                marginLeft: '5%',
                marginRight: '5%'
            }}>
            
                <Text style={[styles.textStyleBold, { textAlign: 'center', paddingTop: "1%"}]}>{item.title}</Text>
                
                <View style={{flexDirection: 'row',}}>
                    <Image resizeMode='contain' style={{flex:3, height: .1*winHeight}} source={item.image} />
                    <Text style={[styles.textStyle, {flex: 3, fontSize: 16, marginLeft: '2%'}]}>{item.text}</Text>
                </View>
          </View>
        )
    }

    
    componentDidMount(){
        // se activa un pop up para dirigir al perfil en caso que hayan datos incompletos
        if (GLOBAL.weight === null || GLOBAL.sex === null || GLOBAL.h === null || GLOBAL.age === null){
            console.log(GLOBAL.weight, GLOBAL.sex ,GLOBAL.h , GLOBAL.age )
         
            this.setState({visibleAlert: true})

        } else {
            this.setState({visibleAlert: false,
                            
                            sex: parseInt(GLOBAL.sex), 
                            weight: parseInt(GLOBAL.weight), 
                            height: parseInt(GLOBAL.h), 
                            age: parseInt(GLOBAL.age),
                        })
        }
    }
    
    
    calcularTasa(){
        //tasa metabólica basal (TMB), según sexo
        var deltaTMB = (this.state.sex === 0) ? 5 : -161
        
        var TMB = (10 * this.state.weight) + (6.25 * this.state.height) - (5 * this.state.age) + deltaTMB
        
        // Factor de cantidad de ejercicio
        var factorEx = 1
        if      (this.state.check12) {factorEx = 0.2}
        else if (this.state.check22) {factorEx = 0.375}
        else if (this.state.check32) {factorEx = 0.55}
        else if (this.state.check42) {factorEx = 0.725}
        else if (this.state.check52) {factorEx = 0.9}
        
        // Tasa de ejercicio
        var TEx = factorEx * TMB
        // Subtasa Total
        var ST = TMB + TEx

        // quemas TT: -2500 cal
        // consumir: 2300 cal
        // -200

        //Metas
        var caloriasFinal = ST
        var carbs, prots, fat

        // Disminuir grasa
        if (this.state.check1){caloriasFinal -= 375}
        
        // Bajar de peso
        else if (this.state.check2){
            
            
            caloriasFinal -= 500
        }
        
        // Mantener peso
        else if (this.state.check3){
            caloriasFinal = ST
        }
        
        // Aumentar musculatura
        /* 250-500 kcal en hombres
           150-300 kcal en mujeres */
        else if (this.state.check4){
            var tmp = (this.state.sex === 0) ? 375 : 225
            caloriasFinal += tmp
        }
        

        // calcular gramos de macros
        var gProt = Math.round(this.state.weight*1.5)
        var gFat = Math.round(this.state.weight*2)
        var newCarb = Math.round((caloriasFinal - (gProt*4 + gFat*9))/4)
        var gCarb = newCarb >0 ? newCarb : 0

        // generar dieta
        if (!this.state.flagDieta){
            var diet = this.generarDieta(caloriasFinal)
            this.setState({dieta: diet,
                           flagDieta: true})
        }
        
        TMB = Math.round(TMB)
        TEx = Math.round(TEx)
        caloriasFinal = Math.round(caloriasFinal)
        

        return (
            <View style={{marginTop:'5%'}}>
                
                <Card style={{ width: '70%',}} cardColor={"white"}>
                    
                    <View style={{flexDirection: 'row', justifyContent: "center"}}>
                        
                        <Text style={[styles.textStyleBold, {textAlign: 'center', fontSize: 22}]}> Calorías</Text>
                        
                        <TouchableOpacity style={{ paddingLeft: "3%", paddingTop: '2%'}} onPress={this.toggleOverlay2}>
                            <View style={styles.questionButton}>
                                <Text style={{color:'black'}}> ? </Text>
                            </View>
                        </TouchableOpacity>
                        <Overlay 
                            visible={this.state.visibleOverlay2}
                            onBackdropPress={this.toggleOverlay2}
                        >
                            <Card>
                                <Text style={styles.overlayText}>
                                    <Text style={{fontWeight: "bold"}}>A continuación se presentan las calorías que gastas según tu cuerpo y actividad física, además del total que debes consumir para lograr tu objetivo</Text>{"\n"}{"\n"}
                                    <Text style={{fontWeight: "bold"}}>Tasa metabólica basal:</Text>{"\n"}
                                    <Text>    
                                        Cantidad de calorías necesarias para el cuerpo en un estado de reposo.
                                    </Text>{"\n"}{"\n"}
                                    <Text style={{fontWeight: "bold"}}>Actividad física:</Text>{"\n"}
                                    <Text>
                                        Cantidad de calorías gastadas por la actividad física diaria.
                                    </Text>{"\n"}{"\n"}
                                    <Text style={{fontWeight: "bold"}}>Total a consumir:</Text>{"\n"}
                                    <Text>
                                        Cantidad de calorías necesarias en tu dieta para lograr tu objetivo.
                                    </Text>
                                </Text>
                            </Card>
                        </Overlay>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textStyle}> Tasa metabólica basal:</Text> 
                        <Text style={[styles.textStyle, {fontSize: 20}]}>{TMB} cal</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textStyle}> Actividad física:</Text> 
                        <Text style={[styles.textStyle, {fontSize: 20}]}>{TEx} cal</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textStyle}> Total a consumir:</Text> 
                        <Text style={[styles.textStyle, {fontSize: 20}]}>{caloriasFinal} cal</Text>
                    </View>

                </Card>

                <Card style={{ width: '70%', marginHorizontal: '2%'}} cardColor={"white"}>
                    
                    <View style={{flexDirection: 'row', justifyContent: "center"}}>
                    
                        <Text style={[styles.textStyleBold, {textAlign: 'center', fontSize: 22}]}> Macronutrientes </Text>
                        
                        <TouchableOpacity style={{ paddingLeft: "3%", paddingTop: '2%'}} onPress={this.toggleOverlay3}>
                                <View style={styles.questionButton}>
                                    <Text style={{color:'black'}}> ? </Text>
                                </View>
                        </TouchableOpacity>
                        <Overlay 
                            visible={this.state.visibleOverlay3}
                            onBackdropPress={this.toggleOverlay3}
                        >
                            <Card>
                                <Text style={styles.overlayText}>
                                <Text style={{fontWeight: "bold"}}> Los macronutrientes son los nutrientes provenientes de los alimentos y son utilizados por el cuerpo para reparar y construir sus estructuras orgánicas.
                                En esta sección se mostrarán los principales macronutrientes y cuantos debes consumir según tu cuerpo y actividad física.
                                </Text>{"\n"}{"\n"}
                                    <Text style={{fontWeight: "bold"}}>Carbohidratos:</Text>{"\n"}
                                    <Text>    
                                        Sirven como reemplazo de las proteínas para preservar masa muscular y 
                                        proveen energía durante ejercicios de alta intensidad

                                    </Text>{"\n"}{"\n"}
                                    <Text style={{fontWeight: "bold"}}>Proteínas:</Text>{"\n"}
                                    <Text>
                                        Usadas para construir, reparar y mantener los tejidos corporales.
                                        Involucradas en sistemas metabólicos, de transporte y hormonales.
                                        Componen enzimas que regulan el metabolismo.
                                    </Text>{"\n"}{"\n"}
                                    <Text style={{fontWeight: "bold"}}>Grasas:</Text>{"\n"}
                                    <Text>
                                        Sirven como reserva de energía.
                                        Protegen órganos vitales.
                                        Transportan vitaminas solubles en grasa.
                                    </Text>
                                </Text>
                            </Card>
                        </Overlay>
                    </View>
                        
                        
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textStyle}> Proteínas:</Text>
                            <Text style={[styles.textStyle, {fontSize: 20}]}>{gProt} g</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textStyle}> Carbohidratos:</Text>
                            <Text style={[styles.textStyle, {fontSize: 20}]}>{gCarb} g</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textStyle}> Grasas:</Text>
                        <Text style={[styles.textStyle, {fontSize: 20}]}>{gFat} g</Text>
                    </View>

                    {MyPieChart(gProt, gFat, gCarb, caloriasFinal)}
      
                </Card>
                
                <View style={[styles.modalView, {marginTop: '1%'}]}>

                    <SafeAreaView style={styles.container2}>
                        <View style={styles.scrollContainer}>
                            <View style={{flexDirection: 'row', justifyContent: "center"}}>

                                <Text style={[styles.textStyleBold, {textAlign: 'center', fontSize: 22}]}> Alimentos recomendados</Text>
                                
                                <TouchableOpacity style={{ paddingLeft: "3%", paddingTop: '2.6%'}} onPress={this.toggleOverlay4}>
                                    <View style={styles.questionButton}>
                                        <Text style={{color:'black'}}> ? </Text>
                                    </View>
                                </TouchableOpacity>
                                <Overlay 
                                    visible={this.state.visibleOverlay4}
                                    onBackdropPress={this.toggleOverlay4}
                                >
                                    <Card>
                                        <Text style={styles.overlayText}>
                                            Se recomiendan alimentos nutricionalmente densos según las características y objetivos de la persona de forma orientativa. {"\n"}
                                            Sin embargo, esta aplicación no reemplaza la visita y orientación de un profesional de la salud y nutrición.
                                        </Text>
                                    </Card>
                                </Overlay>
                                
                            </View>
                                
                            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center'}}>
                                <Carousel
                                layout={"default"}
                                ref={ref => this.carousel = ref}
                                data={this.state.dieta[0]}
                                sliderWidth={300}
                                itemWidth={300}
                                renderItem={this._renderItem}
                                // onSnapToItem = { (index) => this.setState({activeSlide:index}) } 
                                />
                            </View>
                            
                            <Text style={styles.textStyle}> Estos alimentos te aportarán {Math.round(this.state.dieta[1][0])} cal, {Math.round(this.state.dieta[1][1])}g de carb, {Math.round(this.state.dieta[1][3])}g de prot y {Math.round(this.state.dieta[1][2])}g de grasas</Text>
                        </View>
                    </SafeAreaView>
                </View>
            </View>
        )
    }

    
    
    render() {
        return (
        <ScrollView>
        <View>
            <Overlay visible={this.state.visibleAlert}>
                <Card style={{alignItems:'center'}}>
                {/* <View style={{paddingHorizontal:'10%', height:'25%'}}> */}
                
                    <Text style={[styles.overlayText, {fontSize: 20, paddingTop: '5%', paddingHorizontal:'10%', textAlign:'center'}]}>
                        Falta información personal, por favor dirígete a tu perfil para completarlo.
                    </Text>
                    
                    <TouchableOpacity 
                        style={[styles.buttonStyle2, {marginLeft:'23%' , marginTop:'10%', borderRadius:5}]} 
                        onPress={() => this.props.navigation.navigate('Perfil')}
                    >   
                        <View style={styles.buttonView2}>
                            <Text style={[styles.textStyle, {fontSize:22}]}>Ir a mi Perfil</Text>
                        </View>
                    </TouchableOpacity>
                {/* </View> */}
                </Card>
            </Overlay>

            {this.state.visible ?
                <View style={{ alignItems: "center", marginTop:'8%'}}>

                    <Card style={{ width: '70%' }} cardColor={"white"}>
                        <Text style={styles.textStyleBold}> Indica tu objetivo </Text> 
                        <CheckBox
                            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                            left
                            title={<Text style={{paddingLeft:'2%', color:'black'}}>Definir musculatura</Text>}
                            checkedColor='#FF9933'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={this.state.check1}
                            onPress={this.onCheck1}
                        />
                    
                        <CheckBox
                            containerStyle={{ backgroundColor: 'transparent', borderWidth:0, margin: 0 }}
                            left
                            title={<Text style={{paddingLeft:'2%', color:'black'}}>Bajar de peso</Text>}
                            checkedIcon='dot-circle-o'
                            checkedColor='#FF9933'
                            uncheckedIcon='circle-o'
                            checked={this.state.check2}
                            onPress={this.onCheck2}
                        />
                        <CheckBox
                            containerStyle={{ backgroundColor: 'transparent', borderWidth:0, margin: 0 }}
                            left
                            title={<Text style={{paddingLeft:'2%', color:'black'}}>Mantener peso</Text>}
                            checkedIcon='dot-circle-o'
                            checkedColor='#FF9933'
                            uncheckedIcon='circle-o'
                            checked={this.state.check3}
                            onPress={this.onCheck3}
                        />
                        <CheckBox
                            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                            left
                            title={<Text style={{paddingLeft:'2%', color:'black'}}>Aumentar masa muscular</Text>}
                            checkedIcon='dot-circle-o'
                            checkedColor='#FF9933'
                            uncheckedIcon='circle-o'
                            checked={this.state.check4}
                            onPress={this.onCheck4}
                        />
                    
                    {/* Actividad física */}
                        
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.textStyleBold, {marginTop: '3%'}]}> Indica tu nivel de actividad física </Text> 
                            

                            <TouchableOpacity style={{ paddingLeft: "3%", paddingTop: '3.8%'}} onPress={this.toggleOverlay}>
                                <View style={styles.questionButton}>
                                    <Text style={{color:'black'}}> ? </Text>
                                </View>
                            </TouchableOpacity>

                            <Overlay 
                                visible={this.state.visibleOverlay}
                                onBackdropPress={this.toggleOverlay}
                            >
                                <Card>
                                    <Text style={styles.overlayText}>
                                        <Text style={{fontWeight: "bold"}}>Sedentario:</Text>{"\n"}
                                        <Text style>    
                                            No realizar actividad física fuera de sus actividades diarias.
                                        </Text>{"\n"}{"\n"}
                                        <Text style={{fontWeight: "bold"}}>Actividad ligera:</Text>{"\n"}
                                        <Text style>
                                            Realizar ejercicio <Text style={{fontWeight: "bold"}}>1 a 3 días </Text>en la semana con intensidad moderada (1 hora de trote, fútbol o básquetbol).
                                        </Text>{"\n"}{"\n"}
                                        <Text style={{fontWeight: "bold"}}>Actividad moderada:</Text>{"\n"}
                                        <Text style>
                                            Realizar ejercicio de <Text style={{fontWeight: "bold"}}>3 a 5 días </Text>en la semana con intensidad moderada.
                                        </Text>{"\n"}{"\n"}
                                        <Text style={{fontWeight: "bold"}}>Muy activo:</Text>{"\n"}
                                        <Text style>
                                            Realizar ejercicio <Text style={{fontWeight: "bold"}}>6 a 7 días </Text>en la semana de forma intensa (2 horas de trote, fútbol o básquetbol).
                                        </Text>{"\n"}{"\n"}
                                        <Text style={{fontWeight: "bold"}}>Extremadamente activo:{"\n"}</Text>
                                        <Text>
                                            Realizar ejercicio <Text style={{fontWeight: "bold"}}>7 días </Text>en la semana de forma muy intensa (3 horas de trote, fútbol o básquetbol).
                                        </Text>
                                    </Text>
                                </Card>
                                
                            </Overlay>
                        </View>

                        <CheckBox
                            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                            left
                            title={<Text style={{paddingLeft:'2%', color:'black'}}>Sedentario</Text>}
                            checkedColor='#FF9933'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={this.state.check12}
                            onPress={this.onCheck12}
                        />
                    
                        <CheckBox
                            containerStyle={{ backgroundColor: 'transparent', borderWidth:0, margin: 0 }}
                            left
                            title={<Text style={{paddingLeft:'2%', color:'black'}}>Actividad ligera</Text>}
                            checkedIcon='dot-circle-o'
                            checkedColor='#FF9933'
                            uncheckedIcon='circle-o'
                            checked={this.state.check22}
                            onPress={this.onCheck22}
                        />
                        
                        <CheckBox
                            containerStyle={{ backgroundColor: 'transparent', borderWidth:0, margin: 0 }}
                            left
                            title={<Text style={{paddingLeft:'2%', color:'black'}}>Actividad moderada</Text>}
                            checkedIcon='dot-circle-o'
                            checkedColor='#FF9933'
                            uncheckedIcon='circle-o'
                            checked={this.state.check32}
                            onPress={this.onCheck32}
                        />
                        <CheckBox
                            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                            left
                            title={<Text style={{paddingLeft:'2%', color:'black'}}>Muy activo</Text>}
                            checkedIcon='dot-circle-o'
                            checkedColor='#FF9933'
                            uncheckedIcon='circle-o'
                            checked={this.state.check42}
                            onPress={this.onCheck42}
                        />
                        <CheckBox
                            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                            left
                            title={<Text style={{paddingLeft:'2%', color:'black'}}>Extremadamente activo</Text>}
                            checkedIcon='dot-circle-o'
                            checkedColor='#FF9933'
                            uncheckedIcon='circle-o'
                            checked={this.state.check52}
                            onPress={this.onCheck52}
                        />
                    </Card>
                    <View>
                        <TouchableOpacity 
                            style={{
                                backgroundColor: "#FF9933",
                                borderRadius: 10,
                                padding: 5,
                                margin: 20,
                                height: "25%",
                                width: "auto",
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => this.setState({visible: false,})}
                        >
                            <View style={{
                            }}>
                                <Text style={styles.textStyleBold}>
                                    Generar consejos
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            : 
            // Vista de cálculo
                <View style={{ alignItems: "center" }}>
                    {this.calcularTasa()}
                </View>
            }
        </View>
        </ScrollView>
	    );
    }
}

export default ConsejosN;
