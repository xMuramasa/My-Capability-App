import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, Modal, Alert } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

class Planificacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };
    }

    openModal = () => {
        this.setState({ showModal: !this.state.showModal })
        //<CustomModal isVisible={this.state.showModal}></CustomModal>
    }

    render() {
        return (
            <View style={styles.container}>
                {/* Modal */}
                <Modal 
                    transparent 
                    visible={this.state.showModal}
                    onRequestClose={() => this.openModal()}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}> Nombre de la rutina </Text>

                            <Text style={styles.modalText}> Ejercicios </Text>

                            <TouchableOpacity
                                onPress={() => this.openModal()}
                            >
                                <View style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>Agregar</Text>
                                    <AntDesign name="checkcircleo" size={18} color="white" />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
                
                {/* Modal Button */}
                <View style={styles.taskWrapper}>
                <TouchableOpacity 
                    onPress={() => this.openModal()}
                >
                    <View style={styles.addButton}>
                        <Text style={styles.addText}>Agregar Rutina</Text>
                        <Ionicons name="ios-add-circle-outline" size={24} color="white" />
                    </View>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E7E7E7",
        flexDirection: "column",
    },
    taskWrapper: {
        flex: 1,
        paddingHorizontal: 20,
    },
    addButton: {
        flexDirection: "row",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: "5%",
        backgroundColor: "#008080",
        color: "#ffffff",
        height: 50,
    },
    addText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        paddingRight: 5
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
    }

});

export default Planificacion;