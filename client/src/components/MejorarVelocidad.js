import GLOBAL from './global.js'

import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { Overlay } from 'react-native-elements'

import Card from "./Card";
import { CheckBox } from 'react-native-elements'

var winHeight = Dimensions.get("window").height;
var winWidth = Dimensions.get("window").width;


class MejorarVelocidad extends Component {
    constructor(props){
        super(props);
        this.state={
            visible: false,
            checkList: [false,false,false,false],
            randList: [],
            imgId: 0,
        }
    }
    
    onCheck0 = (arr, week, t) =>{
        this.setState({ 
            checkList: [true, false, false, false],
            randList: this.generateRandomArr(arr, 1, t),
        })
    }
    onCheck1 = (arr, week, t) =>{
        this.setState({ 
            checkList: [false, true, false, false],
            randList: this.generateRandomArr(arr, 2, t)
        })
    }
    onCheck2 = (arr, week, t) => {
        this.setState({ 
            checkList: [false, false, true, false],
            randList: this.generateRandomArr(arr, 3, t)
        })
    }
    onCheck3 = (arr, week, t) => {
        this.setState({ 
            checkList: [false, false, false, true],
            randList: this.generateRandomArr(arr, 4, t)
        })
    }

    toggleOverlay = () => {
        this.setState({ 
            visible: !this.state.visible,
         })
    };

    toggleOverlay2 = (img) => {
        this.setState({ 
            imgId: img
         })
    };

    generateRandomArr = (arr, week, t) => {
        let shuffled = arr
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        
        var newArr = []
        for (const key in shuffled) {
            if(shuffled[key].tipo === t || shuffled[key].tipo === 3){
                if(shuffled[key].semana === week || shuffled[key].semana === 0){
                    newArr.push(shuffled[key]);
                }
            }
        }
        return newArr.slice(0, 3);
    };

    render(){
        const { dat } = this.props.route.params;
        //console.log("mejora dat", dat)

        return(
            <ScrollView>
            <View style={{ alignItems: 'center', paddingTop: "5%" }}>
                <Card style={{ width: '70%' }} cardColor={"white"}>
                    <View style={{ flexDirection: "column", alignItems: 'center'}}>

                        <Text style={{ color: 'black', fontWeight: "bold", fontSize: 17}}> Selecciona la semana de entrenamiento (repetir entrenamiento día por medio): </Text>
                        <View style={{ flexDirection: "row" }}>
                            <CheckBox
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                                left
                                title={<Text style={{color:'black', fontWeight: "bold"}}> Semana 1 </Text>}
                                checkedColor='#FF9933'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.checkList[0]}
                                onPress={() => this.onCheck0(dat, 1, 2)}
                            />
                            <CheckBox
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                                left
                                title={<Text style={{color:'black', fontWeight: "bold",}}> Semana 2 </Text>}
                                checkedColor='#FF9933'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.checkList[1]}
                                onPress={() => this.onCheck1(dat, 2, 2)}
                            />
                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <CheckBox
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                                left
                                title={<Text style={{ color: 'black', fontWeight: "bold", }}> Semana 3 </Text>}
                                checkedColor='#FF9933'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.checkList[2]}
                                onPress={() => this.onCheck2(dat, 3, 2)}
                            />
                            <CheckBox
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                                left
                                title={<Text style={{ color: 'black', fontWeight: "bold", }}> Semana 4 </Text>}
                                checkedColor='#FF9933'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.checkList[3]}
                                onPress={() => this.onCheck3(dat, 4, 2)}
                            />
                        </View>
                    </View>
                </Card>

                {this.state.checkList.map((check, index1) => {
                    if(check){
                        return(
                            <View key={index1} style={{flexDirection: "column", paddingTop: "1%" }}>
                                
                                <View style={{justifyContent: 'center', position: 'relative'}}>
                                    {this.state.randList.map((item, index2)=>{
                                        return(
                                            <View key={index2} style={{
                                                backgroundColor:'#ff9933',
                                                borderRadius: 8,
                                                margin: '5%',
                                                }}
                                            >   
                                                <Text style={[styles.textStyleBold, { textAlign: 'center', paddingTop: "1%"}]}>
                                                    {item.titulo}
                                                </Text>
                                                <Text style={[styles.textStyle, { fontSize: 16 }]}>
                                                    {item.descripcion}
                                                </Text>
                                                <Text style={[styles.textStyle, { fontSize: 16, fontWeight: "bold" }]}>
                                                    Repeticiones: {item.reps}
                                                </Text>
                                                <TouchableOpacity
                                                    style={{ alignItems: 'center', justifyContent: 'center'}}
                                                    onPress={()=>this.toggleOverlay2(index2)}
                                                >
                                                    {/* <View style={styles.questionButton}>
                                                        <Text style={styles.buttonText}> Ver ejemplo </Text>
                                                    </View> */}
                                                    <View style={{ alignItems: 'center' }}>
                                                    <Image 
                                                        resizeMode='contain' 
                                                        style={{
                                                            width: 150, 
                                                            height: 150,
                                                            paddingBottom: 10
                                                        }} 
                                                        source={item.imagen} 
                                                    />
                                                    </View>
                                                </TouchableOpacity>
                                                
                                            </View>
                                        )})
                                    }
                                </View>
                            </View>
                        )
                    }})
                }
            </View>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
		fontSize: 18,
        margin: 5,
		color: "black",
        paddingLeft: "5%",
        paddingRight: "5%",
        textAlign: 'justify'
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
	},
	buttonView2: {
		justifyContent: 'center',
        alignItems: 'center',
		flexDirection: "row"
	},
    buttonText:{
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "center",
        textTransform: "uppercase",
        color: "orange",
    },
    questionButton: {
        borderRadius: 8,
        height: 35,
        width: 200,
        margin:"5%",
        //backgroundColor: "#FF9933",
        justifyContent: 'center',
        // backgroundColor: "#7b97ea",
        backgroundColor: "black",
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

export default MejorarVelocidad;