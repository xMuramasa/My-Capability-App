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

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

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

    const card_bg = props.user ? "#FF9933" : "#F9C784";
    const rank_color = props.user ? "#EEEEEE" : "#000000";
    const name = props.user ? "#EEEEEE" : "#000000";
    const score = props.user ? "#EEEEEE" : "#000000";

    return (
        <View style={{ paddingTop: "3%" }}>
            <Card cardColor={card_bg}>
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1, flexDirection: "column" }}>
                            <Text style={[styles.textCard, {alignSelf: "flex-start", color: rank_color}]}>
                                {props.rank}
                            </Text>
                        </View>

                        <View style={{ flex: 3, flexDirection: "column" }}>
                            <Text style={[styles.textCard, {alignSelf: "flex-start", color: name}]}>
                                {props.username} {props.user ? "(Tú)": ""}
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "column" }}>
                            <Text style={[styles.textCard, {alignSelf: "flex-end", color: score}]}>
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
            usersInfo: [],
            dataReady: null
        };
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

    // obtener los datos de los usuarios que nos interesan (los vecinos del usuario actual)
    getUsersInfo(usersData){

        var d = usersData.length-1;
        // console.log("lista inicial:", usersData)

        // console.log("usersData.length: ", usersData.length)
        while (usersData[d].id != GLOBAL.user_id && d > 0){
            d--;
        }
        const user_index = d;
        
        // definir límites de ranking
        const minUserIndex = d - deltaUsers < 0 ? 0 : d - deltaUsers;
        const maxUserIndex = d + deltaUsers >= usersData.length ? usersData.length : d + deltaUsers + 1;

        usersData = usersData.slice(minUserIndex, maxUserIndex);

        var aux = deltaUsers;
        for (d = usersData.length-1; d >= 0; d--){
            usersData[d].rank = user_index + aux + 1;
            aux--;
        }

        // console.log("lista final:", usersData)
        return usersData;
    }

    rankUsers(){
        if (this.usersInfo.length > 0){
            //agregar rank a cada elemento
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
                            <Card cardColor={"#5BC0EB"}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ flex: 1, flexDirection: "column" }}>
                                        <Text style={[styles.textCard, {alignSelf: "flex-start", color: "#000000"}]}>
                                            N°
                                        </Text>
                                    </View>
            
                                    <View style={{ flex: 1, flexDirection: "column" }}>
                                        <Text style={[styles.textCard, {alignSelf:"flex-start", color: "#000000"}]}>
                                            Nombre
                                        </Text>
                                    </View>
            
                                    <View style={{ flex: 1, flexDirection: "column" }}>
                                        <Text style={[styles.textCard, {alignSelf: "flex-end", color: "#000000"}]}>
                                            Puntaje
                                        </Text>
                                    </View>
                                </View>    
                            </Card>
                        {this.state.usersInfo.map((row, index) => (
                            <View>
                                { row.id === GLOBAL.user_id ?
                                    <CardInfo
                                        key = {index}
                                        rank = {row.rank}
                                        username = {row.username}
                                        score = {row.score}
                                        user = {true}
                                    />
                                    :
                                    <CardInfo
                                        key = {index}
                                        rank = {row.rank}
                                        username = {row.username}
                                        score = {row.score}
                                        user = {false}
                                    />
                                }
                            </View>
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

