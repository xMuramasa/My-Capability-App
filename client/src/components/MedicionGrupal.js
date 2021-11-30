import React, { Component } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput,
    SafeAreaView, Share, ScrollView, ActivityIndicator, Image, NativeModules } from 'react-native';
import { IndexPath, Layout, Select, SelectItem, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Icon } from '@ui-kitten/components'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// API
import getResultsByUserId from '../API/getResultsByUserId';
import addGroup from '../API/addGroup';
import getGroupsByProf from '../API/getGroupsByProf';
import getStudentsByGroup from '../API/getStudentsByGroup';
import addStudent from '../API/addStudent';

//Componentes
import Card from "./Card.js";

import GLOBAL from './global'

const { ConnectionModule } = NativeModules;

function saltoHorizontal(user_id, group_id, student_id, height){
    console.log('horizontal grupal', height );
    //calcular salto en Java
    //startSaltoHorizontal(int user_id, int group_id, int std_id, int height, int tipo)
    ConnectionModule.startSaltoHorizontal(user_id, group_id, student_id, height, 0); 
}

function saltoVertical(user_id, group_id, student_id ){
    console.log('vertical grupal');
    //calcular salto en Java
    //startSaltoVertical(int user_id, int group_id, int student_id, int height, int tipo)
    ConnectionModule.startSaltoVertical(user_id, group_id, student_id, 0, 0);  // IMPLEMENTAR OBTENER ALTURA DE USUARIO
}

function CardInfo(props){
    const navigation = useNavigation();

    return (
        <View style={{ paddingTop: "3%" }}>
            <Card cardColor="white">
                <View style={{flexDirection: 'column'}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{ width: '50%', flexDirection: 'row', justifyContent: 'center'}}>
                            <FontAwesome name="user" size={24} color="black" />
                            <Text style={{fontSize: 15, color: 'black'}}> {props.nombre}  </Text>
                        </View>

                        <View style={{ width: '50%'}}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('HistorialGrupo', { group: props.group_id, student: props.student_id, name: props.nombre})}
                                style={{alignItems:'center'}}
                            >
                                <View style={styles.membersButton}
                                >
                                    <AntDesign name="profile" size={24} color="black" />
                                    <Text style={{fontSize: 15, color: 'black'}}> Historial </Text>
                                    
                                </View>
                                
                            </TouchableOpacity>
                        </View>
                    
                    </View>

                    <View style={{ flexDirection: 'row', paddingTop: '3%', }}>
                        <View style={{ width: '50%'}}>
                            <TouchableOpacity
                                style={{alignItems:'center'}}
                                onPress = {() => saltoVertical(props.user_id, props.group_id, props.student_id)}
                                // onPress = {() => console.log(props.user_id, props.group_id, props.student_id, props.height)}
                            >
                                <View style={styles.membersButton}
                                >
                                    <MaterialCommunityIcons name="arrow-expand-vertical" size={24} color="black" />
                                    <Text style={{fontSize: 15, color: 'black'}}> Salto vertical </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '50%'}}>
                            <TouchableOpacity
                                style={{alignItems:'center'}}
                                onPress = {() => saltoHorizontal(props.user_id, props.group_id, props.student_id, props.height)}
                                // onPress = {() => console.log(props.user_id, props.group_id, props.student_id)}
                            >
                                <View style={styles.membersButton}
                                >
                                    <MaterialCommunityIcons name="arrow-expand-horizontal" size={24} color="black" />
                                    <Text style={{ fontSize: 15, color: 'black' }}> Salto horizontal </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                               
                    </View>
                </View>
            </Card>
        </View>
    )
}

class MedicionGrupal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: GLOBAL.user_id,		//implementar usuarios
            group_id: null,		//implementar usuarios
			resultData: [],
            dataReady: false,
            showModal: false,
            showModal2: false,
            selectedIndex: 0,
            indexValue: "Seleciona un grupo",
            placeHolderName: "",
            placeHolderStudentName: "",
            placeHolderHeight: "",
            testList: ['a','b'],
            group_ids: [],
            groupSelected: false
        };
    }

    async componentDidMount() {
        try{
            const arr = []
            const g_ids = []
            getGroupsByProf(this.state.user_id).then((results) => {
                results.map(
                    (result) => {
                        arr.push(result.group_name)
                        g_ids.push(result.id)
                    }
                )
                this.setState({ testList: arr.reverse()})
                this.setState({ group_ids: g_ids.reverse()})
            })
        }catch(err){
            console.error(err);
        }
    }

    async componentDidUpdate(_, prevState) {
        if (prevState.selectedIndex != this.state.selectedIndex){
            try{
                const arr = []
                const g_ids = []
                getGroupsByProf(this.state.user_id).then((results) => {
                    results.map(
                        (result) => {
                            arr.push(result.group_name)
                            g_ids.push(result.id)
                        }
                    )
                    this.setState({ testList: arr.reverse()})
                    this.setState({ dataReady: true})
                    this.setState({ group_ids: g_ids.reverse()})
                })
                
                getStudentsByGroup(GLOBAL.user_id, this.state.group_id).then((results)=>{
                    this.setState({ resultData: results })
                    this.setState({ dataReady: true })
                })
                
            } catch (err) {
                console.error(err);
            }
        }
	}

    openModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }
    openModal2 = () => {
        this.setState({ 
            showModal2: !this.state.showModal2,
            placeHolderStudentName: "",
            placeHolderHeight: ""
        })
    }
    setSelectedIndex = (index) => {
        this.setState({ selectedIndex: index })
        this.setState({ indexValue: this.state.testList[index.row] })
        this.setState({ group_id: this.state.group_ids[index.row] })
        this.setState({ groupSelected: true })
    }
    onChangeGrupo = (text) => {
        this.setState({ 
            placeHolderName: text,
            group_id: g_ids.indexOf(text)
        })
    };
    onChangeStudentName = (name) =>{
        this.setState({ 
            placeHolderStudentName: name,
        })
    };
    onChangeStudentHeight = (height) =>{
        this.setState({ 
            placeHolderHeight: height,
        })
    };
    addNewGroup = (newName) => {
        let newGroup = this.state.testList
        newGroup.unshift(newName)
        this.setState({ testList: newGroup })
        addGroup(GLOBAL.user_id, newName)
    }

    async getStudents() {
        try{            
            getStudentsByGroup(GLOBAL.user_id, this.state.group_id).then((results)=>{
                this.setState({ resultData: results })
                this.setState({ dataReady: true })
            })
            
        } catch (err) {
            console.error(err);
        }
    }

    addNewStudent = (stdName, stdHeight) => {
        const newStudent = {
            id_prof: GLOBAL.user_id, 
            group_id: this.state.group_id,
            student_name: stdName,
            height: stdHeight
        }
        this.setState(prevState => ({
                resultData: [...prevState.resultData, newStudent]
            })
        )
        addStudent(GLOBAL.user_id, this.state.group_id, stdName, stdHeight)
        this.getStudents()
    }
 
    render() {
        const emptyGroup = this.state.testList.length === 0

        return ( 
            <View style={styles.container}>

                <TopNavigation
                    style={{ width: '100%', backgroundColor: '#FF9933'}}
                    title={evaProps => <Text style={{ marginVertical: 5, fontSize: 20, fontWeight: "bold", color: 'black'}}> Grupos </Text>}
                    accessoryRight={
                        <TopNavigationAction
                            onPress={() => this.openModal()}
                            icon={<Entypo name="plus" size={30} color="black" />} 
                        />
                    }
                />

                <Modal
                    transparent
                    visible={this.state.showModal}
                    onRequestClose={() => this.openModal()}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>

                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "black",}}> Nombre del grupo </Text>

                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(text) => this.onChangeGrupo(text)}
                                keyboardType="default"
                                editable={true}
                                value={this.state.placeHolderName}
                                placeholder="Ej: Cuarto medio A"
                            />

                            <TouchableOpacity
                                onPress={() => {this.openModal(), this.addNewGroup(this.state.placeHolderName)}}
                            >
                                <View style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>Guardar</Text>
                                    <AntDesign name="save" size={18} color="white" />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.openModal()}
                            >
                                <View style={[styles.modalButton, { backgroundColor: '#990000'}]}>
                                    <Text style={styles.modalButtonText}>Cancelar</Text>
                                    <AntDesign name="closecircleo" size={18} color="white" />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>

                <View style={{ width: "100%", borderRadius: 4, margin: 1.5, padding: 1.5, backgroundColor: '#FF9933', marginBottom:'3%', marginTop:'3%'}}>
                    <Select
                        value={(TextProps) => <Text style={{ marginVertical: 5, fontSize: 20, color: 'black'}}> {this.state.indexValue} </Text>}
                        selectedIndex={this.state.selectedIndex}
                        size='large'
                        onSelect={index => this.setSelectedIndex(index)}
                        >
                            {this.state.testList.map((row, index) => (
                            <SelectItem 
                                title={(TextProps) => <Text style={{ marginVertical: 5, fontSize: 20,color: 'black'}}> {row} </Text>} 
                                key={index}
                            />
                            ))}
                    </Select>
                </View>
                { !this.state.groupSelected ?
                    emptyGroup ?
                        <View style={{flexDirection: 'row', paddingTop: '5%', paddingBottom:'5%'}}>
                            <Text style={{ fontSize: 20 }}> Agrega un Grupo con el boton </Text>
                            <Entypo name="plus" size={30} color="black" style={{ paddingTop: 1, paddingLeft: 5 }}/>
                        </View>
                        :
                        <View style={{flexDirection: 'row', paddingTop: '5%', paddingBottom:'5%'}}>
                            <Text style={{ fontSize: 20 }}> Selecciona un Grupo </Text>
                        </View>
                    :
                    <TopNavigation
                        style={{ width: '100%', backgroundColor: '#FF9933', paddingTop: '2%' }}
                        title={evaProps => <Text style={{ marginVertical: 5, fontSize: 20, fontWeight: "bold", color: 'black' }}> Integrantes </Text>}
                        accessoryRight={
                            <TopNavigationAction
                                onPress={() => this.openModal2()}
                                icon={<Entypo name="plus" size={30} color="black" />}
                            />
                        }
                    />
                }

                {/* Arriba nuevo */}

                <ScrollView> 
                    <View style={{flex:1, alignItems: "center", alignContent:"center"}}>
                        {this.state.resultData.length > 0 ? 
                            this.state.resultData.map((row, index) => (
                                    <CardInfo
                                        key = {index}
                                        user_id = { row.id_prof } 
                                        group_id = { row.group_id } 
                                        student_id = {row.id}
                                        height = { row.height } 
                                        nombre = {row.student_name}
                                        All = {true}
                                    />
                            ))
                            :
                            null
                        }
                        </View>
                </ScrollView>

                <Modal
                    transparent
                    visible={this.state.showModal2}
                    onRequestClose={() => this.openModal2()}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>

                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "black",}}> Nombre estudiante</Text>

                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(name) => this.onChangeStudentName(name)}
                                keyboardType="default"
                                editable={true}
                                value={this.state.placeHolderStudentName}
                                placeholder="Ej: Juanito Perez"
                            />
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "black",}}> Estatura estudiante (cm)</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(height) => this.onChangeStudentHeight(height)}
                                keyboardType="default"
                                editable={true}
                                value={this.state.placeHolderHeight}
                                placeholder="Ej: 180"
                            />

                            <TouchableOpacity
                                onPress={() => {this.openModal2(), this.addNewStudent(this.state.placeHolderStudentName, this.state.placeHolderHeight)}}
                            >
                                <View style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>Guardar</Text>
                                    <AntDesign name="save" size={18} color="white" />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.openModal2()}
                            >
                                <View style={[styles.modalButton, { backgroundColor: '#990000'}]}>
                                    <Text style={styles.modalButtonText}>Cancelar</Text>
                                    <AntDesign name="closecircleo" size={18} color="white" />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>

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
    buttonText: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center",
        textTransform: "uppercase",
        color: "black"
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
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
    membersButton:{
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor: "#FF9933",
        color: "#ffffff",
        height: 40,
        width: "90%",
        flexDirection: 'row',
    }
})

export default MedicionGrupal;