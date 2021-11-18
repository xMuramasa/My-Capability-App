import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'; 

class Planificacion extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.taskWrapper}>
                <TouchableOpacity>
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
    buttonView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        paddingRight: 5
    },

});

export default Planificacion;