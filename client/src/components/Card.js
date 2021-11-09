import React from "react"
import { StyleSheet, View, Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;

export default function Card(props){
    return(
        <View style={[styles.card, { backgroundColor: props.cardColor }]}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 0.9 * screenWidth,
        borderRadius: 6,
        elevation: 3,
        shadowOffset: {width: 1, heigth:1},
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: '1%',
        marginVertical: '0.5%',
    },
    cardContent: {
        marginLeft: '2%',
        marginRight: '2%',
        marginVertical: '3%'
    },
})

