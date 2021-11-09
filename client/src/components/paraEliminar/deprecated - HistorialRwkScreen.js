import React, { Component } from "react";
import { View, StatusBar, Animated, Pressable, Dimensions, ScrollView } from 'react-native';

import { TabView, SceneMap } from 'react-native-tab-view';
import {NativeBaseProvider, Box} from 'native-base';
// import Constants from 'expo-constants';

import getResultsByUserId from '../API/getResultsByUserId';
import CardComponent from "./deprecated - CardComponent.js";
import { TabRouter } from "@react-navigation/routers";

const screenWidth = Dimensions.get("window").width;
const initialLayout = { width: screenWidth };

//implementar paginación y/o scrolling
//no funciona botón para volver

splitDate = (d) => {
	// 2021-07-21T00:00
	// 31-07-21
	var f = d.slice(0, 16).split("T")[0]; //fecha
	var f2 = f.split("-").reverse(); //fecha inv
	f2[2] = f2[2].slice(2,4);
	var f3 = f2.join("-");

	var h = d.slice(0, 16).split("T")[1];//hora

	return f3 /*+ " " + h*/;
}

export default function HistorialRwkScreen() {

	// Estados
	const [index, setIndex] = React.useState(0);
	const [resultData, setResultData] = React.useState([]);
	const [routes] = React.useState([
		{ key: 'first', title: 'Todos'},
		{ key: 'second', title: 'Salto'},
		{ key: 'third', title: 'Velocidad'},
	]);

	
	// Llamado API
	React.useEffect(() => {
		async function fetchAPI() {
			try{
				getResultsByUserId(4).then((results) => 
				setResultData(results))
			} catch (err) {
				console.error(err);
			}
			console.log("useEffect")
		}

		fetchAPI()
	}, [])
	
	
	// Vistas
	const Todos = () => (
		<View style={{flex:1, alignItems: "center", alignContent:"center"}}>
			{resultData.map((row, index) => (
				<CardComponent
					key = {index}
					type = {row.type}
					resultado = {row.result}
					fecha = {splitDate(row.date)}	//parsear
					All = {true}
				/>
			))}
		</View>
	);
	
	const SaltoVert = () => (
		<View style={{flex:1, alignItems: "center", alignContent:"center"}}>
			{resultData
			.filter(d => d.type === 0)
			.map((row, index) => (
				<CardComponent
					key = {index}
					type = {0}
					resultado = {row.result}
					fecha = {splitDate(row.date)}
					All = {false}
				/>
			))}
		</View>
	);
	
	const Velocidad = () => (	
		<View style={{flex:1, alignItems: "center", alignContent:"center"}}>
			{resultData
			.filter(d => d.type === 1)
			.map((row, index) => (
				<CardComponent
					key = {index}
					type = {1}
					resultado = {row.result}
					fecha = {splitDate(row.date)}
					All = {false}
				/>
			))}
		</View>
	);

	const SaltoHor = () => (
		<View style={{flex:1, alignItems: "center", alignContent:"center"}}>
			{resultData
			.filter(d => d.type === 2)
			.map((row, index) => (
				<CardComponent
					key = {index}
					type = {2}
					resultado = {row.result}
					fecha = {splitDate(row.date)}
					All = {false}
				/>
			))}
		</View>
	);
	
	
	// Mapeo de vistas
	const renderScene = SceneMap({
		first: Todos,
		second: SaltoVert,
		third: Velocidad,
		fourth: SaltoHor
	});


	return (
		<NativeBaseProvider>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={initialLayout}
				style={{marginTop: StatusBar.currentHeight}}
			/>
		</NativeBaseProvider>
	);
}