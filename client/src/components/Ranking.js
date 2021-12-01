import React, { Component } from "react";
import {
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    Dimensions, 
    ScrollView, 
    ActivityIndicator 
} from 'react-native';

// API
import getAllUsers from '../API/getAllUsers';


//Cambiar distintas cosas de la app
// actualizar puntaje cada vez que se publique un resultado (verificando si es mejor o no)
// * en perfil obtener puntaje a partir de tabla de usuario 
// now, just do it

//Componentes
import Card from "./Card.js";

import GLOBAL from './global';

// const screenWidth = Dimensions.get("window").width;

//AGREGAR POSICIÓN EN RANKING


const deltaUsers = 4;

function CardInfo(props){

    return (
        <View style={{ paddingTop: "3%" }}>
            <Card cardColor={"#EB851E"}>
                <View>

                    <View style={{ flexDirection: "row" }}>

                        <View style={{ flex: 1, flexDirection: "column" }}>
                            <Text style={[styles.textCard, {alignSelf: "flex-start", color: "#999999"}]}>
                                {props.rank}   {/*  CAMBIAR A props.rank*/}
                            </Text>
                        </View>

                        <View style={{ flex: 3, flexDirection: "column" }}>
                            <Text style={[styles.textCard, {alignSelf: "flex-start"}]}>
                                {props.username}
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "column" }}>
                            <Text style={[styles.textCard, {alignSelf: "flex-end"}]}>
                                {props.score}
                            </Text>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    )
}



class Ranking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: GLOBAL.user_id,
            // user_rank: 0,
            usersInfo: [],
            dataReady: null
        };
    }

    // obtener los datos de los usuarios que nos interesan (los vecinos del usuario actual)
    getUsersInfo(usersData){
        // user_id
        console.log("lista inicial:" + usersData)

        var user_index;
        var d = 0;

        console.log("usersData.length: " + usersData.length)
        while (usersData[d].id != this.state.user_id && d < usersData.length){
            d++;
        }
        user_index = d;
        
        // this.setState({user_rank: user_index}) //asumiendo que la lista viene ordenada desde el llamado API

        // definir límites de ranking
        var minUserIndex = d < deltaUsers ? 0 : d - deltaUsers;
        var maxUserIndex = d + deltaUsers >= usersData.length ? usersData.length - 1 : d + deltaUsers + 1;

        usersData = usersData.slice(minUserIndex, maxUserIndex);

        aux = -deltaUsers
        for (d = 0; d < usersData.length; d++){
            usersData[d].put("rank", user_index+aux);
            aux++;
        }

        console.log("lista final:" + usersData)
        return usersData;
    }

    rankUsers(){
        if (this.usersInfo.length > 0){
            //agregar rank a cada elemento
        }
    }

    componentDidMount = () => {
        try{
            this.setState({ dataReady: false })
            getAllUsers().then((results) => {
                this.setState({ usersInfo: this.getUsersInfo(results) })
                this.setState({ dataReady: true })
            });
        } catch (err) {
            console.error(err);
        }
	}



    render(){

        return (
            <View style={styles.container}>

                {/* círculo de carga */}
                {this.state.dataReady === false &&
                    <View style={{flex:1, justifyContent: "center", paddingTop: "30%"}}>
                        <ActivityIndicator size={"200%"} color="#FC7A1E" />
                    </View>
                }

                <ScrollView>
                    <View style={{flex:1, alignItems: "center", alignContent:"center"}}>
                        {this.state.usersInfo.map((row, index) => (
                            <CardInfo
                                key = {index} 
                                rank = {row.rank} //CAMBIAR A RANK (?)
                                username = {row.username}
                                score = {row.score}
                            />
                        ))}
                    </View>
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
})

export default Ranking;

