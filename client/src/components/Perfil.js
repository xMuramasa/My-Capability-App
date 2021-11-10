import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Dimensions, Modal } from 'react-native';
import { Card, ListItem, Icon, Overlay , CheckBox} from 'react-native-elements'
import { Button } from 'react-native-paper';

//API
import addUser from "../API/addUser.js";
import checkEmail from "../API/checkEmail.js";
import getUserData from "../API/getUserData.js";
import updateUserData from "../API/updateUserData.js";
import getNewResults from "../API/getNewResults.js";

//OTROS
import GLOBAL from './global.js'
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

const { height } = Dimensions.get('window');

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            weight: "",
            fat_percent: "",
            age: "",
            height: "",
            sex: "",
            editInfo: true,
            visible: false,
            puntuacion: 0,
            frecuencia: "",
            checkList: GLOBAL.globalCheckList,
            saveFlag: false,
        };
    }

    checkNull = (parameter, data) => {
        if (data != null) {
            return data
        } else {
            this.state.parameter
        }
    }
    onCheck0 = () =>{
        this.setState({ 
            checkList: [true, false, false, false],
        })
    }
    onCheck1 = () =>{
        this.setState({ 
            checkList: [false, true, false, false],
        })
    }
    onCheck2 = () => {
        this.setState({
            checkList: [false, false, true, false],
        })
    }
    onCheck3 = () => {
        this.setState({
            checkList: [false, false, false, true],
        })
    }
    async componentDidMount() {
        getUserData(GLOBAL.user_id).then((data) => {
            this.setState({
                username: data.username,
                email: data.email,
                age: data.age === null ? "" : data.age.toString(),
                sex: data.gender === null ? "" : data.gender,
                height: data.height === null ? "" : data.height.toString(),
                weight: data.weight === null ? "" : data.weight.toString(),
                fat_percent: data.fat_percent === null ? "" : data.fat_percent.toString(),
                frecuencia: data.freq === null ? "" : data.freq.toString(),
            })
        })
        getNewResults(GLOBAL.user_id).then((data) => {
            const reducer = (previousValue, currentValue) => previousValue + currentValue;
            data.forEach(element => {
                this.setState({
                    puntuacion: this.state.puntuacion + (parseFloat(element.result) * 330)
                })
            })
        })
    }
    
    componentDidUpdate(_, prevState) {
        if (prevState.editInfo !== this.state.editInfo){
            let newAge = this.state.age === "" ? null : this.state.age
            let NewSex = this.state.sex === "" ? null : this.state.sex
            let newHeight = this.state.height === "" ? null : this.state.height
            let newWeight = this.state.weight === "" ? null : this.state.weight
            let newFat = this.state.fat_percent === "" ? null : this.state.fat_percent
            let newFrec = this.state.frecuencia === "" ? null : this.state.frecuencia
            updateUserData(GLOBAL.user_id, newAge, NewSex, newHeight, newWeight, newFat, newFrec)
        }
    }
    

    onChangeAge = (text) => {
        this.setState({ age: text })
        GLOBAL.age = parseFloat(text);
    };

    onChangeSex = (text) => {
        if(text === "Hombre" || text === "hombre"){
            var sexValue = 0
            
        }else if(text === "Mujer" || text === "mujer"){
            var sexValue = 1
        }
        this.setState({ sex: sexValue })
        GLOBAL.sex = sexValue;

    };

    onChangeHeight = (text) => {
        this.setState({ height: text })
        GLOBAL.h = parseFloat(text);
    };

    onChangeWeight = (text) => {
        this.setState({ weight: text })
        GLOBAL.weight = parseFloat(text);
    };

    onChangeFat = (text) => {
        this.setState({ fat_percent: text })
    };

    onChangeFrec = (text) => {
        this.setState({frecuencia: text})
    };
    
    toggleOverlay = () => {
        this.setState({ visible: !this.state.visible })
    };


    onchangeInfo = () => {
        let newAge = this.state.age === "" ? null : this.state.age
        let NewSex = this.state.sex === "" ? null : this.state.sex
        let newHeight = this.state.height === "" ? null : this.state.height
        let newWeight = this.state.weight === "" ? null : this.state.weight
        let newFat = this.state .fat_percent === "" ? null : this.state.fat_percent
        let newfreq = this.state.frecuencia === "" ? null : this.state.frecuencia
        console.log(GLOBAL.user_id, newAge, NewSex, newHeight, newWeight, newFat)
        updateUserData(GLOBAL.user_id, newAge, NewSex, newHeight, newWeight, newFat, newfreq)
        GLOBAL.globalCheckList = this.state.checkList
        this.setState({saveFlag: true})
    }

    state = {
        screenHeight: height,
    };

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight });
    };

    sexString = (value) => {
        if (value==="0"){
            return "Hombre"
        }
        else if(value === "1"){
            return "Mujer"
        }
        else
            return ""
    }

    render() {
        const scrollEnabled = this. state.screenHeight > height;
        return (
            <SafeAreaView style={styles.ScrollContainer}>
                <ScrollView
                    contentContainerStyle={styles.scrollview}
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={this.onContentSizeChange}
                >
                    <View>
                        <Card style={{marginBottom: 10}}>
                            
                            <View>
                                <Text style={styles.header}> Nombre de usuario </Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType="default"
                                    editable={false}
                                    value={this.state.username}
                                />
                            </View>

                            <View style={styles.inputView}>
                                <Text style={styles.header}> Correo </Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType="default"
                                    editable={false}
                                    value={this.state.email}
                                />
                            </View>

                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flexDirection: "column", width: '50%'}}>
                                    
                                    <Text style={styles.header}> Edad </Text>
                                    <TextInput
                                        style={this.state.editInfo ? styles.editInputStyle : styles.inputStyle}
                                        onChangeText={this.onChangeAge}
                                        keyboardType="default" 
                                        editable={this.state.editInfo}
                                        value={this.state.age}
                                    />

                                    <Text style={styles.header}> Sexo biológico </Text>
                                    <TextInput
                                        style={this.state.editInfo ? styles.editInputStyle : styles.inputStyle}
                                        keyboardType="default"
                                        editable={this.state.editIfo}
                                        onChangeText={this.onChangeSex}
                                        value={this.sexString(this.state.sex)}
                                    />

                                    <Text style={styles.header}> % de grasa </Text>
                                    <TextInput
                                        style={this.state.editInfo ? styles.editInputStyle : styles.inputStyle}
                                        onChangeText={this.onChangeFat}
                                        keyboardType="default"
                                        editable={this.state.editInfo}
                                        value={this.state.fat_percent}
                                    />
                                </View>

                                <View style={{ flexDirection: "column", width: '50%'}}>
                                    <Text style={styles.header}> Altura (cm)</Text>
                                    <TextInput
                                        style={this.state.editInfo ? styles.editInputStyle : styles.inputStyle}
                                        onChangeText={this.onChangeHeight}
                                        keyboardType="default"
                                        editable={this.state.editInfo}
                                        value={this.state.height}
                                    />

                                    <Text style={styles.header}> Peso (kg)</Text>
                                    <TextInput
                                        style={this.state.editInfo ? styles.editInputStyle : styles.inputStyle}
                                        onChangeText={this.onChangeWeight}
                                        keyboardType="default"
                                        editable={this.state.editInfo}
                                        value={this.state.weight}
                                    />

                                    <Text style={styles.header}> Puntuación </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput
                                            style={[styles.inputStyle, {width: "60%", borderBottomColor: "black", borderBottomWidth: 1}]}
                                            onChangeText={this.onChangePuntuacion}
                                            keyboardType="default"
                                            editable={false}
                                            value={this.state.puntuacion.toFixed(0)}
                                        />

                                        <TouchableOpacity style={{ justifyContent: "center" }} onPress={this.toggleOverlay}>
                                            <View style={styles.questionButton}>
                                                <Text style={styles.buttonText}> ? </Text>
                                            </View>
                                        </TouchableOpacity>

                                        <Overlay
                                            visible={this.state.visible}
                                            onBackdropPress={this.toggleOverlay}
                                        >
                                            <Card>
                                                <Text style={styles.overlayText}>
                                                    Tu puntuación de estado fisico es calculada a partir de tu
                                                    rendimiento en las mediciones de velocidad, salto vertical y salto horizontal,
                                                    por lo que sirve como indicador de tu estado físico.
                                                </Text>
                                            </Card>
                                        </Overlay>
                                    </View>

                                </View>
                            </View>


                            <Text style={[styles.header, { paddingBottom: "3%",  paddingTop:"2%"}]}> Frecuencia de correos </Text>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flexDirection: "column", width: '50%' }}>
                                    <CheckBox
                                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                                        left
                                        title={<Text style={{ color: 'black', fontWeight: "bold", fontSize:15}}> 1 semana </Text>}
                                        checkedColor='#FF9933'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={this.state.checkList[0]}
                                        onPress={() => this.onCheck0()}
                                    />
                                    <CheckBox
                                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                                        left
                                        title={<Text style={{ color: 'black', fontWeight: "bold", fontSize:15}}> 2 semanas  </Text>}
                                        checkedColor='#FF9933'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={this.state.checkList[1]}
                                        onPress={() => this.onCheck1()}
                                    />

                                </View>

                                <View style={{ flexDirection: "column", width: '50%' }}>
                                    <CheckBox
                                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                                        left
                                        title={<Text style={{ color: 'black', fontWeight: "bold", fontSize:15}}> 3 semanas  </Text>}
                                        checkedColor='#FF9933'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={this.state.checkList[2]}
                                        onPress={() => this.onCheck2()}
                                    />
                                    <CheckBox
                                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                                        left
                                        title={<Text style={{ color: 'black', fontWeight: "bold", fontSize:15}}> No enviar  </Text>}
                                        checkedColor='#FF9933'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={this.state.checkList[3]}
                                        onPress={() => this.onCheck3()}
                                    />
        
                                </View>
                            </View>                     

                            <View style={styles.buttonView}>
                                <Button
                                    style={styles.buttonStyle}
                                    mode="contained"
                                    onPress={this.onchangeInfo}
                                    color="#FF9933"
                                >
                                    Guardar Cambios
                                </Button>
                            </View>

                            {this.state.saveFlag ?
                                <View style={styles.inputView}>
                                    <Text style={{ color: "green", textAlign: 'center', fontWeight:"bold", fontSize: 17}}> 
                                        Cambios guardados correctamente
                                    </Text>
                                </View>
                                :
                                null
                            }
                            

                        </Card>

                    </View>
                </ScrollView>
                
            </SafeAreaView>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    },
    ScrollContainer: {
        flex: 1,
		backgroundColor: "#E7E7E7",
        flexDirection: "column",
	},
    inputStyle: {
        height: 45,
        margin: 12,
        padding: 10,
        fontSize: 16,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderColor: "black",
        color: "black"
    },
    editInputStyle: {
        height: 45,
        margin: 12,
        marginLeft: "10%",
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        fontSize: 16,
        borderRadius: 10,
        color: "black",
    },
    inputView: {
        marginTop: 5,
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
        marginLeft: 15,
        marginBottom: -10
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
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        height: 40,
        width: "60%",
        borderRadius: 10,
    },
    questionButton: {
        borderRadius: 8,
        paddingVertical: 3,
        paddingHorizontal: 3,
        backgroundColor: "#FF9933",
    },
    buttonText:{
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
        textTransform: "uppercase",
        color: "black"
    },
    imageStyle: {
		height: 50,
		width: 50,
	},
    overlayStyle:{
        width: "80%"
    },
    overlayText: {
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "justify",
        color: "black"
    },

});

export default Perfil;