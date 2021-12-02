import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Dimensions, Modal } from 'react-native';
import { Card, ListItem, Icon, Overlay, CheckBox, Divider } from 'react-native-elements'
import { Button } from 'react-native-paper';


const { height } = Dimensions.get('window');

class PerfilExterno extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         username: "",
    //         email: "",
    //         weight: "",
    //         fat_percent: "",
    //         age: "",
    //         height: "",
    //         sex: "",
    //         editInfo: true,
    //         checkList: GLOBAL.globalCheckList,
    //         saveFlag: false,
    //         score: 0,
    //     };
    // }

    // username: data.username,
    // email: data.email,
    // age: data.age === null ? "" : data.age.toString(),
    // sex: data.gender === null ? "" : data.gender.toString(),
    // height: data.height === null ? "" : data.height.toString(),
    // weight: data.weight === null ? "" : data.weight.toString(),
    // score: data.score === null ? "" : data.score.toString(),

    state = {
        screenHeight: height,
    };

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight });
    };

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
                                {/* Columna izquierda */}
                                <View style={{ flexDirection: "column", width: '50%'}}>
                                    
                                    <Text style={styles.header}> Edad </Text>
                                    <TextInput
                                        style={styles.editInputStyle}
                                        // onChangeText={this.onChangeAge}
                                        keyboardType="default" 
                                        editable={false}
                                        value={this.state.age}
                                    />

                                    <Text style={styles.header}> Sexo biológico </Text>
                                    <TextInput
                                        style={styles.editInputStyle}
                                        keyboardType="default"
                                        editable={false}
                                        // onChangeText={this.onChangeSex}
                                        value={props.sex === 0 ? "Hombre" : "Mujer"}
                                    />

                                    <Text style={styles.header}> Puntuación </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput
                                            style={[styles.inputStyle, {width: "60%", borderBottomColor: "black", borderBottomWidth: 1}]}
                                            // onChangeText={this.onChangePuntuacion}
                                            keyboardType="default"
                                            editable={false}
                                            value={props.score}
                                        />

                                    </View>

                                </View>
                                
                                {/* Columna derecha */}
                                <View style={{ flexDirection: "column", width: '50%'}}>
                                    <Text style={styles.header}> Altura (cm)</Text>
                                    <TextInput
                                        style={styles.editInputStyle}
                                        // onChangeText={this.onChangeHeight}
                                        keyboardType="default"
                                        editable={false}
                                        value={this.state.height}
                                    />

                                    <Text style={styles.header}> Peso (kg)</Text>
                                    <TextInput
                                        style={styles.editInputStyle}
                                        keyboardType="default"
                                        editable={false}
                                        value={this.state.weight}
                                    />

                                </View>
                            </View>
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
    buttonText: {
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

export default PerfilExterno;