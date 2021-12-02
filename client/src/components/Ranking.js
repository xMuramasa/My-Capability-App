import React, { Component } from "react";
import {
    StyleSheet, 
    Text, 
    View, 
    ScrollView, 
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    TextInput
} from 'react-native';

// API
import getAllUsers from '../API/getAllUsers';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

//Componentes
import Card from "./Card.js";

import GLOBAL from './global';

// const screenWidth = Dimensions.get("window").width;

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
                                <TouchableOpacity onPress={props.profileHandler}>
                                    <Text style={[styles.textCard, {alignSelf: "flex-start", color: name}]}>
                                        {props.username} {props.user ? "(Tú)": ""}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        <View style={{ flex: 2, flexDirection: "column" }}>
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
            dataReady: null,
            showModal: false,
            userSelected: {
                username: '',
                gender: '',
                age: '',
                height: '',
                weight: '',
                score: ''
            }
        };
    }

    componentDidMount(){
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

    openModal(){
        this.setState({ showModal: !this.state.showModal })
        // set info perfil externo
        // this.setState({ rutinaName: "" })
    }

    profileHandler(id) {
        console.log(this.state.usersInfo[id])
        this.setState({
            userSelected: this.state.usersInfo[id]
        })
        this.openModal();
    }

    sexString(value){
        switch (value){
            case "0":
                return "Hombre"
            case "1":
                return "Mujer"
            default:
                return ""
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

    render(){

        const { userSelected } = this.state

        return (
            <View style={styles.container}>

                {/* círculo de carga */}
                {this.state.dataReady === false &&
                    <View style={{flex:1, justifyContent: "center", paddingTop: "30%"}}>
                        <ActivityIndicator size={"200%"} color="#FC7A1E" />
                    </View>
                }
                
                <Modal 
                    transparent
                    visible={this.state.showModal}
                    onRequestClose={() => this.openModal()}
                >

                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <View>
                                <Text style={[styles.modalText, {textAlign: "center", paddingBottom: '10%', paddingTop:-80, fontSize: 20}]}>
                                        {userSelected.username}
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row" }}>
                                {/* Columna izquierda */}
                                <View style={{ flexDirection: "column", width: '50%'}}>
                                    
                                    <Text style={styles.modalText}> Edad </Text>
                                    <Text style={styles.modalText2}>
                                        {userSelected.age}
                                    </Text>

                                    <Text style={styles.modalText}> Sexo biológico </Text>
                                    <Text style={styles.modalText2}>
                                        {this.sexString(userSelected.gender)}
                                    </Text>
                                    

                                    <Text style={styles.modalText}> Puntuación </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.modalText2}>
                                            {userSelected.score}
                                        </Text>

                                    </View>
                                </View>
                                
                                {/* Columna derecha */}
                                <View style={{ flexDirection: "column", width: '50%', paddingLeft: '10%'}}>
                                    <Text style={styles.modalText}> Altura (cm)</Text>
                                    <Text style={styles.modalText2}>
                                        {userSelected.height}
                                    </Text>
                                    <Text style={styles.modalText}> Peso (kg)</Text>
                                    <Text style={styles.modalText2}>
                                        {userSelected.weight}
                                    </Text>

                                </View>
                            </View>
                    
                            <TouchableOpacity
                                onPress={() => { this.openModal()}}
                            >
                                <View style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>Volver</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                
                
                <ScrollView>
                    <View style={{flex:1, alignItems: "center", alignContent:"center"}}>
                            <Card cardColor={"#E7E7E7"}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ flex: 1, flexDirection: "column" }}>
                                        <Text style={[styles.textCard, {alignSelf: "flex-start", color: "#000000"}]}>
                                            N°
                                        </Text>
                                    </View>
            
                                    <View style={{ flex: 3, flexDirection: "column" }}>
                                        <Text style={[styles.textCard, {alignSelf:"flex-start", color: "#000000"}]}>
                                            Nombre
                                        </Text>
                                    </View>
            
                                    <View style={{ flex: 2  , flexDirection: "column" }}>
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
                                        profileHandler={()=> this.profileHandler(index)}
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
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer:{
        width: '80%',
        backgroundColor: 'white',
        padding: '10%',
        borderRadius: 10,
        elevation: 20,
    },
    modalButton: {
        flexDirection: "row",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: "5%",
        backgroundColor: "#FF9933",
        color: "#ffffff",
        height: 40,
    },
    modalText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        paddingBottom: '5%'
    },
    modalText2: {
        fontSize: 15,
        color: "black",
        paddingLeft: '3%',
        paddingBottom:'5%'
    },
    modalButtonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
        width: "20%",
        paddingRight: 5
    },
})

export default Ranking;

