import React, { Component } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity, 
    SafeAreaView, Share, ScrollView, ActivityIndicator, Image } from 'react-native';

// API
import getResultsByUserId from '../API/getResultsByUserId';

//Componentes
import Card from "./Card.js";
import { ModalPicker } from "./ModalPicker.js";
// import Loading from "./deprecated - Loading.js";

import GLOBAL from './global'

// const screenWidth = Dimensions.get("window").width;

splitDate = (d) => {
	// 2021-07-21T00:00
	// 31-07-21
	var f = d.slice(0, 16).split("T")[0]; //fecha
	var f2 = f.split("-").reverse(); //fecha inv
	f2[2] = f2[2].slice(2,4);
	var f3 = f2.join("-");

	// var h = d.slice(0, 16).split("T")[1];//hora

	return f3 /*+ " " + h*/;
}

function CardInfo(props){

    var Tipo_bg;
    var unidad;
    var titulo;
    switch (props.tipo){
        case 0:
            titulo = "Salto Vertical"
            Tipo_bg = "#EB851E";
            unidad = "m"
            break;

        case 1:
            titulo = "Velocidad"
            Tipo_bg = "#5BC0EB";
            unidad = "Km/h"
            break;

        case 2:
            titulo = "Salto Horizontal"
            Tipo_bg = "#F9C784";
            unidad = "m"
            break;

        default:
            titulo = ""
            Tipo_bg = "";
            unidad = ""
            break;
    }
    const onShare = async (medicion, tipo) => {
        let result
        try {
            if (tipo === 0) {
                result = await Share.share({
                    message: 'He logrado un salto vertical de ' + medicion + ' metros utilizando MyCapability. \n\nEncuéntralos en https://mycapability.feriadesoftware.cl'
                });
            }
            else if (tipo === 1) { //velocidad
                result = await Share.share({
                    message: 'He logrado una velocidad de ' + medicion + ' km/h utilizando MyCapability. \n\nEncuéntralos en https://mycapability.feriadesoftware.cl'
                });
            }
            else if (tipo === 2) { //salto horizontal
                result = await Share.share({
                    message: 'He logrado un salto horizontal de ' + medicion + ' metros utilizando MyCapability. \n\nEncuéntralos en https://mycapability.feriadesoftware.cl'
                });
            }

            const result = await Share.share({
                message: ''
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                    console.log("compartido con: ", result.activityType)
                }
                else {
                    // shared
                    console.log("compartido")
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
                console.log("dismissed")
            }
        } catch (error) {
            alert(error.message);
            console.log("error al compartir")
        };
    }

    return (
        <View style={{ paddingTop: "3%" }}>
            <Card cardColor={Tipo_bg}>
                <View>
                    {props.All ?
                        <Text style={[styles.textCard, { alignSelf: "flex-start"}]}>{titulo} </Text>
                        :
                        null
                    }

                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: "column", width: "33%" }}>
                            <Text style={[styles.textCard, { alignSelf: "flex-start" }]}>{splitDate(props.fecha)} </Text>
                        </View>

                        <View style={{flexDirection: "column", width: "33%" }}>
                            <Text style={[styles.textCard, { alignSelf: "center"}]}>{props.resultado.toFixed(2)} {unidad}</Text>
                        </View>

                        <View style={{ flexDirection: "column", width: "33%" }}>
                            <TouchableOpacity
                                onPress={() => onShare(props.resultado.toFixed(2),props.tipo)}
                                style={{
                                    justifyContent: "center", 
                                    alignSelf: "flex-end", 
                                    paddingTop: "5%", 
                                    width: "35%",
                                }}
                            >
                                <View style={{ 
                                    backgroundColor: "white", 
                                    justifyContent:  'center', 
                                    alignItems: 'center', 
                                    flexDirection: "row", 
                                    borderRadius: 5
                                    }}
                                >
                                    <Image style={{ height: 30, width: 30}} source={require("../images/compartir.png")} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    )
}

class HistorialIndividual extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chooseData: "Seleciona un item...",
            chooseType: null,
            isModalVisible: false,
            user_id: GLOBAL.user_id,		//implementar usuarios
			resultData: [],
            dataReady: null
        };
    }

    async componentDidUpdate(_, prevState) {
        if (prevState.chooseData != this.state.chooseData){
            try{
                this.setState({ dataReady: false })
                getResultsByUserId(this.state.user_id).then((results) => {
                    this.setState({ resultData: results })
                    this.setState({ dataReady: true })
                });
            } catch (err) {
                console.error(err);
            }
        }
	}

    setchooseData = (text) => {
        this.setState({ chooseData: text })
	}
    setchooseType = (tipo) => {
        this.setState({ chooseType: tipo })
	}
    setisModalVisible = (estado) => {
        this.setState({ isModalVisible: estado })
    }

    render(){
        const changeModalVisibility = (bool) => {
            this.setisModalVisible(bool)
        }
        const setData = (option) => {
            this.setchooseData(option)
        }
        const setType = (tipo) => {
            this.setchooseType(tipo)
        }

        const showAll = (this.state.chooseType === -1) ? true : false

        return ( 
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => changeModalVisibility(true)}
                    style={styles.touchableStyle}
                >
                    <Text style={styles.textStyle}> {this.state.chooseData} </Text>
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={this.state.isModalVisible}
                    nRequestClose={() => changeModalVisibility(false)}
                    >
                    <ModalPicker
                        changeModalVisibility={changeModalVisibility}
                        setData={setData}
                        setType={setType}
                        />

                </Modal>

                {/* círculo de carga */}
                {this.state.dataReady === false &&
                    <View style={{flex:1, justifyContent: "center", paddingTop: "30%"}}>
                        <ActivityIndicator size={"200%"} color="#FC7A1E" />
                    </View>
                }

                <ScrollView> 
                    {showAll ?
                        <View style={{flex:1, alignItems: "center", alignContent:"center"}}>
                            {this.state.resultData.length > 0 ? 
                                this.state.resultData.map((row, index) => (
                                        <CardInfo
                                            key = {index}
                                            tipo = {row.type}
                                            resultado = {row.result}
                                            fecha = {row.date}
                                            All = {true}
                                        />
                                ))
                                :
                                <Text style={styles.textStyle}>Sin datos</Text>
                            }
                            </View>
                            :
                            <View style={{ flex: 1, alignItems: "center", alignContent: "center" }}>
                                {this.state.resultData.length > 0 ? 
                                    this.state.resultData
                                        .filter(d => d.type === this.state.chooseType)
                                        .map((row, index) => (
                                            <CardInfo
                                                key={index}
                                                tipo={row.type}
                                                resultado={row.result}
                                                fecha={row.date}
                                                All={false}
                                            />
                                        ))
                                    :
                                    <Text style={styles.textStyle}>Sin datos</Text>
                                } 
                            </View>
                        }
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        padding: "3%"
    },
    textStyle: {
        marginVertical: 20,
        fontSize: 25
    },
    touchableStyle: {
        backgroundColor: "white",
        alignSelf: "stretch",
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation:10
    },
    cardStyle: {
        paddingTop: "20%",
    },
    textCard: {
        fontSize: 20,
        fontWeight: "bold",
        padding: "1%"
    },
buttonText: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center",
        textTransform: "uppercase",
        color: "black"
    },
})

export default HistorialIndividual;

