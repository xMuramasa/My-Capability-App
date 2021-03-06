import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import { TopNavigation, TopNavigationAction, Select, SelectItem, Icon } from '@ui-kitten/components';
import Card from "./Card";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

//API
import addRoutine from "../API/addRoutine";
import getRoutinesById from "../API/getRoutinesById";
import addExercise from "../API/addExercise";
import getExerciseByRoutineId from "../API/getExerciseByRoutineId";

import GLOBAL from "./global";

// Iconos
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

class Rutinas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showModal2: false,
            rutinaName: "",
            ejercicioName: "",
            repeticiones: "",
            series: "",
            peso: "0",
            rutinaList: [],
            ejercicioList: [],
            selectedIndex: 0,
            selectedValue: "Seleciona una rutina",
            colorValue: "Selecciona un Color",
            rutinaSelected: false,
            rutina_id: null,
        };
    }

    async componentDidMount() {
        try{
            getRoutinesById(GLOBAL.user_id).then((results) => {
                this.setState({ rutinaList: results})
                //this.setState({ group_ids: g_ids.reverse()})
            })
        }catch(err){
            console.error(err);
        }
    }

    async loadRoutines() {
        try{
            getRoutinesById(GLOBAL.user_id).then((results) => {
                this.setState({ rutinaList: results})
            })
        }catch(err){
            console.error(err);
        }
    }

    async loadExercises(idx) {
        try{
            const ejercicios = []
            getExerciseByRoutineId(idx).then((results) => {
                this.setState({ ejercicioList: results})
            })
        }catch(err){
            console.error(err);
        }
    }


    openModal = () => {
        this.setState({ showModal: !this.state.showModal })
        this.setState({ rutinaName: "" })
    }
    openModal2 = () => {
        this.setState({ showModal2: !this.state.showModal2 })
        this.setState({ ejercicioName: "" })
        this.setState({ repeticiones: "" })
        this.setState({ series: "" })
        this.setState({ peso: "0"})
    }

    onChangeRutinaName = (name) => {
        this.setState({ rutinaName: name })
    };
    onChangeEjercicioName = (name) => {
        this.setState({ ejercicioName: name })
    };
    onChangeRepeticiones = (name) => {
        this.setState({ repeticiones: name })
    };
    onChangeSeries = (name) => {
        this.setState({ series: name })
    };
    onChangePeso = (name) => {
        this.setState({ peso: name })
    };

    addRutina = (name) => {
        let newRutinas = this.state.rutinaList
        let randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        const newRutina = {
            user_id: GLOBAL.id,
            routine: name,
            color: `#${randomColor}`
        }
        newRutinas.unshift(newRutina)
        this.setState({rutinaList: newRutinas})
        addRoutine(GLOBAL.user_id, name, `#${randomColor}`)
        this.loadRoutines()
    }
    addEjercicio = (name, rep, ser, peso) => {
        let newEjercicio = this.state.ejercicioList
        let ej = {
            "name": name,
            "repeticiones": rep,
            "series": ser,
            "peso": parseInt(peso)
        }
        newEjercicio.unshift(ej)
        this.setState({ ejercicioList: newEjercicio })
        addExercise(this.state.rutina_id, name, rep, ser, parseInt(peso))
        this.loadExercises(this.state.rutina_id)
    }

    setSelectedIndex = (index) => {
        let pos = index.row
        const idx = this.state.rutinaList[pos].id
        this.setState({ selectedIndex: index})
        this.setState({ rutinaSelected: true})
        this.setState({ selectedValue: this.state.rutinaList[pos].routine })
        this.setState({ rutina_id: idx })
        this.loadExercises(idx)
    }


    render() {
        let isEmptyRutinas = this.state.rutinaList.length === 0
        let isEmptyEjercicios = this.state.ejercicioList.length === 0

        return (
            <View style={styles.container}>
                <TopNavigation
                    style={{ width: '100%', backgroundColor: '#FF9933', paddingTop: '2%' }}
                    title={evaProps => <Text style={{ marginVertical: 5, fontSize: 20, fontWeight: "bold", color: 'black' }}> Rutinas </Text>}
                    accessoryRight={
                        <TopNavigationAction
                            onPress={() => this.openModal()}
                            icon={<Entypo name="plus" size={30} color="black" />}
                        />
                    }
                />

                {/* Modal Rutinas*/}
                <Modal 
                    transparent 
                    visible={this.state.showModal}
                    onRequestClose={() => this.openModal()}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "black", }}>  Nombre de la rutina </Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(name) => this.onChangeRutinaName(name)}
                                keyboardType="default"
                                editable={true}
                                value={this.state.rutinaName}
                                placeholder="Ej: Rutina 1"
                            />
                    
                            <TouchableOpacity
                                onPress={() => { this.openModal(), this.addRutina(this.state.rutinaName)}}
                            >
                                <View style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>Guardar</Text>
                                    <Icon style={{ width: 25, height: 25 }} fill="white" name='checkmark-circle-2-outline'/>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.openModal()}
                            >
                                <View style={[styles.modalButton, { backgroundColor: '#990000' }]}>
                                    <Text style={styles.modalButtonText}>Cancelar</Text>
                                    <Icon style={{ width: 25, height: 25 }} fill="white" name='close-circle-outline'/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Selector */}
                <View style={styles.selectView}>
                    { isEmptyRutinas ?
                        <Select
                            selectedIndex={this.state.selectedIndex}
                            value={(TextProps) => 
                                <Text style={{ marginVertical: 5, fontSize: 20, color: '#a9a9a9' }}> Sin Rutinas </Text>
                            }
                            disabled={true}
                            onSelect={index => this.setSelectedIndex(index)}
                            size='small'
                        >
                        </Select>
                        :
                        <Select
                            selectedIndex={this.state.selectedIndex}
                            value={(TextProps) => 
                                <Text style={{ marginVertical: 5, fontSize: 20, color: 'black' }}> {this.state.selectedValue} </Text>
                            }
                            onSelect={index => this.setSelectedIndex(index)}
                            size='small'
                        >
                            {this.state.rutinaList.map((row, index) => (
                                <SelectItem
                                    key={index}
                                    title={(TextProps) =>
                                        <Text style={{ color: 'black', fontWeight: "bold", }}> {row.routine} </Text>
                                    }
                                />
                            ))}
                            
                        </Select>
                    }
                </View>

                {/* Ejercicios */}
                {!this.state.rutinaSelected ?
                    isEmptyRutinas ?
                        <View style={{ alignItems: 'center'}}>
                            <View style={{ flexDirection: 'row', paddingTop: '5%', paddingBottom: '5%' }}>
                                <Text style={{ fontSize: 20 }}> Agrega un rutina con el boton </Text>
                                <Entypo name="plus" size={30} color="black" style={{ paddingTop: 1, paddingLeft: 5 }} />
                            </View>
                        </View>
                        :
                        null
                    :
                    <TopNavigation
                        style={{ width: '100%', backgroundColor: '#FF9933', paddingTop: '2%' }}
                        title={evaProps => <Text style={{ marginVertical: 5, fontSize: 20, fontWeight: "bold", color: 'black' }}> Ejercicios </Text>}
                        accessoryRight={
                            <TopNavigationAction
                                onPress={() => this.openModal2()}
                                icon={<Entypo name="plus" size={30} color="black" />}
                            />
                        }
                    />
                }

                {/* Modal Ejercicios */}
                <Modal 
                    transparent 
                    visible={this.state.showModal2}
                    onRequestClose={() => this.openModal2()}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "black", }}> Nombre del ejercicio </Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(name) => this.onChangeEjercicioName(name)}
                                keyboardType="default"
                                editable={true}
                                value={this.state.ejercicioName}
                                placeholder="Ej: Sentadillas"
                            />
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "black", }}> Nro. de repeticiones </Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(name) => this.onChangeRepeticiones(name)}
                                keyboardType="number-pad"
                                editable={true}
                                value={this.state.repeticiones}
                                placeholder="Ej: 20"
                            />
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "black", }}> Nro. de series </Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(name) => this.onChangeSeries(name)}
                                keyboardType="number-pad"
                                editable={true}
                                value={this.state.series}
                                placeholder="Ej: 5 "
                            />
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "black", }}> Peso (kg) </Text>
                            <Text style={{ fontSize: 12, color: "black", }}> Si no requiere de peso adicional, dejar en 0 </Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(name) => this.onChangePeso(name)}
                                keyboardType="number-pad"
                                editable={true}
                                value={this.state.peso}
                                placeholder="Ej: 2"
                            />
                            
                            <TouchableOpacity
                                onPress={() => { this.openModal2(), 
                                    this.addEjercicio(this.state.ejercicioName, this.state.repeticiones, this.state.series, this.state.peso)}}
                            >
                                <View style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>Guardar</Text>
                                    <AntDesign name="checkcircleo" size={18} color="white" />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.openModal2()}
                            >
                                <View style={[styles.modalButton, { backgroundColor: '#990000' }]}>
                                    <Text style={styles.modalButtonText}>Cancelar</Text>
                                    <AntDesign name="closecircleo" size={18} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                 {/* Lista Ejercicios */}
                <ScrollView>
                <View style={{ paddingTop: '2%', alignItems:'center'}}>
                    {isEmptyEjercicios ?
                        null
                        : 
                        <View>
                            {this.state.ejercicioList.map((row, index) => (
                                <View key={index} style={{paddingTop: '1%'}}>
                                <Card cardColor="white">
                                    <View style={{ flexDirection: "column"}}>
                                        <View style={{ flexDirection:"row" }}>
                                            <View style={{ width: '50%' }}>
                                                <Text style={styles.cardText}> Nombre: {row.ex_name} </Text>
                                            </View>
                                            <View style={{ width: '50%' }}>
                                                    <Text style={styles.cardText}> {row.weight === 0 ? " " : "Peso: " + row.weight+"kg"} </Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection:"row" }}>
                                            <View style={{ width: '50%' }}>
                                                <Text style={styles.cardText}> Series: {row.series} </Text> 
                                            </View>
                                            <View style={{ width: '50%' }}>
                                                <Text style={styles.cardText}> Repeticiones: {row.reps} </Text>
                                            </View>
                                        </View>
                                    </View>
                                </Card>
                                </View>
                            ))}
                        </View>


                    }
                </View>
                <View style={{ paddingTop: 100 }}/>
                </ScrollView>


                

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E7E7E7",
        padding: "3%"
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer:{
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
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
        backgroundColor: "#008080",
        color: "#ffffff",
        height: 40,
    },
    modalButtonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
        paddingRight: 5
    },
    modalText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
        paddingRight: 5
    },
    inputStyle: {
        height: 45,
        margin: 12,
        padding: 10,
        fontSize: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        color: "black"
    },
    selectView: {
        width: "100%",
        borderRadius: 4, 
        margin: 1.5, 
        padding: 1.5, 
        backgroundColor: '#FF9933', 
        marginBottom: '3%', 
        marginTop: '3%',
        justifyContent: "center",
    },
    cardText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
    },

});

export default Rutinas;