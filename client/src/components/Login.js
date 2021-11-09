import React, { Component } from "react";
import { Text, View, TextInput, Pressable, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'
import { Button } from 'react-native-paper';

import interfaz from '../styles/styles.js';
import checkUser from "../API/checkUser.js";
import getUserData from '../API/getUserData';

import GLOBAL from './global.js';
//import { withNavigation } from 'react-navigation/native';

const styles = StyleSheet.create({
    input: {
        height: 45,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        borderRadius: 10,
    },
    cardView:{
        marginTop: 20,
    },
    inputView: {
        marginTop: 15,
    },
    header:{
        fontWeight: "bold",
        fontSize: 17,
        color: "black",
        marginLeft: 10,
    },
    textError: {
        color: "red",
        textAlign: 'center',
        fontSize: 15,
    },
    signupTextView:{
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    signupText:{
        textAlign: 'center',
        fontSize: 16
    },
    signupUnderline: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontSize: 16
    },
    buttonView: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'  
    },
    buttonStyle: {
        height: 40,
        width: "80%",
        borderRadius: 10,
    },
    imageStyle:{
        height: 200,
        width: "auto"
    }
});

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            loginError: false,
        };
        GLOBAL.user_id = null;
    }

    onChangeEmail = (text) => {
        this.setState({ email: text })
	}

    onChangePass = (text) => {
		this.setState({ pass: text })
	}
    empty = () => {
        if (this.state.email == "" && this.state.pass == "") {
            return true
        } else {
            return false
        }
    }

    checkLogin = () => {
        checkUser(this.state.email, this.state.pass).then((results) => {
            //console.log("RESULTS: ", Object.keys(results).length === 0)
            console.log("RES: ", typeof(results))
            if (typeof results === 'object' && results !== null && !this.empty()){
                this.setState({ loginError: false })
                GLOBAL.user_id = results.id;

                try {
                    getUserData(results.id).then((result) => {
                        
                        GLOBAL.height = result.height
                        GLOBAL.weight = result.weight
                        GLOBAL.fat = result.fat_percent
                        GLOBAL.age = result.age
                        GLOBAL.sex =  result.gender
                        console.log("aqui se guarda ", GLOBAL.sex)
                        
                    });
                } catch(err) {
                    console.log(err)
                };
                

                // GLOBAL

                this.props.navigation.navigate('Inicio')
            } else {
                this.setState({ loginError: true })
            }
        })
    }


    render() {
        return(
            <ScrollView>
                <View style={styles.cardView}>
                    <Card>
                        <Card.Image style={styles.imageStyle} source={require('../images/logologin.png')}/>

                        {this.state.loginError ?
                            <View style={styles.inputView}>
                                <Text style={styles.textError}> Correo o contraseña inválidos </Text>
                            </View>
                            :
                            null
                        }
                        <View style={styles.inputView}>
                            <Text style={styles.header}> Correo </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={this.onChangeEmail}
                                placeholder="Ejemplo@ejemplo.com"
                                keyboardType="default"
                            />
                        </View>

                        <View style={styles.inputView}>
                            <Text style={styles.header}> Contraseña </Text>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.input}
                                onChangeText={this.onChangePass}
                                placeholder="Contraseña"
                                keyboardType="default"
                            />
                        </View>

                        <View style={styles.buttonView}>
                            <Button
                                style={styles.buttonStyle}
                                mode="contained" 
                                onPress={this.checkLogin}
                                color="#FF9933"
                            >
                                Iniciar Sesión
                            </Button>
                        </View>

                        <View style={styles.signupTextView}>
                            <Text style={styles.signupText}>
                                ¿No tienes una cuenta?{" "}
                                <Text style={styles.signupUnderline} onPress={() => this.props.navigation.navigate('Registrarse') } >
                                    Registrarse.
                                </Text>
                            </Text>
                        </View>

                    </Card>

                
                    <View style={interfaz.space} />
            
                </View>
            </ScrollView>
            

        )
    }

}

export default Login;