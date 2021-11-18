import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';

class Planificacion extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text> Calendario </Text>

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
    buttonStyle: {
        backgroundColor: "#FF9933",
        borderRadius: 10,
        padding: 5,
        margin: 20,
        height: 50,
        width: 150,
    },
    buttonView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 16,
        fontWeight: "bold",
        margin: 5,
        color: "black",
        textTransform: "uppercase",
    },

});

export default Planificacion;