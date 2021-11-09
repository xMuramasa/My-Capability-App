import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';

const OPTIONS = ["Todos", "Salto Vertical", "Salto Horizontal", "Velocidad"]
const TIPOS = {
    "Todos": -1,
    "Salto Vertical":0,
    "Salto Horizontal": 2,
    "Velocidad": 1,
}
const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const ModalPicker = (props) => {

    const onPressItem = (option) => {
        props.changeModalVisibility(false)
        props.setData(option)
        props.setType(TIPOS[option])
    };

    const option = OPTIONS.map((item, index) => {
        return (
            <TouchableOpacity
                style={styles.optionStyle}
                key={index}
                onPress={() => onPressItem(item)}
            >
                <Text style={styles.textStyle}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    });

    return (
        <TouchableOpacity
            onPress={() => props.changeModalVisibility(false)}
            style={styles.container}
        >
            <View style={[styles.modalStyle, { width: WIDTH - 20 }, { height: HEIGHT/2.8 }]}>
                <ScrollView>
                    {option}
                </ScrollView>
            </View>
        
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "40%"
    },
    modalStyle: {
        backgroundColor: "white",
        borderRadius: 10,
    },
    optionStyle: {
        alignItems: "center"
    },
    textStyle: {
        margin: 20,
        fontSize: 20,
        fontWeight: "bold"
    }
})

export { ModalPicker }