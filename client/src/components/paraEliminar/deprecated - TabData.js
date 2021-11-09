import React, { Component } from "react";
import { View, StatusBar, Animated, Pressable, Dimensions } from 'react-native';
// import { createMaterialTopTabNavigator  } from '@react-navigation/material-top-tabs';

// import { TabView, SceneMap } from 'react-native-tab-view';
// import {NativeBaseProvider, Box} from 'native-base';
// import Constants from 'expo-constants';

import getResultsByUserId from '../API/getResultsByUserId';
import CardComponent from "./CardComponent.js";

//implementar paginación


class TabData{

    constructor() {
		this.state = {
			user_id: 4,		//implementar usuarios
			resultData: [],
            update: false
		};
	}

    async componentDidMount() {
        try {
            getResultsByUserId(this.state.user_id).then((results) =>
                this.setState({ resultData: results }));
                console.log("GET")
        } catch (err) {
            console.error(err);
        }
    }

    async componentDidUpdate(_, prevState) {
        // Uso tipico (no olvides de comparar las props):
        if (this.state.resultData !== prevState.resultData) {
            this.setState({update: true});
            console.log("UPDATE")
        }
    }

    // renderSwitch(tabView){

    //     switch (tabView) {
    //         case "todo":
    //             return (
    //                 this.state.resultData.map((row, index) => (
    //                     <CardComponent
    //                         key = {index}
    //                         type = {row.type}
    //                         resultado = {row.result}
    //                         fecha = {row.date}
    //                         hora = {"14:30"}
    //                     />
    //                 ))
    //             );
    //             break;

    //         case "saltoVert":
    //             return(
    //                 this.state.resultData
    //                 .filter(d => d.type === 0)
    //                 .map((row, index) => (
    //                     <CardComponent
    //                         key = {index}
    //                         type = {row.type}
    //                         resultado = {row.result}
    //                         fecha = {row.date}
    //                         hora = {"14:30"}
    //                     />
    //                 ))
    //             );
    //             break;

    //         case "velocidad":
    //             return(
    //                 this.state.resultData
    //                 .filter(d => d.type === 0)
    //                 .map((row, index) => (
    //                     <CardComponent
    //                         key = {index}
    //                         type = {row.type}
    //                         resultado = {row.result}
    //                         fecha = {row.date}
    //                         hora = {"14:30"}
    //                     />
    //                 ))
    //             );
    //             break;

    //         default:
    //             console.log("error en switch [TabData]");

    //     }
    // }

    Results(){
        return this.state.resultData
    }

    /*
    render(){
        console.log("TABTEST")
        const {tabView} = this.props
        return(
            <View>
                {this.renderSwitch(tabView)}
            </View>
        )

    }
    */
}

export default TabData;