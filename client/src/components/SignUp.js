import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'
import { Button } from 'react-native-paper';
import addUser from "../API/addUser.js"
import checkEmail from "../API/checkEmail.js"
//import { withNavigation } from 'react-navigation/native';

function debounce(fn, delay) {
    let timeoutID
    return function (...args) {
        if (timeoutID) {
            clearTimeout(timeoutID)
        }
        timeoutID = setTimeout(() => {
            fn(...args)
        }, delay);
    }
}

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password1: "",
            password2: "",
            email: "",
            userError: false,
            passwordError: false,
            samePassword: true,
            emailError: false,
            emailExist: false,
            emptyInput: false,
        };
    }

    onChangeUser = debounce((text) => {
        if (text.length > 5) {
            this.setState({ username: text })
            this.setState({ userError: false })
        } else {
            this.setState({ username: text })
            this.setState({ userError: true })
        }
    }, 10000);

    onChangeEmail = debounce((text) => {
        var re = /\S+@\S+\.\S+/;
        if (re.test(text)) {
            this.setState({ email: text })
            this.setState({ emailError: false })
        } else {
            this.setState({ email: text })
            this.setState({ emailError: true })
        }
    }, 10100);

    onChangePass1 = debounce((text) => {
        if (text.length > 5) {
            this.setState({ password1: text })
            this.setState({ passwordError: false })
        } else {
            this.setState({ password1: text })
            this.setState({ passwordError: true })
        }
    }, 10000);

    onChangePass2 = debounce((text) => {
        if (text.length > 5) {
            this.setState({ password2: text })
            this.setState({ passwordError: false })
        } else {
            this.setState({ password2: text })
            this.setState({ passwordError: true })
        }

        if (this.state.password1 === this.state.password2) {
            this.setState({ samePassword: true })
        } else {
            this.setState({ samePassword: false })
        }

    }, 10000);

    checkEmpty = () => {
        if (this.state.username == "" && this.state.password1 == "" && this.state.email == "" && this.state.password2 == "") {
            return true
        } else {
            return false
        }
    }


    checkSignup = () => {
        //console.log("DATA: ", this.state.username, this.state.password, this.state.email)
        //console.log("usuario agregado")
        checkEmail(this.state.email).then((results) => {
            if (results.exists == false){
                this.setState({ emailExist: false})
                if (!this.state.userError && !this.state.passwordError && this.state.samePassword && !this.state.emailError) {
                    console.log(this.state.username, this.state.password1, this.state.email)
                    addUser(this.state.username, this.state.password1, this.state.email)
                    this.props.navigation.navigate('Iniciar sesion')
                } 
                else {
                    console.log("Error en los Datos")
                }
            } 
            else {
                if (this.checkEmpty()){
                    console.log("Campos Vacios")
                    this.setState({ emptyInput: true  })
                }
                else {
                    console.log("Email existe")
                    this.setState({ emailExist: true})
                }
            }
        })

    }

    render() {
        return (
            <View>
 
                <Card style={{marginBottom: 10}}>
                    
                    {!this.state.userError ?
                        <View style={styles.inputView}>
                            <Text style={styles.header}> Nombre de usuario </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={this.onChangeUser}
                                placeholder="Nombre de usuario"
                                keyboardType="default"
                            />
                        </View>
                        :
                        <View style={styles.inputView}>
                            <Text style={styles.header}> Nombre de usuario </Text>
                            <TextInput
                                style={styles.inputError}
                                onChangeText={this.onChangeUser}
                                placeholder="Nombre de usuario"
                                keyboardType="default"
                            />
                            <Text style={styles.textError}> Nombre debe contener al menos 6 caracteres </Text>
                        </View>
                    }

                    {!this.state.emailError ?
                        <View style={styles.inputView}>
                            <Text style={styles.header}> Correo </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={this.onChangeEmail}
                                placeholder="Ejemplo@ejemplo.com"
                                keyboardType="default"
                            />
                        </View>
                        :
                        <View style={styles.inputView}>
                            <Text style={styles.header}> Correo </Text>
                            <TextInput
                                style={styles.inputError}
                                onChangeText={this.onChangeEmail}
                                placeholder="Ejemplo@ejemplo.com"
                                keyboardType="default"
                            />
                            <Text style={styles.textError}> Formato de correo inválido </Text>
                        </View>
                    }
                    
                    {!this.state.passwordError ?
                        <View style={styles.inputView}>
                            <Text style={styles.header}> Contraseña </Text>
                            <TextInput
                                id="passwordInput"
                                secureTextEntry={true}
                                style={styles.input}
                                onChangeText={this.onChangePass1}
                                placeholder="Contraseña"
                                keyboardType="default"
                            />
                        </View>
                        :
                        <View style={styles.inputView}>
                            <Text style={styles.header}> Contraseña </Text>
                            <TextInput
                                id="passwordInput"
                                secureTextEntry={true}
                                style={styles.inputError}
                                onChangeText={this.onChangePass1}
                                placeholder="Contraseña"
                                keyboardType="default"
                            />
                            <Text style={styles.textError}> La contraseña debe tener más de 5 caracteres </Text>
                        </View>
                    }

                    {this.state.samePassword ?
                        <View style={styles.inputView}>
                            <Text style={styles.header}> Confirmar contraseña </Text>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.input}
                                onChangeText={this.onChangePass2}
                                placeholder="Contraseña"
                                keyboardType="default"
                            />
                        </View>
                        :
                        <View style={styles.inputView}>
                            <Text style={styles.header}> Confirmar contraseña </Text>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.inputError}
                                onChangeText={this.onChangePass2}
                                placeholder="Contraseña"
                                keyboardType="default"
                            />
                            <Text style={styles.textError}> Las contraseñas no coinciden</Text>
                        </View>
                        

                    }

                    {this.state.emailExist ?
                        <View style={styles.inputView}>
                            <Text style={styles.textError2}> Este correo ya se encuentra registrado </Text>
                        </View>
                        :
                        null
                    }

                    {this.state.emptyInput ?
                        <View style={styles.inputView}>
                            <Text style={styles.textError2}> Es necesario rellenar los campos </Text>
                        </View>
                        :
                        null
                    }

                
                    <View style={styles.buttonView}>
                        <Button
                            style={styles.buttonStyle}
                            mode="contained"
                            onPress={this.checkSignup}
                            color="#FF9933"
                        >
                            Registrarse
                        </Button>
                    </View>

                </Card>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    input: {
        height: 45,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        borderRadius: 10,
    },
    inputError: {
        height: 45,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: "red",
        borderRadius: 10,
    },
    inputView: {
        marginTop: 20,
    },
    cardStyle:{
        borderWidth: 1,
    },
    underline: {
        textDecorationLine: 'underline'
    },
    header:{
        fontWeight: "bold",
        fontSize: 17,
        color: "black",
        marginLeft: 10,
    },
    textError: {
        color: "red"
    },
    textError2: {
        color: "red",
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
    },
    buttonView: {
        marginTop: 20,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        height: 40,
        width: "80%",
        borderRadius: 10,
    }
});


export default SignUp;